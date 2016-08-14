import Phaser from 'phaser';

import { spriteKiller } from 'utils';

export default class Player extends Phaser.Sprite {
  constructor (game, config) {
    let player = super(game, config.x, config.y, 'DUDE');
    game.physics.arcade.enable(player);
    /**
     * Physics:
     */
    player.body.collideWorldBounds = true;
    player.anchor.setTo(0.5);
    player.body.bounce.y = config.bounce;
    player.body.gravity.y = config.gravity;
    player.body.collideWorldBounds = true;
    /**
     * Animations
     */
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    /**
     * Player Settings:
     */
    player.weapons = game.add.physicsGroup();
    player.weapons.setAll('body.collideWorldBounds', true);
    player.weapons.setAll('body.bounce.x', 1);
    player.weapons.setAll('body.bounce.y', 1);
    this.weaponTypes = ['PBR', 'COLD_BREW', 'MIMOSA'];
    this.currentWeapon = 'PBR';
    this.weaponIndex = 0;
    this.facing = 'STRAIGHT';
    this.maxVelocity = 250;
    this.acceleration = 15;
    this.madUps = 300;
    this.weapons = game.add.group();
  }

  cycleWeapon(direction) {
    let player = this.player;
    let weaponTypes = player.weaponTypes;
    switch (direction) {
      case 'UP':
        player.weaponIndex++;
        if (player.weaponIndex > player.weaponTypes.length - 1) player.weaponIndex = 0;
        player.currentWeapon = weaponTypes[player.weaponIndex];
        break;
      case 'DOWN':
        player.weaponIndex--;
        if (player.weaponIndex < 0) player.weaponIndex = player.weaponTypes.length - 1;
        player.currentWeapon = weaponTypes[player.weaponIndex];
        break;
    }
    this.updateWeaponLabel(player.currentWeapon);
  }

  runLeft() {
    this.animations.play('left');
    this.facing = 'LEFT';
    if (this.body.velocity.x >= this.maxVelocity * -1) {
      this.body.velocity.x -= this.acceleration;
    }
  }

  runRight() {
    this.animations.play('right');
    this.facing = 'RIGHT';
    if (this.body.velocity.x <= this.maxVelocity) {
      this.body.velocity.x += this.acceleration;
    }
  }

  jump() {
    this.body.velocity.y = this.madUps * -1;
  }

  stop() {
    var vx = this.body.velocity.x;
    if (this.body.velocity.x > 0) {
      this.animations.play('right');
      this.body.velocity.x -= 10;
      if (this.body.velocity.x <= 10) {
        this.body.velocity.x = 0;
        this.animations.stop();
      }
    } else {
      this.body.velocity.x += 10;
      this.animations.play('left');
      if (this.body.velocity.x >= -10) {
        this.body.velocity.x = 0;
        this.frame = 4;
        this.animations.stop();
      }
    }
  }

  throw() {
    let player = this;
    let game = player.game;
    let weaponType = player.currentWeapon;
    let weapon = player.weapons.create(player.x + 10, player.y - 10, weaponType);
    if (weapon) {
      game.physics.enable(weapon);
      weapon.body.gravity.y = 800;
      weapon.body.velocity.x = (player.facing === 'LEFT') ? -400 : 400;
      weapon.body.velocity.y = -400;
      weapon.body.bounce.set(0.6);
      weapon.scale.setTo(0.08);
      weapon.anchor.setTo(0.5, 0.5);
      weapon.checkWorldBounds = true;
      weapon.events.onOutOfBounds.add(spriteKiller, this);
    }
  }
}
