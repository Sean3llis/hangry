import { debounce } from 'utils';

import Player from 'models/player';
import Hipster from 'models/hipster';
// import PlatformGroup from 'models/platform-group';


export default function create () {
  let game = this.game;
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#4488AA';

  this.player = new Player(game, {
    bounce: 0.3,
    gravity: 800,
    x: 32,
    y: game.world.height - 150,
  });
  game.add.existing(this.player);
  game.physics.enable(this.player);

  for (var i = 0; i < 5; i++) {
    this.hipster = new Hipster(game, {
      bounce: 0.4,
      gravity: 800,
      x:  game.rnd.integerInRange(10, game.world.width - 10),
      y:  game.rnd.integerInRange(10, game.world.height - 10),
    });
  }
  game.add.existing(this.hipster);
  game.physics.enable(this.hipster);

  this.platforms = game.add.physicsGroup();
  this.floor = game.add.sprite(0, game.world.height - 20, 'PLATFORM');
  game.physics.enable(this.floor);
  this.floor.body.immovable = true;
  this.floor.body.bounce = 1;
  this.floor.scale.setTo(3, 1);
  this.cursors = game.input.keyboard.createCursorKeys();
  this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.aKey = game.input.keyboard.addKey(65);
  this.aKey.onDown.add(this.player.throw, this.player);
  this.handleCycleWeapon = debounce(this.player.cycleWeapon, 50, true);
  this.weaponSprite = game.add.sprite(200, 18, 'STAR');
  this.setLabels();
  game.physics.arcade.enable([this.player, this.player.weapons, this.floor]);
}
