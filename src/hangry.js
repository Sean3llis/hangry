import 'pixi'
import 'p2'
import Phaser from 'phaser'

/**
 * STATES:
 */
import Boot from './states/state.boot';

class Hangry extends Phaser.Game {
  constructor(w, h) {
    super(w, h, Phaser.AUTO, 'mount', null);
    this.state.add('Boot', Boot, false);
    this.state.start('Boot');
  }
}

window.game = new Hangry(800, 400);
