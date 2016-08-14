import Phaser from 'phaser';
/**
 * Import lifecycle functions:
 */
import preload from './main-preload';
import create from './main-create';
import update from './main-update';
import render from './main-render';

class Main extends Phaser.State {
  constructor() {
    super();
    console.log('main state this ~~>', this);
    /**
     * lifecycle functions:
     */
    this.preload = preload
    this.create = create
    this.update = update;
    this.render = render;
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

  updateWeaponLabel(label) {
    this.weaponLabel.text = `Weapon: ${label}`;
    this.weaponSprite.kill();
    this.weaponSprite = this.game.add.sprite(100, 100, label);
    this.weaponSprite.scale.setTo(0.1);
  }


}

Main.prototype.tester = function() {
  console.log('test');
}



export default Main;
