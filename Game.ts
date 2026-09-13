import {
  CivilizationStartTileRegistry,
  instance as civilizationStartTileRegistryInstance,
} from '@civ-clone/civ1-earth-generator/CivilizationStartTileRegistry';
import {
  EarthStartTileRegistry,
  instance as earthStartTileRegistryInstance,
} from '@civ-clone/civ1-earth-generator/EarthStartTileRegistry';
import {
  Game as CoreGame,
  GameSlots,
  defaultSlots,
} from '@civ-clone/core-game';

export type Civ1GameSlots = GameSlots & {
  civilizationStartTiles: CivilizationStartTileRegistry;
  earthStartTiles: EarthStartTileRegistry;
};

/**
 * A `Game` with the registries the civ1 ruleset adds.
 *
 * These live here rather than in `core-game` because `core-` packages depend
 * only on other `core-` packages. Baking a specific ruleset's registries into
 * the shared context would break that, and would drag `civ1-earth-generator`'s
 * native `canvas` dependency in with it.
 *
 * A second ruleset would add its own package the same way.
 */
export class Game extends CoreGame {
  readonly civilizationStartTiles: CivilizationStartTileRegistry;
  readonly earthStartTiles: EarthStartTileRegistry;

  constructor(adopted: Partial<Civ1GameSlots> = {}) {
    super(adopted);

    this.civilizationStartTiles =
      adopted.civilizationStartTiles ?? new CivilizationStartTileRegistry();
    this.earthStartTiles =
      adopted.earthStartTiles ?? new EarthStartTileRegistry();
  }
}

/**
 * The civ1 registries' module-level singletons, adopted — the same bargain
 * `core-game`'s `defaultGame` makes, and for the same reason: while some
 * packages still import `instance` and others take a `Game`, both must see the
 * same registry.
 *
 * `defaultCiv1Game` is a distinct object from `core-game`'s `defaultGame`, but
 * adopts the same core singletons, so the two agree about everything core.
 */
export const defaultGame: Game = new Game({
  // Spreading `defaultSlots` is what keeps the core registries pointing at the
  // singletons. Without it this game would quietly build its own, and disagree
  // with every package that has not migrated yet.
  ...defaultSlots,
  civilizationStartTiles: civilizationStartTileRegistryInstance,
  earthStartTiles: earthStartTileRegistryInstance,
});

export default Game;
