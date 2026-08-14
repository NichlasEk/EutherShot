# Physical animation plan

## Goal

Give EutherShot attacks the physical, pose-driven comedy of a staged office
fight while keeping the game's own modern vector style, characters, props and
workplace jokes.

The important reference principle is not a particular weapon or pose. It is
the readable chain of **contact -> deformation -> consequence**. Particles,
blood and screen shake should support that chain instead of replacing it.

## Vertical slice: Performance Review

The first prototype upgrades `PERFORMANCE REVIEW`:

1. The attacker braces, crosses the desk and reaches for the target.
2. Both workers jump onto the desk and close the distance before contact.
3. The inward arm bends at its defined elbow into a calibration grip.
4. The target's head is pulled toward the attacker, rebounds and squashes.
5. The People & Culture stamp lands after the body contact and compresses the
   target into a low-rated silhouette.
6. Recovery returns both characters from the desk to their original positions.

This attack is a good test because it exercises two-character interaction,
directionality, elastic SVG deformation, prop timing and mobile scaling without
requiring new raster artwork.

The first overlay-arm experiment proved that endpoint geometry alone is not
enough: a correctly placed extra limb still reads as an extra limb. The current
vertical slice therefore introduces a small rig-v2 contract. Each arm owns an
explicit shoulder anchor, base sleeve, extendable sleeve path and persistent
hand node. Attack code converts the target head from screen space into the
attacker SVG's local coordinates; the real hand and sleeve travel to that point
and are restored when recovery starts.

## Animation grammar

Every upgraded physical attack should have five authored beats:

- **Anticipation:** show where the force will come from.
- **Contact:** hands, prop or body visibly reaches the target.
- **Deformation:** squash, stretch, bend or separation sells the force.
- **Hold:** keep the funniest pose readable for a short moment.
- **Recovery:** restore the reusable base rig cleanly.

Left-to-right and right-to-left attacks must be tested independently. Reduced
motion keeps the outcome readable but shortens the travel and repeated motion.

## Vertical slice: Printer Exorcism

The second slice applies the reference principle of a prop entering the body
and leaving a readable altered silhouette, without reusing the reference gag:

1. The existing desk printer opens like a mechanical jaw and travels to the
   target's actual head position.
2. The head resists, compresses and is pulled through a toner-width profile.
3. Impact debris starts only after contact so it does not hide the action.
4. The printer retreats and ejects the target's face as an incident printout
   toward the center of the scene.
5. A torn dark void remains in the SVG head until recovery.

The printer is the real desk prop and the void is part of each worker's head
rig. No substitute character or duplicate prop is placed over the scene.

## Vertical slice: Synergy

The third slice turns the old mirrored body bump into a two-character contact
rig:

1. Both workers jump onto the desk and land close enough to share the frame.
2. Their inward arms extend from their defined shoulder and elbow anchors.
3. The two persistent hand nodes meet at one screen-space contact point and
   lock into an impossible forced handshake.
4. Both bodies pull against the shared knot in opposite directions before
   springing apart.
5. The knot briefly retains the label `GEMENSAM LEVERANS` while both original
   arms disappear back into their base sleeves for recovery.

The decorative knot is drawn behind the workers. It reinforces the contact but
does not supply any extra limbs; the visible hands and sleeves remain the two
characters' real SVG parts. `?preview=synergy&pose=contact` freezes the clean
contact pose for future desktop and mobile regression screenshots.

## Next candidates

1. `HR POLICY CANNON`: handbook opens physically, pages wrap around the target
   as restraints, then paragraph 47 launches them sideways.
2. `POWERPOINT TRANSCENDENCE`: attacker folds the target limb by limb into a
   living pie chart before the slide frame snaps shut.
3. `REPLY ALL`: the actual laptop lids clap shut on both workers' ties and drag
   them through an expanding chain of mail windows.

## Acceptance checks

- The contact point is obvious in a paused screenshot.
- The attack reads without sound, particles or text.
- Both player directions work at desktop and 390 x 844.
- The base SVG returns to its idle pose after recovery.
- `prefers-reduced-motion` does not leave stretched limbs or displaced heads.
- Existing engine/timing tests and the production build remain green.
