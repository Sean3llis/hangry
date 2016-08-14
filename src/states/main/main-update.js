export default function update() {
  let game = this.game;
  let player = this.player;
  game.physics.arcade.collide(player, this.platforms);
  game.physics.arcade.collide(this.beers, this.platforms);
  game.physics.arcade.collide(this.hipster, this.platforms);
  game.physics.arcade.overlap(player.weapons, this.hipster, this.hipsterHit, null, this);
  this.handlePlayerMovement(player);
}
