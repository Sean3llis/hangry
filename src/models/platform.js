import Phaser from 'phaser';

export default class Platform extends Phaser.Group {
  // (game, parent, name, addToStage, enableBody, physicsBodyType)
  constructor(game, config) {
    config.name = config.name || 'platforms';
    config.addToStage = config.addToStage || true;
    config.enableBody = config.enableBody || true;
    config.physicsBodyType = config.physicsBodyType || Phaser.Physics.ARCADE;

    let platform = super(
      game,
      null,
      config.name,
      config.addToStage,
      config.enableBody,
      config.physicsBodyType
    );
  }
}
