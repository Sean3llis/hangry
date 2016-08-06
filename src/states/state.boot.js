import Phaser from 'phaser';
import Player from '../models/player';

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
    this.player = new Player(game, {
      bounce: 0.2,
      gravity: 800,
      x: 32,
      y: game.world.height - 150,
      asset: 'dude'
    });
    this.game.add.existing(this.player);
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  makePlatform(x, y, asset) {
    let platform = this.platforms.create(x,y,asset);
    platform.body.immovable = true;
    return platform;
  }

  makePlayer(bounce, gravity) {
    let game = this.game;
    let player = this.player = game.add.sprite(32, game.world.height - 150, 'dude');
    player.body.bounce.y = bounce;
    player.body.gravity.y = gravity;
    player.body.collideWorldBounds = true;

  }

  update() {
    let game = this.game;
    let player = this.player;
    game.physics.arcade.collide(player, this.platforms);
    this.handlePlayerMovement(player);
  }

  handlePlayerMovement() {
    let cursors = this.cursors;
    let player = this.player;
    if (cursors.left.isDown) {
      player.runLeft();
    } else if (cursors.right.isDown) {
      player.runRight();
    } else {
      player.stop();
    }
    if (cursors.up.isDown) player.body.velocity.y = -350;
  }


  render() {
  }
}
