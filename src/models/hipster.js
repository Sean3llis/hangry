import Phaser from 'phaser';

export default class Hipster extends Phaser.Sprite {
  constructor(game, group, config) {
    let hipster = super(game, config.x, config.y, 'BADDIE');
    game.physics.arcade.enable(hipster);
    hipster.anchor.setTo(0.5);
    hipster.body.bounce.set(1);
    hipster.body.gravity.y = config.gravity;
    hipster.body.velocity.x = 200;
    hipster.animations.add('left', [0, 1], 10, true);
    hipster.animations.add('right', [2,3], 10, true);
    hipster.body.collideWorldBounds = true;
    group.add(hipster);
  }
}
