"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGame = exports.Game = void 0;
const CivilizationStartTileRegistry_1 = require("@civ-clone/civ1-earth-generator/CivilizationStartTileRegistry");
const EarthStartTileRegistry_1 = require("@civ-clone/civ1-earth-generator/EarthStartTileRegistry");
const core_game_1 = require("@civ-clone/core-game");
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
class Game extends core_game_1.Game {
    constructor(adopted = {}) {
        var _a, _b;
        super(adopted);
        this.civilizationStartTiles =
            (_a = adopted.civilizationStartTiles) !== null && _a !== void 0 ? _a : new CivilizationStartTileRegistry_1.CivilizationStartTileRegistry();
        this.earthStartTiles =
            (_b = adopted.earthStartTiles) !== null && _b !== void 0 ? _b : new EarthStartTileRegistry_1.EarthStartTileRegistry();
    }
}
exports.Game = Game;
/**
 * The civ1 registries' module-level singletons, adopted — the same bargain
 * `core-game`'s `defaultGame` makes, and for the same reason: while some
 * packages still import `instance` and others take a `Game`, both must see the
 * same registry.
 *
 * `defaultCiv1Game` is a distinct object from `core-game`'s `defaultGame`, but
 * adopts the same core singletons, so the two agree about everything core.
 */
exports.defaultGame = new Game({
    // Spreading `defaultSlots` is what keeps the core registries pointing at the
    // singletons. Without it this game would quietly build its own, and disagree
    // with every package that has not migrated yet.
    ...core_game_1.defaultSlots,
    civilizationStartTiles: CivilizationStartTileRegistry_1.instance,
    earthStartTiles: EarthStartTileRegistry_1.instance,
});
exports.default = Game;
//# sourceMappingURL=Game.js.map