const STORAGE_KEY = "tiny-days-save";
const DAY_MS = 86_400_000;

const personalities = [
  {
    id: "sleepy",
    label: "Sleepy 😴",
    diaryTone: "after a careful yawn",
    favoriteFoods: ["dream pear", "warm oat star"],
  },
  {
    id: "curious",
    label: "Curious 🔍",
    diaryTone: "with many questions",
    favoriteFoods: ["moonberry", "buttonberry"],
  },
  {
    id: "mischievous",
    label: "Mischievous 😈",
    diaryTone: "while hiding a grin",
    favoriteFoods: ["spark pepper", "buttonberry"],
  },
  {
    id: "shy",
    label: "Shy 🌷",
    diaryTone: "in tiny careful letters",
    favoriteFoods: ["petal plum", "honey fig"],
  },
  {
    id: "energetic",
    label: "Energetic ⚡",
    diaryTone: "with bouncy punctuation",
    favoriteFoods: ["sun citrus", "spark pepper"],
  },
];

const foods = [
  { id: "moonberry", label: "Moonberry", icon: "🍓", fullness: 18, joy: 4 },
  { id: "sun citrus", label: "Sun citrus", icon: "🍊", fullness: 12, joy: 12 },
  { id: "dream pear", label: "Dream pear", icon: "🍐", fullness: 16, joy: 8 },
  { id: "honey fig", label: "Honey fig", icon: "🍯", fullness: 20, joy: 2 },
  { id: "petal plum", label: "Petal plum", icon: "🌸", fullness: 10, joy: 16 },
  { id: "spark pepper", label: "Spark pepper", icon: "🌶️", fullness: 8, joy: 20 },
  { id: "buttonberry", label: "Buttonberry", icon: "🫐", fullness: 14, joy: 10 },
  { id: "warm oat star", label: "Warm oat star", icon: "⭐", fullness: 22, joy: 6 },
];

const recipes = [
  "moonberry crumble",
  "rain-tea soup",
  "sun citrus fizz",
  "dream pear pudding",
  "petal plum jam",
];

const wallpapers = [
  { id: "dots", label: "Cream dots", icon: "·", pattern: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 1px, transparent 1px)", size: "22px 22px" },
  { id: "leaf", label: "Leaf sprigs", icon: "❧", pattern: "linear-gradient(45deg, rgba(169, 190, 162, 0.18) 25%, transparent 25% 75%, rgba(169, 190, 162, 0.18) 75%)", size: "28px 28px" },
  { id: "stars", label: "Sleepy stars", icon: "✦", pattern: "radial-gradient(circle at 30% 30%, rgba(232, 166, 161, 0.28) 2px, transparent 3px)", size: "30px 30px" },
  { id: "snow", label: "Snow pinpricks", icon: "✧", pattern: "radial-gradient(circle, rgba(200, 223, 240, 0.7) 1px, transparent 2px)", size: "18px 18px" },
];

const roomObjects = [
  { id: "plant", label: "Window plant", icon: "🪴", tap: "Tiny checked whether the plant had grown. It insisted it had." },
  { id: "lamp", label: "Mushroom lamp", icon: "🍄", tap: "The mushroom lamp glowed like a polite sunset." },
  { id: "books", label: "Tiny books", icon: "📚", tap: "Tiny opened a book upside down and understood it anyway." },
  { id: "shell", label: "Shell radio", icon: "🐚", tap: "The shell radio played one soft ocean note." },
];

const seasons = ["spring", "summer", "autumn", "winter"];
const weatherBySeason = {
  spring: ["clear", "rain", "petal breeze"],
  summer: ["clear", "warm rain", "firefly dusk"],
  autumn: ["clear", "rain", "leaf wind"],
  winter: ["clear", "snow", "frost"],
};

const rareEvents = [
  "A ladybug landed on the window.",
  "Tiny found a shiny button under the rug.",
  "It rained all day and the room sounded sleepy.",
  "A little bird came to visit and bowed twice.",
  "A moonbeam made a silver square on the floor.",
  "Tiny tried to sing and surprised themself.",
  "You observed a meteor shower from the windowsill.",
  "Tiny learned to whistle one wobbly note.",
];

const adventureFinds = [
  { collectible: "🪶 feather", story: "Tiny came home with a feather and a story about a very dramatic breeze." },
  { collectible: "🌼 flower", story: "Tiny brought back a flower that smelled like sunshine." },
  { collectible: "💌 letter", story: "Tiny delivered a tiny sealed letter from the garden path." },
  { collectible: "🐚 shell", story: "Tiny found a shell that remembered the sea." },
  { collectible: "🪨 colored stone", story: "Tiny discovered a stone with a sunset trapped inside." },
  { collectible: "📷 photo", story: "Tiny returned with a blurry photo of a bird's left foot." },
  { collectible: "🍂 leaf", story: "Tiny carried home a leaf bigger than their whole ambition." },
];

const littleLetters = [
  "Today I saw a cloud shaped like a berry.",
  "I think rain smells nice.",
  "I had a happy dream.",
  "The plant told me a secret but it was mostly about soil.",
  "If I had a hat, I would tip it at the moon.",
];

const artByMood = {
  bright: String.raw`      

    |\\__/,|   (\`\\
  _.|o o  |_   ) )
-(((---(((--------`,

  cozy: String.raw`      
      |\\      _,,,---,,_
ZZZzz /,\`.-'\`'    -.  ;-;;,_
     |,4-  ) )-,_. ,\\ (  \`'-'
    '---''(_/--'  \`-'\\_)  ,`,

  tender: String.raw`      
           __..--''\`\`---....___   _..._    __
 /// //_.-'    .-/";  \`        \`\`<._  \`\`.''_ \`. / // /
///_.-' _..--.'_    \\                    \`( ) ) // //
/ (_..-' // (< _     ;_..__               ; \`' / ///
 / // // //  \`-._,_)' // / \`\`--...____..-' /// / //`
};

const actionText = {
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
  food: document.querySelector("#food-select"),
  wallpaper: document.querySelector("#wallpaper-select"),
  roomObject: document.querySelector("#object-select"),
  season: document.querySelector("#season-select"),
  interactiveObject: document.querySelector("#interactive-object"),
  timeChip: document.querySelector("#time-chip"),
  personalityChip: document.querySelector("#personality-chip"),
  collectionList: document.querySelector("#collection-list"),
  memoryList: document.querySelector("#memory-list"),
};

const defaultState = {
  day: 1,
  fullness: 72,
  joy: 68,
  tidiness: 74,
  lastVisit: new Date().toISOString(),
  journal: ["Day 1: A tiny friend moved into the sunny nook."],
  keepsakes: ["✿"],
  memories: ["Day 1: Tiny chose the softest corner of the room."],
  collections: ["✿ sprout"],
  recipes: [],
  personality: randomFrom(personalities).id,
  food: "moonberry",
  wallpaper: "dots",
  roomObject: "plant",
  season: "spring",
  weather: "clear",
  lastActionAt: new Date().toISOString(),
};

let state = loadState();
setupControls();
applyTimeAway();
render();

for (const button of document.querySelectorAll("[data-action]")) {
  button.addEventListener("click", () => care(button.dataset.action));
}

elements.reset.addEventListener("click", () => {
  state = freshState();
  saveState();
  syncControls();
  render();
});

elements.food.addEventListener("change", () => updateChoice("food", elements.food.value));
elements.wallpaper.addEventListener("change", () => updateChoice("wallpaper", elements.wallpaper.value));
elements.roomObject.addEventListener("change", () => updateChoice("roomObject", elements.roomObject.value));
elements.season.addEventListener("change", () => updateChoice("season", elements.season.value));
elements.interactiveObject.addEventListener("click", tapRoomObject);

function freshState() {
  const personality = randomFrom(personalities).id;

  return {
    ...structuredClone(defaultState),
    personality,
    lastVisit: new Date().toISOString(),
    lastActionAt: new Date().toISOString(),
    weather: rollWeather("spring"),
  };
}

function setupControls() {
  fillSelect(elements.food, foods, "id", (food) => `${food.icon} ${food.label}`);
  fillSelect(elements.wallpaper, wallpapers, "id", (wallpaper) => `${wallpaper.icon} ${wallpaper.label}`);
  fillSelect(elements.roomObject, roomObjects, "id", (object) => `${object.icon} ${object.label}`);
  fillSelect(elements.season, seasons.map((season) => ({ id: season, label: season })), "id", (season) => season.label);
  syncControls();
}

function fillSelect(select, items, valueKey, getLabel) {
  select.innerHTML = "";

  for (const item of items) {
    const option = document.createElement("option");
    option.value = item[valueKey];
    option.textContent = getLabel(item);
    select.append(option);
  }
}

function syncControls() {
  elements.food.value = state.food;
  elements.wallpaper.value = state.wallpaper;
  elements.roomObject.value = state.roomObject;
  elements.season.value = state.season;
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return freshState();
  }

  try {
    return migrateState({ ...structuredClone(defaultState), ...JSON.parse(saved) });
  } catch {
    return freshState();
  }
}

function migrateState(savedState) {
  return {
    ...savedState,
    personality: savedState.personality || randomFrom(personalities).id,
    memories: savedState.memories || ["Day 1: Tiny chose the softest corner of the room."],
    collections: savedState.collections || savedState.keepsakes || ["✿ sprout"],
    recipes: savedState.recipes || [],
    food: savedState.food || "moonberry",
    wallpaper: savedState.wallpaper || "dots",
    roomObject: savedState.roomObject || "plant",
    season: savedState.season || "spring",
    weather: savedState.weather || rollWeather(savedState.season || "spring"),
    lastActionAt: savedState.lastActionAt || savedState.lastVisit || new Date().toISOString(),
  };
}

function applyTimeAway() {
  const now = new Date();
  const previous = new Date(state.lastVisit);
  const daysAway = Math.max(0, Math.floor((now - previous) / DAY_MS));

  if (daysAway > 0) {
    state.day += daysAway;
    state.fullness = clamp(state.fullness - daysAway * 8);
    state.joy = clamp(state.joy - daysAway * 6);
    state.tidiness = clamp(state.tidiness - daysAway * 7);
    state.weather = rollWeather(state.season);
    addJournal(`Day ${state.day}: Tiny waited patiently and saved you a soft look.`);
    remember(`Day ${state.day}: You returned after ${daysAway} quiet day${daysAway === 1 ? "" : "s"}.`);
  }

  state.lastVisit = now.toISOString();
  saveState();
}

function care(action) {
  if (action === "feed") feedTiny();
  if (action === "play") playWithTiny();
  if (action === "tidy") tidyNook();
  if (action === "observe") observeTiny();
  if (action === "adventure") sendAdventure();
  if (action === "letter") readLetter();

  maybeRareEvent(action);
  maybeAdvanceDay();
  state.lastActionAt = new Date().toISOString();
  state.lastVisit = new Date().toISOString();
  saveState();
  render();
}

function feedTiny() {
  const food = foods.find((item) => item.id === state.food) || foods[0];
  const personality = getPersonality();
  const isFavorite = personality.favoriteFoods.includes(food.id);
  const reaction = isFavorite
    ? `Tiny's ${personality.label.toLowerCase()} heart sparkled. ${food.label} is a favorite food!`
    : randomFrom([
        `Tiny tasted the ${food.label.toLowerCase()} ${personality.diaryTone}.`,
        `The ${food.label.toLowerCase()} made Tiny do a very small nod.`,
      ]);

  state.fullness = clamp(state.fullness + food.fullness + (isFavorite ? 8 : 0));
  state.joy = clamp(state.joy + food.joy + (isFavorite ? 8 : 0));
  addJournal(`Day ${state.day}: ${food.icon} ${reaction}`);
  maybeDiscoverRecipe(food);
}

function playWithTiny() {
  state.joy = clamp(state.joy + (getPersonality().id === "energetic" ? 24 : 18));
  state.fullness = clamp(state.fullness - 3);
  addJournal(`Day ${state.day}: ${randomFrom(actionText.play)}`);
}

function tidyNook() {
  state.tidiness = clamp(state.tidiness + 20);
  state.joy = clamp(state.joy + (getPersonality().id === "shy" ? 8 : 3));
  addJournal(`Day ${state.day}: ${randomFrom(actionText.tidy)}`);
}

function observeTiny() {
  state.fullness = clamp(state.fullness + 3);
  state.joy = clamp(state.joy + 5);
  state.tidiness = clamp(state.tidiness + 3);
  addJournal(`Day ${state.day}: ${randomFrom(actionText.observe)}`);
}

function sendAdventure() {
  const find = randomFrom(adventureFinds);
  state.fullness = clamp(state.fullness - 8);
  state.joy = clamp(state.joy + 12);
  collect(find.collectible);
  addJournal(`Day ${state.day}: ${find.story}`);
  remember(`Day ${state.day}: Tiny went on a little adventure and found ${find.collectible}.`);
}

function readLetter() {
  const letter = randomFrom(littleLetters);
  state.joy = clamp(state.joy + 8);
  collect("💌 letter");
  addJournal(`Day ${state.day}: Tiny wrote, “${letter}”`);
  remember(`Day ${state.day}: You saved Tiny's letter: “${letter}”`);
}

function tapRoomObject() {
  const object = roomObjects.find((item) => item.id === state.roomObject) || roomObjects[0];
  state.joy = clamp(state.joy + 4);
  addJournal(`Day ${state.day}: ${object.tap}`);
  maybeRareEvent("object");
  saveState();
  render();
}

function updateChoice(key, value) {
  state[key] = value;

  if (key === "season") {
    state.weather = rollWeather(value);
  }

  if (key === "wallpaper") {
    addJournal(`Day ${state.day}: You changed the wallpaper to ${getWallpaper().label.toLowerCase()}.`);
  }

  if (key === "roomObject") {
    addJournal(`Day ${state.day}: You placed the ${getRoomObject().label.toLowerCase()} in the room.`);
  }

  saveState();
  render();
}

function maybeDiscoverRecipe(food) {
  if (state.recipes.length >= recipes.length || Math.random() <= 0.7) return;

  const unknownRecipes = recipes.filter((recipe) => !state.recipes.includes(recipe));
  const recipe = randomFrom(unknownRecipes);
  state.recipes.push(recipe);
  remember(`Day ${state.day}: Tiny discovered the recipe for ${recipe} after tasting ${food.label.toLowerCase()}.`);
}

function maybeRareEvent(action) {
  if (Math.random() <= 0.78) return;

  const event = randomFrom(rareEvents);
  addJournal(`Day ${state.day}: ${event}`);
  remember(`Day ${state.day}: ${event}`);

  if (action === "observe") {
    collect(randomFrom(["🍂 leaf", "🐚 shell", "🪨 colored stone", "📷 photo"]));
  }
}

function maybeAdvanceDay() {
  const actionsToday = state.journal.filter((entry) => entry.startsWith(`Day ${state.day}:`)).length;

  if (actionsToday > 0 && actionsToday % 8 === 0) {
    state.day += 1;
    state.weather = rollWeather(state.season);
    state.fullness = clamp(state.fullness - 7);
    state.joy = clamp(state.joy - 4);
    state.tidiness = clamp(state.tidiness - 5);
    addJournal(`Day ${state.day}: A new ${getTimeOfDay()} arrived with ${state.weather}.`);
  }
}

function rollWeather(season) {
  return randomFrom(weatherBySeason[season] || weatherBySeason.spring);
}

function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "night";
}

function render() {
  const mood = getMood();
  const average = Math.round((state.fullness + state.joy + state.tidiness) / 3);
  const wallpaper = getWallpaper();
  const object = getRoomObject();
  const seasonIcon = { spring: "🌱", summer: "☀️", autumn: "🍂", winter: "❄️" }[state.season];

  document.body.dataset.season = state.season;
  document.documentElement.style.setProperty("--wallpaper-pattern", wallpaper.pattern);
  document.documentElement.style.setProperty("--wallpaper-size", wallpaper.size);
  elements.art.textContent = artByMood[mood.name];
  elements.roomItems.textContent = `${seasonIcon} ${wallpaper.icon} ${object.icon} ${state.collections.slice(0, 5).join("  ")}     day ${state.day}`;
  elements.interactiveObject.textContent = `tap ${object.icon} ${object.label.toLowerCase()}`;
  elements.timeChip.textContent = `${getTimeOfDay()} · ${state.weather}`;
  elements.personalityChip.textContent = getPersonality().label;
  elements.moodLabel.textContent = mood.label;
  elements.statusCopy.textContent = `${mood.copy} Overall comfort: ${average}%. Favorite foods: ${getFavoriteFoodLabels().join(", ")}.`;
  elements.fullness.value = state.fullness;
  elements.joy.value = state.joy;
  elements.tidiness.value = state.tidiness;
  renderList(elements.journal, state.journal.slice(0, 8));
  renderList(elements.memoryList, state.memories.slice(0, 7));
  elements.collectionList.textContent = [...new Set([...state.collections, ...state.recipes.map((recipe) => `📖 ${recipe}`)])].join(" · ");
}

function renderList(list, entries) {
  list.innerHTML = "";

  for (const entry of entries) {
    const item = document.createElement("li");
    item.textContent = entry;
    list.append(item);
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

function getPersonality() {
  return personalities.find((personality) => personality.id === state.personality) || personalities[1];
}

function getFavoriteFoodLabels() {
  return getPersonality().favoriteFoods.map((foodId) => foods.find((food) => food.id === foodId)?.label || foodId);
}

function getWallpaper() {
  return wallpapers.find((wallpaper) => wallpaper.id === state.wallpaper) || wallpapers[0];
}

function getRoomObject() {
  return roomObjects.find((object) => object.id === state.roomObject) || roomObjects[0];
}

function addJournal(entry) {
  state.journal = [entry, ...state.journal].slice(0, 18);
}

function remember(entry) {
  state.memories = [entry, ...state.memories.filter((memory) => memory !== entry)].slice(0, 18);
}

function collect(item) {
  if (!state.collections.includes(item)) {
    state.collections = [item, ...state.collections].slice(0, 24);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function randomFrom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}
