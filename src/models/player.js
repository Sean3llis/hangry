import Phaser from 'phaser';
export default class Player extends Phaser.Sprite {
  constructor (game, config) {
    let player = super(game, config.x, config.y, config.asset);
    player.game.physics.arcade.enable(player);
    player.anchor.setTo(0.5);
    player.body.bounce.y = config.bounce;
    player.body.gravity.y = config.gravity;
    player.collidWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    return player;
  }

  runLeft() {
    console.log('run left');
    this.animations.play('left');
    if (this.body.velocity.x >= -200) {
      this.body.velocity.x -= 10;
    }
  }

  runRight() {
    console.log('run right');
    this.animations.play('right');
    if (this.body.velocity.x <= 200) {
      this.body.velocity.x += 10;
    }
  }

  stop() {
    this.animations.stop();
    this.frame = 4;
    this.body.velocity.x = 0;
  }
}
