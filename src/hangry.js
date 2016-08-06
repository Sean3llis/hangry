import 'pixi'
import 'p2'
import Phaser from 'phaser'

/**
 * STATES:
 */
import Boot from './states/state.boot';

class Hangry extends Phaser.Game {
  constructor() {
    let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;
    super(width, height, Phaser.AUTO, 'mount', null);
    this.state.add('Boot', Boot, false);
    this.state.start('Boot');
  }
}

window.game = new Hangry()
