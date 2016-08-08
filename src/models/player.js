import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor (game, config) {
    let player = super(game, config.x, config.y, 'dude');
    game.physics.arcade.enable(player);
    player.body.collidWorldBounds = true;
    player.anchor.setTo(0.5);
    player.body.bounce.y = config.bounce;
    player.body.gravity.y = config.gravity;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.body.collideWorldBounds = true;
    /**
     * Player Settings:
     */
    this.maxVelocity = 250;
    this.acceleration = 15;
    this.madUps = 300;
    return player;
  }

  runLeft() {
    this.animations.play('left');
    if (this.body.velocity.x >= this.maxVelocity * -1) {
      this.body.velocity.x -= this.acceleration;
    }
  }

  runRight() {
    this.animations.play('right');
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
}
