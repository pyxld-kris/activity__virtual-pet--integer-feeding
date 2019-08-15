import Phaser from "phaser";

export default class Animal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "pet", 0);
    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add
      .existing(this)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setCollideWorldBounds(true)
      .setInteractive()
      .setOrigin() // fixes interactive offset issue
      .on("pointerdown", function(pointer, localX, localY, event) {
        // Let's make something happen when we click on this animal
        this.scene.physics.add.sprite(50, 10, "meat");
      });

    // Create the animations we need from the pet spritesheet
    const anims = scene.anims;
    anims.create({
      key: "pet-idle",
      frames: anims.generateFrameNumbers("pet", { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "pet-walk",
      frames: anims.generateFrameNumbers("pet", { start: 1, end: 1 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.play("pet-idle", true);

    // Make sure the scene calls this object's update function every frame
    //scene.updateGroup.add(this);
    //scene.sys.updateList.add(this);
    this.updateListener = scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }

  update(time, delta) {
    if (Math.random() < 0.04) {
      var leftOrRight = Math.random();
      if (leftOrRight < 0.5) {
        this.setVelocity(150, 0);
      } else {
        this.setVelocity(-150, 0);
      }
    }

    if (this.body.velocity.x > 0) {
      this.anims.play("pet-walk", true);
      this.flipX = false;
    } else if (this.body.velocity.x < 0) {
      this.anims.play("pet-walk", true);
      this.flipX = true;
    } else {
      this.anims.play("pet-idle", true);
    }
  }

  destroy() {
    // Remove this object's update listener from the scene
    this.scene.events.removeListener("update", this.updateListener);

    // Call this object's parent class destroy method
    super.destroy();
  }
}
