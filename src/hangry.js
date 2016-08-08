import 'pixi'
import 'p2'
import Phaser from 'phaser'

/**
 * STATES:
 */
import Boot from './states/state.boot';

class Hangry extends Phaser.Game {
  constructor(w, h) {
    let game = super(w, h, Phaser.AUTO, 'mount', null);
    console.log('game ~~>', game);
    game.state.add('Boot', Boot, false);
    game.state.start('Boot');
    // game.stage.backgroundColor = "#4488AA";
  }
}

window.game = new Hangry(800, 400);

console.log('window.game ~~>', window.game);
