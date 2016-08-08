import Phaser from 'phaser';
/**
 * Models:
 */
import Player from '../models/player';
import PlatformGroup from '../models/platform';

export default class Boot extends Phaser.State {
  preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('platform', 'assets/platform.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('pbr', 'assets/pbr.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  }

  create() {
    let game = this.game;
    game.stage.backgroundColor = '#4488AA';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.player = new Player(game, {
      bounce: 0.2,
      gravity: 800,
      x: 32,
      y: game.world.height - 150,
    });
    this.platforms = new PlatformGroup(game, {});
    this.beers = game.add.group();
    for (var i = 0; i < 16; i++) {
       let beer = this.beers.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'pbr');
       beer.angle = 90;
       beer.scale.setTo(0.1);
    }
    this.floor = this.platforms.create(0, game.world.height - 20, 'platform');
    this.floor.body.immovable = true;
    this.floor.scale.setTo(3, 1);
    this.game.add.existing(this.player);
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    let game = this.game;
    let player = this.player;
    game.physics.arcade.collide(player, this.platforms);
    this.handlePlayerMovement(player);
  }

  handlePlayerMovement(player) {
    let cursors = this.cursors;
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
