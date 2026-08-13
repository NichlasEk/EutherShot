# EutherShot handoff — 2026-08-13

## Målet

EutherShot är en modern webbtolkning av *Take Your Best Shot* (1995): en snabb,
turordningsbaserad "office violence toy" för två personer. Den körs som ett
Play Vessel i EutherOxide.

Live:

- `https://apothictech.se/#/play/euthershot`
- Runtime: `/euthershot-runtime/index.html`

## Nuvarande läge

EutherShot v0.2.1 är byggd, pushad och live.

- 12 attacker i en tvårings-radialmeny.
- Slumpade avsiktsrepliker, förolämpningar, konsekvenser och systemanomalier.
- Kritiska träffar, sex attackkombinationer och tre visuella varianter.
- Procedurala ljudeffekter finns; riktiga ljudfiler från `.88` är uppskjutna.
- Mobilvägen fyller nu hela viewporten och fungerar på GrapheneOS/Vanadium.
- Dialogtempot är textlängdsstyrt: ungefär 1,5–2,9 sekunder per textrad, med
  lite extra tid på smala skärmar.
- `prefers-reduced-motion` kortar inte längre lästiden till nästan noll.
- SVG-figurerna använder uttryckligen sRGB och browserns automatiska
  färgomskrivning är avstängd för dem.

Senast verifierat:

- `npm run check`: 8/8 tester godkända.
- `npm run build`: godkänd, `dist/build.json` visar v0.2.1.
- Mobilrendering kontrollerad i 390 × 844.
- `eutherhost.service`: aktiv.
- Publika Play-rutten svarar HTTP 200.
- Lokala hostvägen svarar 308 till den publika HTTPS-runtimevägen, vilket är
  förväntat.

## Git

EutherShot, `/home/nichlas/EutherShot`:

- Gren: `main`, synkad med `origin/main` när denna handoff skrevs.
- `bfab8f1 Refresh EutherShot 0.2.1 assets`
- `27734f1 Give office chaos time to land`
- `3a1f004 Turn the office duel up to eleven`
- `d3b2606 Build the first EutherShot office duel`

EutherOxide, `/home/nichlas/EutherOxide`:

- Gren: `agent/euthernet-admin-boundary`, synkad med motsvarande remote.
- `0a53864 Fix EutherShot mobile launch layout`
- `4c85071 Add EutherShot play vessel`
- `webview/build-info.ts` är fortfarande modifierad sedan tidigare och är
  orelaterad till EutherShot. Ändra, återställ eller committa den inte av
  misstag.

## Färgfrågan att fortsätta med på `.88`

Rapporten är att figurernas färger skiljer sig på Arch/Wayland jämfört med
Windows och GrapheneOS/Vanadium. Den avsedda paletten är mörkgrå kostymer med
varma hudtoner:

- Mira jacka: `#495b64`, hud: `#d4a079`
- Jens jacka: `#5a5350`, hud: `#c8936f`

Skydd som redan är infört:

- `<meta name="color-scheme" content="dark only">`
- `color-scheme: only dark`
- `color-interpolation: sRGB`
- `color-interpolation-filters: sRGB`
- `forced-color-adjust: none` på figurernas SVG

Nästa steg är att klistra in skärmbilder från den felaktiga Arch/Wayland-vyn
och helst även en korrekt Windows- eller telefonvy. Jämför samma stilla läge,
gärna direkt efter startsidan eller med:

`https://apothictech.se/euthershot-runtime/index.html?preview=passive`

Notera samtidigt:

- webbläsare och version,
- compositor (t.ex. KDE/KWin, GNOME/Mutter eller Hyprland),
- om HDR, ICC-profil, Night Light eller browserextension för dark mode används,
- GPU och om problemet försvinner när hårdvaruacceleration stängs av.

Kontrollera först beräknad CSS `fill` i utvecklarverktygen. Om `fill` är rätt
men skärmpixeln är fel ligger problemet sannolikt i färghantering eller
GPU-komposition. Om `fill` är fel är det en CSS/forced-colors-överskrivning.

## Viktiga filer

- `src/engine.js` — attacker, repliker, förolämpningar, anomalier och combos.
- `src/game.js` — sekvenser, spelstate, effekter och dialogflöde.
- `src/timing.js` — textlängdsstyrd lästid.
- `styles.css` — figurer, animationer, mobil-layout och sRGB-skydd.
- `index.html` — scenen och cache-bustade v0.2.1-assets.
- `scripts/build.mjs` — bygger den externa runtimekatalogen `dist/`.
- `test/engine.test.js` — motor- och timingtester.

EutherOxide-integrationen finns i:

- `/home/nichlas/EutherOxide/src/main.rs`
- `/home/nichlas/EutherOxide/webview/main.ts`
- `/home/nichlas/EutherOxide/webview/styles.css`

## Vanligt arbetsflöde

I EutherShot:

```sh
npm run check
npm run build
```

EutherOxide-servern läser `/home/nichlas/EutherShot/dist` för varje
runtimeförfrågan, så ett nytt EutherShot-bygge kräver normalt ingen Rust-build.
Versionsmärk CSS och `src/game.js` i `index.html` när browsercache behöver
brytas.

Om själva EutherOxide-integrationen ändras:

```sh
cd /home/nichlas/EutherOxide
npx tsc --noEmit
npx vite build
cargo check --bin euther-oxide
sudo systemctl restart eutherhost.service
systemctl is-active eutherhost.service
```

Verifiera alltid den faktiska mobil-/browservägen, inte bara systemd-status.
