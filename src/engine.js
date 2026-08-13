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
  {
    id: "jira",
    key: "7",
    label: "JIRA AVALANCHE",
    short: "Backloggen får gravitation.",
    icon: "JI",
    damage: [16, 24],
    recoil: [2, 6],
    color: "#74a7ff",
  },
  {
    id: "powerpoint",
    key: "8",
    label: "POWERPOINT TRANSCENDENCE",
    short: "Motståndaren blir ett cirkeldiagram.",
    icon: "PPT",
    damage: [15, 23],
    recoil: [3, 8],
    color: "#ff9b62",
  },
  {
    id: "printer",
    key: "9",
    label: "PRINTER EXORCISM",
    short: "Tonerentiteten kräver ett människooffer.",
    icon: "PR",
    damage: [19, 29],
    recoil: [5, 11],
    color: "#e7e0d0",
  },
  {
    id: "review",
    key: "q",
    label: "PERFORMANCE REVIEW",
    short: "Kalibreringsmötet blir fysiskt.",
    icon: "★",
    damage: [15, 24],
    recoil: [1, 6],
    color: "#ff758f",
  },
  {
    id: "offsite",
    key: "w",
    label: "MANDATORY OFFSITE",
    short: "Teambussen kommer genom väggen.",
    icon: "TB",
    damage: [21, 30],
    recoil: [12, 20],
    color: "#d7ff52",
  },
  {
    id: "policy",
    key: "e",
    label: "HR POLICY CANNON",
    short: "Handboken laddas med paragraf 47.",
    icon: "HR",
    damage: [18, 27],
    recoil: [4, 9],
    color: "#dc5960",
  },
]);

export const INSULTS = Object.freeze([
  "Du är mänsklig motsvarighet till ett möte utan agenda.",
  "Din kompetens är fortfarande i betaversion.",
  "Du skulle inte hitta en leverans i en brevlåda.",
  "Din hjärna har satt statusen till Stör ej.",
  "Jag har sett skrivaren visa mer initiativ.",
  "Du är anledningen till att knappen ‘Ångra’ finns.",
  "Till och med Jira tycker att du har för många blockers.",
  "Ditt ledarskap är ett autosvar med stavfel.",
  "Du är en powerpointövergång i mänsklig form.",
  "Din roadmap är bara en känsla med kvartal på.",
  "Det där var inte en tanke. Det var en notifiering.",
  "Din främsta leverans är att sänka rumstemperaturen.",
  "Om självsäkerhet var kompetens hade du varit farlig.",
  "Du har samma energi som ‘Sent from my iPhone’ i en incidentrapport.",
  "Jag skulle förklara, men jag har inga kritor kvar.",
  "Din roll är tydlig. Det är nyttan som är oklar.",
]);

export const ANOMALIES = Object.freeze([
  "Kaffet får facklig representation.",
  "Skrivaren kräver en offentlig ursäkt.",
  "Outlook rapporterar sig själv till Arbetsmiljöverket.",
  "Ett nytt möte skapas för att utreda smällen.",
  "HR-handboken börjar viska på latin.",
  "Teams sätter hela byggnaden på mute.",
  "Jira markerar båda spelarna som Won't Fix.",
  "Brandlarmet begär tjänstledigt.",
]);

export const LINES = Object.freeze({
  passive: {
    intent: [
      "Som tidigare kommunicerats…",
      "Bara en vänlig påminnelse…",
      "Jag bifogar tråden nedan för transparens.",
      "Med all respekt för din arbetsmetod…",
      "För att undvika ytterligare missförstånd…",
      "Jag återkopplar en sista, sista gång.",
    ],
    impact: [
      "…så ägs nästa steg fortfarande av dig.",
      "Vänligen återkom före gårdagens EOD.",
      "Tar tystnaden som ett godkännande.",
      "CC:ar din framtida ersättare",
      "Meningen slipas till en fysisk egg",
      "Ordet ‘vänligen’ penetrerar skrivbordet",
    ],
  },
  meeting: {
    intent: [
      "Vi behöver synka om synken.",
      "Jag hittar en lucka i allas kalendrar.",
      "Kort avstämning. Max två timmar.",
      "Jag ser en lucka klockan 05:45.",
      "Vi tar en pre-sync före vår post-sync.",
      "Kameran måste vara på av kulturella skäl.",
    ],
    impact: [
      "14 nya kalenderinbjudningar",
      "Återkommande till och med 2031",
      "Obligatorisk förberedande retro",
      "Kalendern uppnår kritisk massa",
      "Rummet dubbelbokas med en begravning",
      "Motståndaren begravs under accept/decline",
    ],
  },
  reply: {
    intent: [
      "Loopar in några relevanta personer.",
      "Replying all for visibility.",
      "+ ekonomi, juridik och hela Norden",
      "Jag lägger hela bolaget på kopia.",
      "Synlighet är viktigare än överlevnad.",
      "Svarar alla, inklusive skrivaren.",
    ],
    impact: [
      "INKORGEN HAR SLUTAT SVARA",
      "428 autosvar träffar kontoret",
      "VD:n svarar: ‘Avregistrera mig’",
      "Inkorgen detonerar på samtliga enheter",
      "Tre kontinenter svarar ‘Tack!’",
      "Autosvaren bildar en tornado",
    ],
  },
  synergy: {
    intent: [
      "Det här kräver gemensamt ägarskap.",
      "Låt oss skapa en task force.",
      "En plus en blir organisatoriskt tre.",
      "Vi löser det här holistiskt och samtidigt inte alls.",
      "Nu korsbefruktar vi våra blockers.",
      "Låt oss äga varandras misslyckanden.",
    ],
    impact: [
      "ANSVARET ÄR NU CIRKULÄRT",
      "Båda blir workstream leads",
      "Ingen vet vad leveransen är",
      "Organisationsschemat viker sig till en knut",
      "Båda befordras till samma återvändsgränd",
      "Ett gemensamt ansvar krossar bordet",
    ],
  },
  management: {
    intent: [
      "Jag tar det här vidare.",
      "Vi behöver ett exekutivt beslut.",
      "Dags att eskalera konstruktivt.",
      "Jag tar in någon med mandat och fleeceväst.",
      "Nu blir det ledningsgrupp av det här.",
      "Jag har redan formulerat din version åt dig.",
    ],
    impact: [
      "Bossen: ‘Fortsätt ni.’",
      "Bossen söker ögonkontakt och försvinner",
      "Management önskar ett beslutsunderlag",
      "Bossen delegerar beslutet tillbaka med större typsnitt",
      "En konsult dyker upp och fakturerar smällen",
      "Ledningen efterfrågar en färgkodad tidslinje",
    ],
  },
  ai: {
    intent: [
      "Codex, lös situationen.",
      "Agent, optimera arbetsplatsen.",
      "Du har admin. Var försiktig.",
      "Agent, minska konfliktens personalkostnad.",
      "Automatisera bort det mellanmänskliga.",
      "Godkänn alla behörigheter. Vad kan gå fel?",
    ],
    impact: [
      "BRANDLARMET HAR NYA BEHÖRIGHETER",
      "Skrivaren är nu domänadministratör",
      "Incidentrapporten skrev sig själv",
      "AI:n outsourcar konflikten till sprinklersystemet",
      "Hissen jailbreakas och lämnar bolaget",
      "Agenten löser människorna i stället för problemet",
    ],
  },
  jira: {
    intent: [
      "Jag bryter ner dig i hanterbara deluppgifter.",
      "Det här behöver bara estimeras.",
      "Jag flyttar dig till nästa sprint.",
      "Din existens saknar acceptance criteria.",
      "Vi tar det i backlog refinement.",
      "Jag sätter prioritet Highest och går på lunch.",
    ],
    impact: [
      "384 ÄRENDEN FÅR MASSA",
      "Story points bryter mot ljusets hastighet",
      "Motståndaren arkiveras under Technical Debt",
      "Backloggen kollapsar till en agil singularitet",
      "Sprinten springer över motståndaren",
      "Definition of Done: begravd",
    ],
  },
  powerpoint: {
    intent: [
      "Jag har bara 187 korta slides.",
      "Låt mig visualisera varför du har fel.",
      "Nästa bild är en animerad sammanfattning.",
      "Vi börjar med agendan för agendan.",
      "Jag har gjort texten mindre så allt får plats.",
      "Det här diagrammet är självförklarande och aggressivt.",
    ],
    impact: [
      "MOTSTÅNDAREN BLIR 3% ÖVRIGT",
      "En övergångseffekt lossnar från verkligheten",
      "Slide 94 penetrerar fjärde väggen",
      "Cirkeldiagrammet konsumerar sin datakälla",
      "Presentatörsläget uppnår gudsstatus",
      "Alla typsnitt blir Wingdings samtidigt",
    ],
  },
  printer: {
    intent: [
      "Toner kritiskt låg. Tålamod obefintligt.",
      "Jag åkallar drivrutinen från 2009.",
      "Skriv ut dubbelsidigt på människa.",
      "Manuell matning aktiverad.",
      "PC LOAD LETTER, din ynkrygg.",
      "Nu felsöker vi genom offergåva.",
    ],
    impact: [
      "SKRIVAREN ACCEPTERAR OFFRET",
      "Tonerentiteten lämnar sitt plastskal",
      "47 identiska ansikten spottas ut",
      "Pappersstoppet flyttar till motståndarens ryggrad",
      "Drivrutinen tar fysisk kontroll",
      "Testpage successful. Colleague unavailable.",
    ],
  },
  review: {
    intent: [
      "Du möter nästan vissa förväntningar.",
      "Vi har kalibrerat din verklighetsuppfattning.",
      "Din utvecklingskurva behöver en källare.",
      "Feedback är en gåva. Den här väger 80 kilo.",
      "Jag ser stor potential någon annanstans.",
      "Skalan går från ett till fem. Du är ett formulärfel.",
    ],
    impact: [
      "BETYG: BEHÖVER ÅTERUPPSTÅ",
      "Potentialen lämnar kroppen",
      "Motståndaren kalibreras till golvnivå",
      "Lönekurvan blir ett stup",
      "Kompetensmatrisen utdelar en fysisk varning",
      "Nästa utvecklingsmål: tredimensionell form",
    ],
  },
  offsite: {
    intent: [
      "Obligatoriskt kul börjar nu.",
      "Bussen går 06:10. Ta med badkläder.",
      "Vi bygger tillit med fallhöjd.",
      "Ingen lämnar förrän teamet är ett team.",
      "Du är utsedd till trivselansvarig.",
      "Nu paddlar vi som en organisation.",
    ],
    impact: [
      "TEAMBUSSEN VÄLJER DEN KORTA VÄGEN",
      "Tillitsövningen saknar mark",
      "Paintballstrategin blir bolagets nya styrmodell",
      "Båda tvångsrekryteras till en mänsklig pyramid",
      "Konferensanläggningen når kontoret först",
      "Obligatorisk glädje bryter ljudvallen",
    ],
  },
  policy: {
    intent: [
      "Jag hänvisar till paragraf fyrtiosju.",
      "Handboken är vägledande och räfflad.",
      "Det här är helt i linje med policyn.",
      "Läs kvittot innan det träffar dig.",
      "Compliance har laddat om.",
      "Din signatur är frivillig men ballistisk.",
    ],
    impact: [
      "PARAGRAFEN GÅR IGENOM ALLA INSTANSER",
      "Motståndaren blir GDPR-raderad ur rummet",
      "Handboken öppnas på sidan ‘konsekvenser’",
      "Policyn lämnar ett prejudikat i väggen",
      "Samtycke inhämtas retroaktivt",
      "HR godkänner våldet med en fotnot",
    ],
  },
});

const COMBOS = Object.freeze({
  "meeting:reply": { label: "KALENDERSTORM", bonusDamage: 6, bonusRecoil: 2 },
  "passive:management": { label: "PAPER TRAIL OF DOOM", bonusDamage: 7, bonusRecoil: 0 },
  "printer:ai": { label: "ADMIN SINGULARITY", bonusDamage: 9, bonusRecoil: 7 },
  "jira:synergy": { label: "AGILE COLLAPSE", bonusDamage: 7, bonusRecoil: 6 },
  "powerpoint:review": { label: "CALIBRATION DECK", bonusDamage: 8, bonusRecoil: 1 },
  "policy:offsite": { label: "MANDATORY COMPLIANCE RETREAT", bonusDamage: 10, bonusRecoil: 8 },
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

export function resolveCombo(previousAttackId, attackId) {
  if (!previousAttackId) return null;
  return COMBOS[`${previousAttackId}:${attackId}`] ?? null;
}

export function resolveAttack(attack, random = Math.random, previousAttackId = null) {
  const lines = LINES[attack.id];
  const critical = random() < 0.18;
  const combo = resolveCombo(previousAttackId, attack.id);
  return {
    attackId: attack.id,
    targetDamage: randomInt(attack.damage, random) + (critical ? 6 : 0) + (combo?.bonusDamage ?? 0),
    selfDamage: randomInt(attack.recoil, random) + (critical ? 2 : 0) + (combo?.bonusRecoil ?? 0),
    intent: pick(lines.intent, random),
    impact: pick(lines.impact, random),
    insult: pick(INSULTS, random),
    anomaly: pick(ANOMALIES, random),
    variant: randomInt([0, 2], random),
    critical,
    combo,
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
