import Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    console.log("creating ball - " + x);

    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "ball", 0)
      .setDrag(5, 5)
      .setFriction(0, 0)
      .setMaxVelocity(200, 400)
      .setBounce(0.6);

    // Let's make something happen when we click on this animal
    this.sprite
      .setInteractive()
      .setOrigin() // fixes interactive offset issue
      .on("pointerdown", function(pointer, localX, localY, event) {
        this.scene.physics.add.sprite(50, 10, "meat");
      });

    this.sprite.setCollideWorldBounds(true);

    scene.physics.add.collider(scene.pet.sprite, this.sprite, () => {
      let scene = this.scene;
      let posOffsetX = this.sprite.x - scene.pet.sprite.x;
      let posOffsetY = this.sprite.y - scene.pet.sprite.y;

      this.sprite.setVelocity(posOffsetX, -150);
    });
  }

  update() {}

  destroy() {
    this.sprite.destroy();
  }
}
