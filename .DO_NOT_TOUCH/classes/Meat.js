import Phaser from "phaser";

export default class Meat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "meat");

    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add
      .existing(this)
      .setCollideWorldBounds(true)
      .setDrag(100, 100)
      .setFriction(100, 0)
      .setMaxVelocity(200, 400)
      .setBounce(0.6)
      .setInteractive()
      .setOrigin(); // fixes interactive offset issue

    // Meat collide with ground
    scene.physics.add.collider(this, scene.ground);

    scene.physics.add.collider(scene.pet, this, () => {
      // pet collided with meat
      this.destroy();
    });
  }

  update() {}

  destroy() {
    // Remove this object's update listener from the scene
    //this.scene.events.removeListener("update", this.updateListener);

    // Call this object's parent class destroy method
    super.destroy();
  }
}
