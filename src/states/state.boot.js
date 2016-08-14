// import Phaser from 'phaser';
// /**
//  * Models:
//  */
// import Player from '../models/player';
// import Hipster from '../models/hipster';
// import PlatformGroup from '../models/platform';
//
// console.log('PHASER.State ~~>', Phaser.State);
//
// export default class Boot extends Phaser.State {
//   preload() {
//     game.load.image('SKY', 'assets/sky.png');
//     game.load.image('PLATFORM', 'assets/platform.png');
//     game.load.image('DIAMOND', 'assets/diamond.png');
//     game.load.image('STAR', 'assets/star.png');
//     game.load.image('PBR', 'assets/pbr.png');
//     game.load.image('COLD_BREW', 'assets/coffee.png');
//     game.load.image('MIMOSA', 'assets/mimosa.png');
//     game.load.spritesheet('DUDE', 'assets/dude.png', 32, 48);
//     game.load.spritesheet('BADDIE', 'assets/baddie.png', 32, 32);
//   }
//
//   create() {
//     let game = this.game;
//     game.stage.backgroundColor = '#4488AA';
//     game.physics.startSystem(Phaser.Physics.ARCADE);
//     this.player = new Player(game, {
//       bounce: 0.3,
//       gravity: 800,
//       x: 32,
//       y: game.world.height - 150,
//     });
//     this.game.add.existing(this.player);
//     this.hipster = new Hipster(game, {
//       bounce: 0.4,
//       gravity: 800,
//       x: game.world.width - 100,
//       y: game.world.height - 100,
//     });
//     this.game.add.existing(this.hipster);
//     this.platforms = new PlatformGroup(game, {});
//     this.floor = this.platforms.create(0, game.world.height - 20, 'PLATFORM');
//     this.floor.body.immovable = true;
//     this.floor.scale.setTo(3, 1);
//     this.cursors = game.input.keyboard.createCursorKeys();
//     this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//     this.aKey = game.input.keyboard.addKey(65);
//     this.aKey.onDown.add(this.player.throw, this.player);
//     this.handleCycleWeapon = debounce(this.player.cycleWeapon, 50, true);
//     var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
//     this.weaponLabel = game.add.text(18, 18, 'WEAPON:', style);
//     this.weaponSprite = game.add.sprite(200, 18, 'STAR');
//   }
//
//   update() {
//     let game = this.game;
//     let player = this.player;
//     game.physics.arcade.collide(player, this.platforms);
//     game.physics.arcade.collide(this.beers, this.platforms);
//     game.physics.arcade.collide(this.hipster, this.platforms);
//     game.physics.arcade.overlap(player.weapons, this.hipster, this.hipsterHit, null, this);
//     this.handlePlayerMovement(player);
//   }
//
//   render() {
//   }
//
//   handlePlayerMovement(player) {
//     let cursors = this.cursors;
//     if (cursors.left.isDown) {
//       player.runLeft();
//     } else if (cursors.right.isDown) {
//       player.runRight();
//     } else {
//       player.stop();
//     }
//
//     if (this.spaceKey.isDown && player.body.touching.down) player.jump();
//     if (cursors.up.isDown) {
//       this.handleCycleWeapon('UP');
//     } else if (cursors.down.isDown) {
//       this.handleCycleWeapon('DOWN');
//     }
//   }
// }
//
// function debounce(func, wait, immediate) {
//   var timeout;
//   return function () {
//     var context = this;
//     var args = arguments;
//     var later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) func.apply(context, args);
//   };
// }
