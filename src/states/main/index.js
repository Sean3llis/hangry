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
    /**
     * lifecycle functions:
     */
    this.preload = preload
    this.create = create
    this.update = update;
    this.render = render;
    console.log('main state ~~>', this);
  }

  setLabels() {
    if (this.weaponLabel) return;
    this.weaponLabel = this.game.add.text(10, 10, '', {
      font: "bold 12px Arial",
      fill: "#282828",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    });
    this.updateWeaponLabel(this.player.currentWeapon);
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
  }

  updateWeaponLabel(label) {
    this.weaponLabel.text = `WEAPON: ${label}`;
    this.weaponSprite.kill();
    this.weaponSprite = this.game.add.sprite(30, 30, label);
    this.weaponSprite.scale.setTo(0.2);
  }


}

Main.prototype.tester = function() {
  console.log('test');
}



export default Main;
