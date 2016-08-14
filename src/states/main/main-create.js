import { debounce } from 'utils';

export default function create () {
  let game = this.game;
  let Player = this.Player;
  let Hipster = this.Hipster;
  let PlatformGroup = this.PlatformGroup;
  game.stage.backgroundColor = '#4488AA';
  game.physics.startSystem(Phaser.Physics.ARCADE);
  this.player = new Player(game, {
    bounce: 0.3,
    gravity: 800,
    x: 32,
    y: game.world.height - 150,
  });
  this.game.add.existing(this.player);
  this.hipster = new Hipster(game, {
    bounce: 0.4,
    gravity: 800,
    x: game.world.width - 100,
    y: game.world.height - 100,
  });
  this.game.add.existing(this.hipster);
  this.platforms = new PlatformGroup(game, {});
  this.floor = this.platforms.create(0, game.world.height - 20, 'PLATFORM');
  this.floor.body.immovable = true;
  this.floor.scale.setTo(3, 1);
  this.cursors = game.input.keyboard.createCursorKeys();
  this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.aKey = game.input.keyboard.addKey(65);
  this.aKey.onDown.add(this.player.throw, this.player);
  this.handleCycleWeapon = debounce(this.player.cycleWeapon, 50, true);
  var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
  this.weaponLabel = game.add.text(18, 18, 'WEAPON:', style);
  this.weaponSprite = game.add.sprite(200, 18, 'STAR');
}
