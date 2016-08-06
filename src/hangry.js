import 'pixi'
import 'p2'
import Phaser from 'phaser'

class Hangry extends Phaser.Game {
  constructor() {
    let width = document.documentElement.clientWidth > 768 ? 768 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight;
    super(width, height, Phaser.AUTO, 'content', null);
  }
}
