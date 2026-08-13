import { ATTACKS, applyAttack, resolveAttack, winnerFor } from "./engine.js";
import { readingPause as calculateReadingPause } from "./timing.js";

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactViewport = window.matchMedia("(max-width: 640px)").matches;
const pace = (milliseconds) => (reducedMotion ? Math.min(milliseconds, 80) : milliseconds);

function readingPause(line, { minimum = 1450, maximum = 2700 } = {}) {
  return calculateReadingPause(line, { minimum, maximum, compact: compactViewport });
}

const office = document.querySelector("#office");
const controls = document.querySelector(".controls");
const radial = document.querySelector("#radial");
const radialCenter = document.querySelector("#radial-center");
const attackOptions = document.querySelector("#attack-options");
const attackDetail = document.querySelector("#attack-detail");
const selectedName = document.querySelector("#selected-name");
const selectedDescription = document.querySelector("#selected-description");
const speech = document.querySelector("#speech");
const speechAuthor = document.querySelector("#speech-author");
const speechLine = document.querySelector("#speech-line");
const sequenceLabel = document.querySelector("#sequence-label");
const damageNumber = document.querySelector("#damage-number");
const particles = document.querySelector("#particles");
const emailSwarm = document.querySelector("#email-swarm");
const calendarSwarm = document.querySelector("#calendar-swarm");
const chaosLayer = document.querySelector("#chaos-layer");
const bloodLayer = document.querySelector("#blood-layer");
const aiTerminal = document.querySelector("#ai-terminal");
const aiLog = document.querySelector("#ai-log");
const turnLabel = document.querySelector("#turn-label");
const caseNumber = document.querySelector("#case-number");
const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");
const resultScreen = document.querySelector("#result-screen");
const resultTitle = document.querySelector("#result-title");
const resultCopy = document.querySelector("#result-copy");
const rematchButton = document.querySelector("#rematch-button");
const resetButton = document.querySelector("#reset-button");
const soundToggle = document.querySelector("#sound-toggle");
const workers = [...document.querySelectorAll("[data-worker]")];
const playerCards = [...document.querySelectorAll("[data-player-card]")];

const playerTemplate = [
  { name: "MIRA", department: "PRODUKT", composure: 100 },
  { name: "JENS", department: "DRIFT", composure: 100 },
];

let players = playerTemplate.map((player) => ({ ...player }));
let activePlayer = 0;
let locked = false;
let gameOver = false;
let soundEnabled = true;
let audioContext;
let lastHoveredAttack = null;
let previousAttackId = null;

const attackLayouts = [
  ...[202, 232, 262, 292, 322, 350].map((angle) => ({ angle, ring: "inner" })),
  ...[184, 216, 248, 280, 312, 344].map((angle) => ({ angle, ring: "outer" })),
];

function buildAttackMenu() {
  ATTACKS.forEach((attack, index) => {
    const button = document.createElement("button");
    button.type = "button";
    const layout = attackLayouts[index];
    button.className = `attack-button is-${layout.ring}`;
    button.dataset.attack = attack.id;
    button.style.setProperty("--angle", `${layout.angle}deg`);
    button.style.setProperty("--counter-angle", `${-layout.angle}deg`);
    button.style.setProperty("--item-color", attack.color);
    button.setAttribute("aria-label", `${attack.key}: ${attack.label}. ${attack.short}`);
    button.innerHTML = `<b>${attack.icon}</b><small>${attack.key}</small>`;
    button.addEventListener("pointerenter", () => previewAttack(attack, button));
    button.addEventListener("focus", () => previewAttack(attack, button));
    button.addEventListener("click", () => playAttack(attack));
    attackOptions.append(button);
  });
}

function previewAttack(attack, button) {
  lastHoveredAttack?.classList.remove("is-selected");
  lastHoveredAttack = button;
  button.classList.add("is-selected");
  document.documentElement.style.setProperty("--attack", attack.color);
  selectedName.textContent = attack.label;
  selectedDescription.textContent = attack.short;
}

function setSpeech(author, line) {
  speechAuthor.textContent = author;
  speechLine.textContent = line;
  speech.classList.remove("is-speaking");
  void speech.offsetWidth;
  speech.classList.add("is-speaking");
}

function setPhase(phase) {
  office.classList.remove("is-windup", "is-impact", "is-recovery");
  if (phase) office.classList.add(`is-${phase}`);
}

function showSequenceLabel(label) {
  sequenceLabel.textContent = label;
  sequenceLabel.classList.remove("is-visible");
  void sequenceLabel.offsetWidth;
  sequenceLabel.classList.add("is-visible");
}

function showDamage(targetDamage, selfDamage) {
  const collateral = selfDamage > 0 ? `<small>−${selfDamage} collateral</small>` : "";
  damageNumber.innerHTML = `−${targetDamage}${collateral}`;
  damageNumber.style.left = activePlayer === 0 ? "74%" : "18%";
  damageNumber.classList.remove("is-visible");
  void damageNumber.offsetWidth;
  damageNumber.classList.add("is-visible");
}

function spawnParticles(count = 18) {
  particles.replaceChildren();
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("i");
    particle.className = "particle";
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.3;
    const distance = 60 + Math.random() * 180;
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    particle.style.left = activePlayer === 0 ? "69%" : "31%";
    particle.style.animationDelay = `${Math.random() * 90}ms`;
    particle.style.transform = `rotate(${Math.random() * 90}deg)`;
    particles.append(particle);
  }
}

function spawnBlood(outcome) {
  const amounts = {
    passive: 7,
    meeting: 11,
    reply: 17,
    synergy: 20,
    management: 5,
    ai: 26,
    jira: 21,
    powerpoint: 17,
    printer: 32,
    review: 15,
    offsite: 38,
    policy: 29,
  };
  const { attackId } = outcome;
  const sides = attackId === "synergy" ? [0, 1] : [activePlayer === 0 ? 1 : 0];
  const total = Math.round((amounts[attackId] ?? 12) * (outcome.critical ? 1.65 : 1));

  sides.forEach((side) => {
    workers[side].classList.add("is-bloodied");
    const origin = side === 0 ? 29 : 71;
    const direction = side === 0 ? 1 : -1;
    for (let index = 0; index < Math.ceil(total / sides.length); index += 1) {
      const drop = document.createElement("i");
      drop.className = "blood-drop";
      drop.style.setProperty("--blood-origin-x", `${origin + (Math.random() * 5 - 2.5)}%`);
      drop.style.setProperty("--blood-x", `${direction * (35 + Math.random() * 210)}px`);
      drop.style.setProperty("--blood-y", `${-130 + Math.random() * 310}px`);
      drop.style.setProperty("--blood-size", `${5 + Math.random() * 14}px`);
      drop.style.setProperty("--blood-rotate", `${Math.random() * 180}deg`);
      drop.style.animationDelay = `${Math.random() * 100}ms`;
      bloodLayer.append(drop);
      setTimeout(() => drop.remove(), pace(1100));
    }

    const splatCount = outcome.critical ? 7 : attackId === "ai" ? 5 : attackId === "management" ? 1 : 3;
    for (let index = 0; index < splatCount; index += 1) {
      const splat = document.createElement("i");
      splat.className = "blood-splat";
      splat.style.left = `${origin + direction * (5 + Math.random() * 21)}%`;
      splat.style.top = `${18 + Math.random() * 48}%`;
      splat.style.setProperty("--splat-size", `${17 + Math.random() * 37}px`);
      splat.style.setProperty("--splat-rotate", `${Math.random() * 360}deg`);
      splat.style.animationDelay = `${80 + Math.random() * 170}ms`;
      bloodLayer.append(splat);
    }
  });

  while (bloodLayer.querySelectorAll(".blood-splat").length > 36) {
    bloodLayer.querySelector(".blood-splat")?.remove();
  }
}

function chaosElement(className, text = "") {
  const element = document.createElement("i");
  element.className = className;
  element.textContent = text;
  chaosLayer.append(element);
  return element;
}

function spawnOfficeChaos(attackId, variant) {
  chaosLayer.replaceChildren();
  const direction = activePlayer === 0 ? 1 : -1;

  if (attackId === "jira") {
    const labels = ["BLOCKED", "TODO", "P0", "89 SP", "WON'T FIX", "NEEDS INFO"];
    for (let index = 0; index < 30; index += 1) {
      const card = chaosElement("jira-card", labels[index % labels.length]);
      card.style.setProperty("--jira-x", `${-270 + Math.random() * 540}px`);
      card.style.setProperty("--jira-rotate", `${-35 + Math.random() * 70}deg`);
      card.style.setProperty("--jira-delay", `${Math.random() * 0.55}s`);
      card.style.setProperty("--jira-scale", `${0.7 + Math.random() * 0.7}`);
    }
    return;
  }

  if (attackId === "powerpoint") {
    const slide = document.createElement("div");
    slide.className = "powerpoint-doom";
    slide.innerHTML = `<header>STRATEGISK RIKTNING <b>${94 + variant * 31} / 187</b></header><div class="doom-chart"><i></i><i></i><i></i></div><strong>${["Q4 MÄNNISKOVÄRDE", "SYNERGY FORECAST", "RESOURCE REALIGNMENT"][variant]}</strong><small>Data source: magkänsla</small>`;
    chaosLayer.append(slide);
    return;
  }

  if (attackId === "printer") {
    for (let index = 0; index < 28; index += 1) {
      const page = chaosElement("printer-page", index % 3 === 0 ? "KOPIA" : "");
      page.style.left = activePlayer === 0 ? "22%" : "78%";
      page.style.setProperty("--paper-x", `${direction * (170 + Math.random() * 620)}px`);
      page.style.setProperty("--paper-y", `${-230 + Math.random() * 430}px`);
      page.style.setProperty("--paper-delay", `${Math.random() * 0.7}s`);
      page.style.setProperty("--paper-rotate", `${-240 + Math.random() * 480}deg`);
    }
    return;
  }

  if (attackId === "review") {
    const stamp = document.createElement("div");
    stamp.className = "review-stamp";
    stamp.innerHTML = `<span>${["BEHÖVER FÖRBÄTTRAS", "EJ KALIBRERBAR", "POTENTIAL: ARKIVERAD"][variant]}</span><small>People & Culture</small>`;
    chaosLayer.append(stamp);
    return;
  }

  if (attackId === "offsite") {
    const bus = document.createElement("div");
    bus.className = `team-bus from-${activePlayer === 0 ? "left" : "right"}`;
    bus.innerHTML = `<b>OBLIGATORISKT KUL</b><span><i></i><i></i><i></i><i></i></span><small>OFFSITE OR BUST</small>`;
    chaosLayer.append(bus);
    return;
  }

  if (attackId === "policy") {
    const cannon = document.createElement("div");
    cannon.className = `policy-cannon from-${activePlayer === 0 ? "left" : "right"}`;
    cannon.innerHTML = `<b>HR</b><span>§47</span>`;
    chaosLayer.append(cannon);
    for (let index = 0; index < 18; index += 1) {
      const clause = chaosElement("policy-clause", ["SAMTYCKE", "BILAGA 9", "GODKÄND", "SE §47"][index % 4]);
      clause.style.setProperty("--clause-x", `${direction * (120 + Math.random() * 520)}px`);
      clause.style.setProperty("--clause-y", `${-170 + Math.random() * 340}px`);
      clause.style.setProperty("--clause-delay", `${Math.random() * 0.45}s`);
    }
    return;
  }

  if (attackId === "passive") {
    for (let index = 0; index < 9; index += 1) {
      const blade = chaosElement("memo-blade", ["VÄNLIGEN", "TIDIGARE", "ÅTERKOPPLA"][index % 3]);
      blade.style.setProperty("--memo-y", `${12 + Math.random() * 64}%`);
      blade.style.setProperty("--memo-delay", `${Math.random() * 0.5}s`);
      blade.classList.add(`from-${activePlayer === 0 ? "left" : "right"}`);
    }
  }
}

function spawnMail() {
  emailSwarm.replaceChildren();
  for (let index = 0; index < 14; index += 1) {
    const mail = document.createElement("i");
    mail.className = "mail";
    mail.textContent = "ALL";
    mail.style.setProperty("--top", `${8 + Math.random() * 74}%`);
    mail.style.setProperty("--speed", `${0.75 + Math.random() * 0.7}s`);
    mail.style.setProperty("--delay", `${Math.random() * 0.55}s`);
    if (activePlayer === 1) {
      mail.style.left = "auto";
      mail.style.right = "-15%";
      mail.style.animationDirection = "reverse";
    }
    emailSwarm.append(mail);
  }
}

function spawnInvites() {
  calendarSwarm.replaceChildren();
  for (let index = 0; index < 14; index += 1) {
    const invite = document.createElement("i");
    invite.className = "invite";
    invite.textContent = `${8 + (index % 9)}:${index % 2 ? "30" : "00"}`;
    invite.style.setProperty("--land-x", `${-260 + Math.random() * 520}px`);
    invite.style.setProperty("--rotate", `${-20 + Math.random() * 40}deg`);
    invite.style.setProperty("--speed", `${0.8 + Math.random() * 0.7}s`);
    invite.style.setProperty("--delay", `${Math.random() * 0.65}s`);
    calendarSwarm.append(invite);
  }
}

function clearEffects() {
  particles.replaceChildren();
  emailSwarm.replaceChildren();
  calendarSwarm.replaceChildren();
  chaosLayer.replaceChildren();
  aiTerminal.classList.remove("is-visible");
  aiTerminal.setAttribute("aria-hidden", "true");
  aiLog.textContent = "";
}

function getAudioContext() {
  if (!soundEnabled) return null;
  audioContext ||= new AudioContext();
  if (audioContext.state === "suspended") void audioContext.resume();
  return audioContext;
}

function tone(frequency, duration = 0.12, type = "square", volume = 0.035, delay = 0) {
  const context = getAudioContext();
  if (!context) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(45, frequency * 0.62), start + duration);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playUiSound() {
  tone(380, 0.05, "square", 0.018);
  tone(570, 0.05, "square", 0.014, 0.04);
}

function playImpactSound(attackId) {
  if (attackId === "ai") {
    for (let index = 0; index < 7; index += 1) tone(880 - index * 85, 0.11, "sawtooth", 0.025, index * 0.09);
    return;
  }
  if (attackId === "reply") {
    for (let index = 0; index < 8; index += 1) tone(240 + index * 54, 0.08, "square", 0.018, index * 0.035);
    return;
  }
  tone(130, 0.18, "sawtooth", 0.045);
  tone(70, 0.22, "square", 0.035, 0.04);
}

async function runAiPrelude() {
  aiTerminal.classList.add("is-visible");
  aiTerminal.setAttribute("aria-hidden", "false");
  const entries = [
    "> analyserar organisatorisk konflikt…",
    "> begär minsta nödvändiga behörighet… BEVILJAD: ROOT",
    "> optimerar Teams, skrivare och utrymningssystem…",
    "> resultat inom 5 sekunder ██████████ 100%",
  ];
  for (const entry of entries) {
    aiLog.textContent += `${entry}\n`;
    tone(620 + Math.random() * 180, 0.04, "square", 0.012);
    await wait(pace(900));
  }
  await wait(pace(300));
  aiTerminal.classList.remove("is-visible");
}

function updateHud() {
  playerCards.forEach((card, index) => {
    const value = players[index].composure;
    const meter = card.querySelector(".composure-track");
    card.classList.toggle("is-active", index === activePlayer && !gameOver);
    card.querySelector(".composure-fill").style.transform = `scaleX(${value / 100})`;
    card.querySelector(".composure-meta b").textContent = value;
    meter.setAttribute("aria-valuenow", String(value));
  });
  turnLabel.textContent = gameOver ? "ÄRENDET STÄNGT" : `${players[activePlayer].name} HAR ORDET`;
}

function resetWorkerState() {
  workers.forEach((worker) => worker.classList.remove("is-attacker", "is-target"));
  office.classList.remove("is-sequencing");
  office.classList.remove("is-critical");
  office.removeAttribute("data-attack");
  office.removeAttribute("data-variant");
  setPhase(null);
}

function setWorkerRoles() {
  workers.forEach((worker, index) => {
    worker.classList.toggle("is-attacker", index === activePlayer);
    worker.classList.toggle("is-target", index !== activePlayer);
  });
  const direction = activePlayer === 0 ? 1 : -1;
  office.style.setProperty("--windup-x", `${direction * -18}px`);
  office.style.setProperty("--windup-rotate", `${direction * -3}deg`);
  office.style.setProperty("--strike-x", `${direction * 72}px`);
  office.style.setProperty("--strike-end-x", `${direction * 38}px`);
  office.style.setProperty("--strike-rotate", `${direction * 4}deg`);
  office.style.setProperty("--target-x", `${direction * 45}px`);
  office.style.setProperty("--target-double-x", `${direction * 90}px`);
  office.style.setProperty("--target-triple-x", `${direction * 158}px`);
  office.style.setProperty("--target-quad-x", `${direction * 180}px`);
  office.style.setProperty("--target-mid-x", `${direction * 30}px`);
  office.style.setProperty("--target-end-x", `${direction * 38}px`);
  office.style.setProperty("--target-rotate", `${direction * 8}deg`);
  office.style.setProperty("--target-mid-rotate", `${direction * -4}deg`);
  office.style.setProperty("--target-end-rotate", `${direction * 2}deg`);
}

async function playAttack(attack) {
  if (locked || gameOver) return;
  locked = true;
  controls.classList.add("is-locked");
  radial.classList.remove("is-open");
  radialCenter.setAttribute("aria-expanded", "false");
  document.documentElement.style.setProperty("--attack", attack.color);
  office.dataset.attack = attack.id;
  office.classList.add("is-sequencing");
  setWorkerRoles();

  const outcome = resolveAttack(attack, Math.random, previousAttackId);
  office.dataset.variant = String(outcome.variant);
  office.classList.toggle("is-critical", outcome.critical);
  const attacker = players[activePlayer];
  showSequenceLabel(outcome.combo?.label ?? (outcome.critical ? `KRITISK ${attack.label}` : attack.label));
  playUiSound();
  await wait(pace(800));

  setSpeech(`${attacker.name} / ${attacker.department}`, outcome.intent);
  setPhase("windup");
  await wait(readingPause(outcome.intent));
  setSpeech(`${attacker.name} / OPROFESSIONELLT`, outcome.insult);
  await wait(readingPause(outcome.insult, { minimum: 1600, maximum: 2900 }));

  if (attack.id === "meeting") spawnInvites();
  if (attack.id === "reply") spawnMail();
  if (attack.id === "ai") await runAiPrelude();
  spawnOfficeChaos(attack.id, outcome.variant);

  setPhase("impact");
  playImpactSound(attack.id);
  spawnParticles(attack.id === "reply" || attack.id === "ai" ? 30 : 18);
  spawnBlood(outcome);
  players = applyAttack(players, activePlayer, outcome);
  updateHud();
  showDamage(outcome.targetDamage, outcome.selfDamage);
  setSpeech(outcome.critical ? "KRITISK FEEDBACK" : outcome.combo ? `COMBO // ${outcome.combo.label}` : "KONSEKVENS", outcome.impact);

  const impactDurations = { management: 2500, ai: 1700, offsite: 1850, printer: 1550, powerpoint: 1450 };
  const impactDuration = impactDurations[attack.id] ?? 1150;
  const impactReadingDuration = readingPause(outcome.impact, { minimum: 1650, maximum: 2900 });
  await wait(Math.max(pace(impactDuration), impactReadingDuration));
  setPhase("recovery");
  if (outcome.critical || outcome.variant === 2) {
    setSpeech("SYSTEMANOMALI", outcome.anomaly);
    await wait(readingPause(outcome.anomaly, { minimum: 1550, maximum: 2500 }));
  } else {
    await wait(pace(750));
  }

  const winner = winnerFor(players);
  clearEffects();
  resetWorkerState();
  if (winner !== null) {
    finishGame(winner);
    return;
  }

  previousAttackId = attack.id;
  activePlayer = activePlayer === 0 ? 1 : 0;
  updateHud();
  setSpeech("SYSTEM", `${players[activePlayer].name}, välj den professionella vägen framåt.`);
  selectedName.textContent = "VÄLJ I RADIALMENYN";
  selectedDescription.textContent = "Samma attack får sällan exakt samma konsekvens.";
  document.documentElement.style.setProperty("--attack", players[activePlayer].department === "PRODUKT" ? "#ffd166" : "#f4a261");
  controls.classList.remove("is-locked");
  radial.classList.add("is-open");
  radialCenter.setAttribute("aria-expanded", "true");
  locked = false;
}

function finishGame(winner) {
  gameOver = true;
  locked = false;
  controls.classList.remove("is-locked");
  updateHud();
  if (winner === "draw") {
    resultTitle.textContent = "GEMENSAM LEVERANS";
    resultCopy.textContent = "Båda tappade fattningen samtidigt. HR klassar detta som tvärfunktionell synergi och bokar en workshop.";
  } else {
    const victor = players[winner];
    const defeated = players[winner === 0 ? 1 : 0];
    resultTitle.textContent = `${victor.name} STÅR KVAR`;
    resultCopy.textContent = `${defeated.name} har tappat all professionell fattning. ${victor.name} belönas med ägarskap för incidentrapporten.`;
  }
  setTimeout(() => {
    resultScreen.hidden = false;
    rematchButton.focus();
  }, pace(450));
}

function newGame({ hideStart = true } = {}) {
  players = playerTemplate.map((player) => ({ ...player }));
  activePlayer = Math.random() < 0.5 ? 0 : 1;
  locked = false;
  gameOver = false;
  previousAttackId = null;
  resultScreen.hidden = true;
  clearEffects();
  bloodLayer.replaceChildren();
  workers.forEach((worker) => worker.classList.remove("is-bloodied"));
  resetWorkerState();
  controls.classList.remove("is-locked");
  radial.classList.add("is-open");
  radialCenter.setAttribute("aria-expanded", "true");
  caseNumber.textContent = `ES-2026-${String(1 + Math.floor(Math.random() * 998)).padStart(3, "0")}`;
  updateHud();
  setSpeech("SYSTEM", `${players[activePlayer].name} har ordet. Välj en åtgärd.`);
  selectedName.textContent = "VÄLJ I RADIALMENYN";
  selectedDescription.textContent = "Tolv helt professionella sätt att lösa situationen.";
  document.documentElement.style.setProperty("--attack", activePlayer === 0 ? "#ffd166" : "#f4a261");
  if (hideStart) startScreen.classList.add("is-hidden");
}

radialCenter.addEventListener("click", () => {
  if (locked || gameOver) return;
  playUiSound();
  const open = radial.classList.toggle("is-open");
  radialCenter.setAttribute("aria-expanded", String(open));
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  soundToggle.querySelector(".sr-only").textContent = soundEnabled ? "Stäng av ljud" : "Slå på ljud";
  if (soundEnabled) playUiSound();
});

startButton.addEventListener("click", () => {
  getAudioContext();
  newGame();
});
rematchButton.addEventListener("click", () => newGame());
resetButton.addEventListener("click", () => newGame());

window.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  if (event.key === "Enter" && !startScreen.classList.contains("is-hidden")) {
    startButton.click();
    return;
  }
  if (event.key.toLowerCase() === "m") {
    soundToggle.click();
    return;
  }
  if (event.key.toLowerCase() === "r") {
    newGame();
    return;
  }
  const attack = ATTACKS.find((item) => item.key === event.key.toLowerCase());
  if (attack && startScreen.classList.contains("is-hidden")) void playAttack(attack);
});

buildAttackMenu();
const launchParams = new URLSearchParams(window.location.search);
const skipIntro = launchParams.has("play") || launchParams.has("preview");
if (skipIntro) startScreen.hidden = true;
newGame({ hideStart: skipIntro });
const previewSceneAttack = ATTACKS.find((attack) => attack.id === launchParams.get("preview"));
if (previewSceneAttack) {
  document.body.classList.add("is-preview");
  locked = true;
  office.dataset.attack = previewSceneAttack.id;
  office.dataset.variant = "1";
  office.classList.add("is-sequencing", "is-impact", "is-critical");
  setWorkerRoles();
  spawnOfficeChaos(previewSceneAttack.id, 1);
  spawnBlood({ attackId: previewSceneAttack.id, critical: true });
  setSpeech("SEKVENSFÖRHANDSGRANSKNING", previewSceneAttack.short);
}
