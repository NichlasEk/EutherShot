export const ATTACKS = Object.freeze([
  {
    id: "passive",
    key: "1",
    label: "PASSIV AGGRESSIVITET",
    short: "Som tidigare kommunicerats…",
    icon: "↪",
    damage: [10, 16],
    recoil: [0, 2],
    color: "#ffd166",
  },
  {
    id: "meeting",
    key: "2",
    label: "MÖTESBOKNING",
    short: "Fjorton obligatoriska inbjudningar.",
    icon: "14",
    damage: [12, 19],
    recoil: [1, 4],
    color: "#78d5e3",
  },
  {
    id: "reply",
    key: "3",
    label: "REPLY ALL",
    short: "Massiv area damage.",
    icon: "@",
    damage: [17, 24],
    recoil: [5, 9],
    color: "#ff6b6b",
  },
  {
    id: "synergy",
    key: "4",
    label: "SYNERGI",
    short: "Båda tar skada.",
    icon: "∞",
    damage: [13, 19],
    recoil: [13, 19],
    color: "#b794f6",
  },
  {
    id: "management",
    key: "5",
    label: "ESCALATE TO MANAGEMENT",
    short: "Bossen tittar in. Eventuellt.",
    icon: "↑",
    damage: [7, 25],
    recoil: [0, 6],
    color: "#f4a261",
  },
  {
    id: "ai",
    key: "6",
    label: "AI DELEGATION",
    short: "Codex, lös situationen.",
    icon: "AI",
    damage: [20, 28],
    recoil: [9, 16],
    color: "#7cf8c8",
  },
]);

export const LINES = Object.freeze({
  passive: {
    intent: [
      "Som tidigare kommunicerats…",
      "Bara en vänlig påminnelse…",
      "Jag bifogar tråden nedan för transparens.",
    ],
    impact: [
      "…så ägs nästa steg fortfarande av dig.",
      "Vänligen återkom före gårdagens EOD.",
      "Tar tystnaden som ett godkännande.",
    ],
  },
  meeting: {
    intent: [
      "Vi behöver synka om synken.",
      "Jag hittar en lucka i allas kalendrar.",
      "Kort avstämning. Max två timmar.",
    ],
    impact: [
      "14 nya kalenderinbjudningar",
      "Återkommande till och med 2031",
      "Obligatorisk förberedande retro",
    ],
  },
  reply: {
    intent: [
      "Loopar in några relevanta personer.",
      "Replying all for visibility.",
      "+ ekonomi, juridik och hela Norden",
    ],
    impact: [
      "INKORGEN HAR SLUTAT SVARA",
      "428 autosvar träffar kontoret",
      "VD:n svarar: ‘Avregistrera mig’",
    ],
  },
  synergy: {
    intent: [
      "Det här kräver gemensamt ägarskap.",
      "Låt oss skapa en task force.",
      "En plus en blir organisatoriskt tre.",
    ],
    impact: [
      "ANSVARET ÄR NU CIRKULÄRT",
      "Båda blir workstream leads",
      "Ingen vet vad leveransen är",
    ],
  },
  management: {
    intent: [
      "Jag tar det här vidare.",
      "Vi behöver ett exekutivt beslut.",
      "Dags att eskalera konstruktivt.",
    ],
    impact: [
      "Bossen: ‘Fortsätt ni.’",
      "Bossen söker ögonkontakt och försvinner",
      "Management önskar ett beslutsunderlag",
    ],
  },
  ai: {
    intent: [
      "Codex, lös situationen.",
      "Agent, optimera arbetsplatsen.",
      "Du har admin. Var försiktig.",
    ],
    impact: [
      "BRANDLARMET HAR NYA BEHÖRIGHETER",
      "Skrivaren är nu domänadministratör",
      "Incidentrapporten skrev sig själv",
    ],
  },
});

export function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomInt([minimum, maximum], random = Math.random) {
  return minimum + Math.floor(random() * (maximum - minimum + 1));
}

export function pick(items, random = Math.random) {
  return items[Math.min(items.length - 1, Math.floor(random() * items.length))];
}

export function resolveAttack(attack, random = Math.random) {
  const lines = LINES[attack.id];
  return {
    attackId: attack.id,
    targetDamage: randomInt(attack.damage, random),
    selfDamage: randomInt(attack.recoil, random),
    intent: pick(lines.intent, random),
    impact: pick(lines.impact, random),
  };
}

export function applyAttack(players, attackerIndex, outcome) {
  const next = players.map((player) => ({ ...player }));
  const targetIndex = attackerIndex === 0 ? 1 : 0;
  next[targetIndex].composure = Math.max(0, next[targetIndex].composure - outcome.targetDamage);
  next[attackerIndex].composure = Math.max(0, next[attackerIndex].composure - outcome.selfDamage);
  return next;
}

export function winnerFor(players) {
  if (players.every((player) => player.composure <= 0)) return "draw";
  if (players[0].composure <= 0) return 1;
  if (players[1].composure <= 0) return 0;
  return null;
}
