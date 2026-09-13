import { Game, defaultGame } from '../Game';
import { expect } from 'chai';
import { instance as cityRegistryInstance } from '@civ-clone/core-city/CityRegistry';
import { instance as civilizationStartTileRegistryInstance } from '@civ-clone/civ1-earth-generator/CivilizationStartTileRegistry';
import { defaultGame as coreDefaultGame } from '@civ-clone/core-game';

describe('civ1 Game', (): void => {
  it('should add the civ1 registries', (): void => {
    const game = new Game();

    expect(game.civilizationStartTiles).to.not.be.undefined;
    expect(game.earthStartTiles).to.not.be.undefined;
  });

  it('should still give each game its own of everything', (): void => {
    const a = new Game();
    const b = new Game();

    expect(a.civilizationStartTiles).to.not.equal(b.civilizationStartTiles);
    expect(a.cities).to.not.equal(b.cities);
  });

  it('should adopt the core singletons, not build its own', (): void => {
    // The bug this exists to catch: constructing the subclass with only its own
    // slots leaves the core ones fresh, so this game and every unmigrated
    // package disagree about which registry is the city registry.
    expect(defaultGame.cities).to.equal(cityRegistryInstance);
    expect(defaultGame.cities).to.equal(coreDefaultGame.cities);
  });

  it('should adopt the civ1 singletons too', (): void => {
    expect(defaultGame.civilizationStartTiles).to.equal(
      civilizationStartTileRegistryInstance
    );
  });
});
