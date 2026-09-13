# `@civ-clone/civ1-game`

The civ1 ruleset's game context: [`@civ-clone/core-game`](https://github.com/civ-clone/core-game)'s
`Game` plus the registries civ1 adds.

```ts
import { Game } from '@civ-clone/civ1-game';

const game = new Game();

game.civilizationStartTiles; // civ1's
game.cities; // core's
```

## Why it is a separate package

`core-` packages depend only on other `core-` packages. Putting
`civ1-earth-generator`'s registries into `core-game` would break that, and
would drag its native `canvas` dependency into the shared context along with
them. A second ruleset adds its own package the same way.

## `defaultGame`

As in `core-game`, `defaultGame` adopts the module-level singletons rather than
constructing its own, so that a package still importing `instance` and one
taking a `Game` see the same registry while the migration is in progress.

It spreads `core-game`'s `defaultSlots` to do it. Leaving that out is a quiet
and nasty bug — the subclass would get *fresh* core registries and disagree
with every unmigrated package about what the city registry is — so there is a
test for exactly that.
