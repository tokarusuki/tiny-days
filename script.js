const STORAGE_KEY = "tiny-days-save";

const defaultState = {
  day: 1,
  fullness: 72,
  joy: 68,
  tidiness: 74,
  lastVisit: new Date().toISOString(),
  journal: ["Day 1: A tiny friend moved into the sunny nook."],
  keepsakes: ["✿"],
};

const artByMood = {
  bright: String.raw`      .-"""-.
    .'  o o  '.
   /   \___/   \
   |  .-   -.  |
    \  '---'  /
     '-.___.-'
       /| |\
      * | | *`,
  cozy: String.raw`      .-"""-.
    .'  - -  '.
   /    ___    \
   |   (___)   |
    \  \___/  /
     '-.___.-'
       /| |\
      ~ | | ~`,
  tender: String.raw`      .-"""-.
    .'  . .  '.
   /     _     \
   |   .' '.   |
    \   ---   /
     '-.___.-'
       /| |\
      . | | .`,
};

const actionText = {
  feed: ["You shared a moonberry. Tiny chewed very thoughtfully.", "A crumb landed like a comet."],
  play: ["You played peekaboo behind a leaf. Tiny wiggled happily.", "Tiny invented a two-step dance."],
  tidy: ["You folded the blanket cloud and swept the nook.", "Everything smells faintly like rain and tea."],
  observe: ["You sat together quietly and noticed the light moving.", "Tiny blinked slowly. That seemed important."],
};

const elements = {
  art: document.querySelector("#creature-art"),
  roomItems: document.querySelector("#room-items"),
  moodLabel: document.querySelector("#mood-label"),
  statusCopy: document.querySelector("#status-copy"),
  fullness: document.querySelector("#fullness"),
  joy: document.querySelector("#joy"),
  tidiness: document.querySelector("#tidiness"),
  journal: document.querySelector("#journal-list"),
  reset: document.querySelector("#reset-button"),
};

let state = loadState();
applyTimeAway();
render();

for (const button of document.querySelectorAll("[data-action]")) {
  button.addEventListener("click", () => care(button.dataset.action));
}

elements.reset.addEventListener("click", () => {
  state = structuredClone(defaultState);
  state.lastVisit = new Date().toISOString();
  saveState();
  render();
});

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved) };
  } catch {
    return structuredClone(defaultState);
  }
}

function applyTimeAway() {
  const now = new Date();
  const previous = new Date(state.lastVisit);
  const daysAway = Math.max(0, Math.floor((now - previous) / 86_400_000));

  if (daysAway > 0) {
    state.day += daysAway;
    state.fullness = clamp(state.fullness - daysAway * 8);
    state.joy = clamp(state.joy - daysAway * 6);
    state.tidiness = clamp(state.tidiness - daysAway * 7);
    addJournal(`Day ${state.day}: Tiny waited patiently and saved you a soft look.`);
  }

  state.lastVisit = now.toISOString();
  saveState();
}

function care(action) {
  const lines = actionText[action];
  const line = lines[Math.floor(Math.random() * lines.length)];

  if (action === "feed") state.fullness = clamp(state.fullness + 18);
  if (action === "play") state.joy = clamp(state.joy + 18);
  if (action === "tidy") state.tidiness = clamp(state.tidiness + 20);
  if (action === "observe") {
    state.fullness = clamp(state.fullness + 3);
    state.joy = clamp(state.joy + 5);
    state.tidiness = clamp(state.tidiness + 3);
  }

  maybeFindKeepsake(action);
  addJournal(`Day ${state.day}: ${line}`);
  state.lastVisit = new Date().toISOString();
  saveState();
  render();
}

function maybeFindKeepsake(action) {
  const gifts = { feed: "♡", play: "♪", tidy: "⌂", observe: "☾" };

  if (!state.keepsakes.includes(gifts[action]) && Math.random() > 0.68) {
    state.keepsakes.push(gifts[action]);
  }
}

function render() {
  const mood = getMood();
  const average = Math.round((state.fullness + state.joy + state.tidiness) / 3);

  elements.art.textContent = artByMood[mood.name];
  elements.roomItems.textContent = `${state.keepsakes.join("  ")}     day ${state.day}`;
  elements.moodLabel.textContent = mood.label;
  elements.statusCopy.textContent = `${mood.copy} Overall comfort: ${average}%.`;
  elements.fullness.value = state.fullness;
  elements.joy.value = state.joy;
  elements.tidiness.value = state.tidiness;
  elements.journal.innerHTML = "";

  for (const entry of state.journal.slice(0, 6)) {
    const item = document.createElement("li");
    item.textContent = entry;
    elements.journal.append(item);
  }
}

function getMood() {
  const average = (state.fullness + state.joy + state.tidiness) / 3;

  if (average >= 82) {
    return {
      name: "bright",
      label: "Feeling bright",
      copy: "Tiny practically glows in the little room.",
    };
  }

  if (average >= 48) {
    return {
      name: "cozy",
      label: "Feeling cozy",
      copy: "Tiny is comfortable and glad for your company.",
    };
  }

  return {
    name: "tender",
    label: "Feeling tender",
    copy: "Tiny could use a gentle moment, but there is no rush.",
  };
}

function addJournal(entry) {
  state.journal = [entry, ...state.journal].slice(0, 12);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}
