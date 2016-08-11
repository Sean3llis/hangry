import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor (game, config) {
    let player = super(game, config.x, config.y, 'DUDE');
    game.physics.arcade.enable(player);
    /**
     * Phaser Config:
     */
    player.body.collidWorldBounds = true;
    player.anchor.setTo(0.5);
    player.body.bounce.y = config.bounce;
    player.body.gravity.y = config.gravity;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.body.collideWorldBounds = true;
    player.weapons = game.add.group();
    /**
     * Player Settings:
     */
    this.currentWeapon = 'PBR';
    this.facing = 'STRAIGHT';
    this.maxVelocity = 250;
    this.acceleration = 15;
    this.madUps = 300;
    this.weapons = game.add.group();
    return player;
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
    let weaponType = player.currentWeapon;
    let beer = player.weapons.create(player.x + 10, player.y - 10, weaponType);
    if (beer) {
      this.game.physics.arcade.enable(beer);
      beer.body.gravity.y = 800;
      beer.body.velocity.x = (player.facing === 'LEFT')
        ? -400
        : 400;
      beer.body.velocity.y = -400;
      beer.body.bounce = 0.2;
      beer.scale.setTo(0.08);
      beer.anchor.setTo(0.5, 0.5);
      beer.checkWorldBounds = true;
      beer.events.onOutOfBounds.add(function(beer) {
        console.log('destroy beer', beer);
        beer.destroy();
      }, this);
    }
    console.log('beer ~~>', beer);
  }
}
