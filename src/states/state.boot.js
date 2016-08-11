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
      bounce: 0.3,
      gravity: 800,
      x: 32,
      y: game.world.height - 150,
    });
    this.platforms = new PlatformGroup(game, {});
    this.beers = game.add.group();
    for (var i = 0; i < 16; i++) {
       let beer = this.beers.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'pbr');
       beer.scale.setTo(0.08);
       beer.anchor.setTo(0.5, 0.5);
    }
    this.floor = this.platforms.create(0, game.world.height - 20, 'platform');
    this.floor.body.immovable = true;
    this.floor.scale.setTo(3, 1);
    this.game.add.existing(this.player);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.aKey = game.input.keyboard.addKey(65);
    this.aKey.onDown.add(this.player.throwPbr, this);
    this.handleCycleWeapon = debounce(this.cycleWeapon, 50, true);
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    game.add.text(100, 100, 'WEAPON:', style);
  }

  update() {
    let game = this.game;
    let player = this.player;
    for (var i = 0; i < this.beers.children.length; i++) {
      let beer = this.beers.children[i];
      beer.rotation += 0.1;
    }
    game.physics.arcade.collide(player, this.platforms);
    game.physics.arcade.collide(this.beers, this.platforms);
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

    if (this.spaceKey.isDown && player.body.touching.down) player.jump();
    if (cursors.up.isDown) {
      this.handleCycleWeapon('UP');
    } else if (cursors.down.isDown) {
      this.handleCycleWeapon('DOWN');
    }
  }

  cycleWeapon(direction) {
    console.log(`cycle weapon ~~> ${direction}`);
  }


  render() {
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
