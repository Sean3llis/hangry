import Phaser from 'phaser';

export default class Platform extends Phaser.Group {
  // (game, parent, name, addToStage, enableBody, physicsBodyType)
  constructor(game, config) {
    config.name = config.name || 'platform';
    config.addToStage = config.addToStage || true;
    config.enableBody = config.enableBody || true;
    config.physicsBodyType = config.physicsBodyType || Phaser.Physics.ARCADE;
    let platform = super(game, config.x, config.y, 'platform');
    platform.enableBody = true;
  }
}

// makePlatform(x, y, asset) {
//   let platform = this.platforms.create(x,y,asset);
//   platform.body.immovable = true;
//   return platform;
// }
