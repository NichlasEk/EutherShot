# EutherShot — Take Your Best Shot: 2026

En modern, fristående webbtolkning av idén bakom *Take Your Best Shot* (1995): två
kontorsmänniskor, ett bord fullt av dåliga beslut och korta överproducerade
attacksekvenser. All grafik, kod och dialog i den här prototypen är nyskapad.

## Kör lokalt

```sh
npm run dev
```

Öppna sedan `http://127.0.0.1:4177`. Inga paket behöver installeras.

```sh
npm test
npm run check
npm run build
```

## Vertikal slice

- Lokal turordning för två spelare på samma skärm.
- Sex attacker i radialmeny, inklusive Reply All, Synergi och AI-delegering.
- Kombinatoriska repliker och skadeutfall, så samma val varierar.
- Egna responsiva SVG/CSS-figurer, kontorsrekvisita, partiklar och Web Audio-ljud.
- Tangentbord: `1`–`6` väljer attack, `M` växlar ljud, `R` startar om.
- Stöd för pekskärm, smal viewport och `prefers-reduced-motion`.

## Nästa produktionssteg

Prototypen är avsiktligt statisk och beroendefri. `npm run build` skapar en ren
`dist/` utan Git-metadata eller arbetsfiler. För EutherOxide kan den katalogen
serveras under `/euthershot-runtime/`
med samma säkra statiska mönster som övriga externa spel. Se
[`docs/ARCHAEOLOGY.md`](docs/ARCHAEOLOGY.md) och
[`docs/GAME-DESIGN.md`](docs/GAME-DESIGN.md).
