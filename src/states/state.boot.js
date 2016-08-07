import Phaser from 'phaser';
/**
 * Models:
 */
import Player from '../models/player';
import Platform from '../models/platform';

export default class Boot extends Phaser.State {
  preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create() {
    let game = this.game;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.player = new Player(game, {
      bounce: 0.2,
      gravity: 800,
      x: 32,
      y: game.world.height - 150,
    });
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    this.floor = new Platform(game, {x: game.world.height - 120, y: 0});
    this.game.add.existing(this.player);
    this.game.camera.follow(this.player);
    this.cursors = game.input.keyboard.createCursorKeys();
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
    if (cursors.up.isDown && player.body.touching.down) player.jump();
  }


  render() {
  }
}
