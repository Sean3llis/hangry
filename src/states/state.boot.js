import Phaser from 'phaser';

export default class Boot extends Phaser.State {
  preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create() {
    let game = this.game;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'star');
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    this.ground = this.makePlatform(0, game.world.height - 64, 'ground');
    this.ground.scale.setTo(2, 2);
    this.makePlatform(400,400,'ground');
    this.makePlatform(-150,250,'ground');
    this.makePlayer(0.2, 300);
  }

  makePlatform(x, y, asset) {
    let platform = this.platforms.create(x,y,asset);
    platform.body.immovable = true;
    return platform;
  }

  makePlayer(bounce, gravity) {
    let game = this.game;
    let player = this.player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = bounce;
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  update() {
    let game = this.game;
    game.physics.arcade.collide(this.player, this.platforms);
  }

  render() {
  }
}
