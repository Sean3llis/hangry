import Phaser from 'phaser';

export default class Player extends Phaser.Sprite {
  constructor(game, config) {
    let hipster = super(game, config.x, config.y, 'BADDIE');
    game.physics.arcade.enable(hipster);
    hipster.anchor.setTo(0.5);
    hipster.body.bounce.y = config.bounce;
    hipster.body.gravity.y = config.gravity;
    hipster.animations.add('left', [0, 1], 10, true);
    hipster.animations.add('right', [2,3], 10, true);
    hipster.body.collideWorldBounds = true;
  }
}
