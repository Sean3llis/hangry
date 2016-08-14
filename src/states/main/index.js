import Phaser from 'phaser';
/**
 * Import lifecycle functions:
 */
import preload from './main-preload';
import create from './main-create';
import update from './main-update';
import render from './main-render';

/**
 * Models:
 */
import Player from 'model/player';
import Hipster from 'model/hipster';
import PlatformGroup from 'model/platform';

class Main extends Phaser.State {
  constructor() {
    super();
    this.Player = Player;
    this.Hipster = Hipster;
    this.PlatformGroup = PlatformGroup;
  }
  handlePlayerMovement(player) {
    let cursors = this.cursors;
    if (cursors.left.isDown) {
      player.runLeft();
    } else if (cursors.right.isDown) {
      player.runRight();
    } else {
      player.stop();
    }

    if (this.spaceKey.isDown && player.body.touching.down) player.jump();
    if (cursors.up.isDown) {
      this.handleCycleWeapon('UP');
    } else if (cursors.down.isDown) {
      this.handleCycleWeapon('DOWN');
    }
  }
  hipsterHit(hipster, weapon) {
    hipster.kill();
    weapon.kill();
    console.log('WOOOP');
  }
}

Main.prototype.preload = preload
Main.prototype.create = create
Main.prototype.update = update;
Main.prototype.render = render;

export default Main;
