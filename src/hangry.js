import 'pixi'
import 'p2'
import Phaser from 'phaser'

/**
 * STATES:
 */
import Boot from './states/state.boot';
import Main from './states/main';

class Hangry extends Phaser.Game {
  constructor(w, h) {
    let game = super(w, h, Phaser.AUTO, 'mount', null);
    console.log('game.physics ~~>', game);
    // game.state.add('Boot', Boot, false);
    game.state.add('Main', Main, true);
    game.state.start('Main');
  }
}

window.game = new Hangry(800, 400);
