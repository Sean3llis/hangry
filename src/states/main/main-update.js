export default function update() {
  let game = this.game;
  let player = this.player;
  game.physics.arcade.collide(player, this.floor);
  game.physics.arcade.collide(this.hipster, this.floor);
  game.physics.arcade.collide(player.weapons, this.floor);
  game.physics.arcade.collide(player.weapons);
  game.physics.arcade.overlap(player.weapons, this.hipster, this.hipsterHit, null, game);
  this.handlePlayerMovement(player);
}
