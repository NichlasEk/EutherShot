import test from "node:test";
import assert from "node:assert/strict";
import {
  ATTACKS,
  applyAttack,
  mulberry32,
  resolveCombo,
  resolveAttack,
  winnerFor,
} from "../src/engine.js";

test("the radial menu exposes twelve office attacks", () => {
  assert.deepEqual(
    ATTACKS.map((attack) => attack.id),
    [
      "passive",
      "meeting",
      "reply",
      "synergy",
      "management",
      "ai",
      "jira",
      "powerpoint",
      "printer",
      "review",
      "offsite",
      "policy",
    ],
  );
});

test("attack resolution is deterministic with a seeded random source", () => {
  const first = resolveAttack(ATTACKS[2], mulberry32(2026));
  const second = resolveAttack(ATTACKS[2], mulberry32(2026));
  assert.deepEqual(first, second);
  assert.ok(first.targetDamage >= 17 && first.targetDamage <= 30);
  assert.ok(first.selfDamage >= 5 && first.selfDamage <= 11);
  assert.equal(typeof first.insult, "string");
  assert.ok(first.variant >= 0 && first.variant <= 2);
});

test("synergy damages both office workers", () => {
  const outcome = resolveAttack(ATTACKS[3], mulberry32(4));
  const players = applyAttack(
    [
      { composure: 100 },
      { composure: 100 },
    ],
    0,
    outcome,
  );
  assert.ok(players[0].composure < 100);
  assert.ok(players[1].composure < 100);
});

test("composure never becomes negative and winner is detected", () => {
  const players = applyAttack(
    [
      { composure: 5 },
      { composure: 4 },
    ],
    0,
    { targetDamage: 20, selfDamage: 0 },
  );
  assert.equal(players[1].composure, 0);
  assert.equal(winnerFor(players), 0);
});

test("mutual collapse is a draw", () => {
  assert.equal(winnerFor([{ composure: 0 }, { composure: 0 }]), "draw");
});

test("specific consecutive attacks trigger combo bonuses", () => {
  assert.deepEqual(resolveCombo("meeting", "reply"), {
    label: "KALENDERSTORM",
    bonusDamage: 6,
    bonusRecoil: 2,
  });
  assert.equal(resolveCombo("reply", "meeting"), null);
});

test("combo damage is included in the resolved outcome", () => {
  const withoutCombo = resolveAttack(ATTACKS[2], mulberry32(99));
  const withCombo = resolveAttack(ATTACKS[2], mulberry32(99), "meeting");
  assert.equal(withCombo.targetDamage, withoutCombo.targetDamage + 6);
  assert.equal(withCombo.selfDamage, withoutCombo.selfDamage + 2);
  assert.equal(withCombo.combo.label, "KALENDERSTORM");
});
