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
    return player;
  }

  runLeft() {
    this.animations.play('left');
    if (this.body.velocity.x >= -200) {
      this.body.velocity.x -= 10;
    }
  }

  runRight() {
    this.animations.play('right');
    if (this.body.velocity.x <= 200) {
      this.body.velocity.x += 10;
    }
  }

  jump() {
    this.body.velocity.y = -400;
  }

  stop() {
    var vx = this.body.velocity.x;
    console.log(this.body.velocity.x);
    this.animations.stop();
    this.frame = 4;
    // this.body.velocity.x = 0;
    // if (Math.abs(this.body.velocity.x) > 0) {
    //   this.body.velocity.x = this.body.velocity.x / 2;
    // }
    if (this.body.velocity.x > 0) {
      this.body.velocity.x -= 10;
      if (this.body.velocity.x <= 10) this.body.velocity.x = 0;
    } else {
      this.body.velocity.x += 10;
      if (this.body.velocity.x >= -10) this.body.velocity.x = 0;
    }
  }
}
