import Phaser from "phaser";

// Load specific game stuff here
import Animal from "/.DO_NOT_TOUCH/classes/Animal.js";
import Ball from "/.DO_NOT_TOUCH/classes/Ball.js";
import Meat from "/.DO_NOT_TOUCH/classes/Meat.js";

/* Lift classes to global scope */
(function() {
  // We have to lift classes we need access to into the
  //   global scope (stupid module scoping issue)
  // This is done so students can code in a clean script file (without
  //    having to use imports/exports, etc.)
  window.Animal = Animal;
  window.Ball = Ball;
})();

export default class PlayScene extends Phaser.Scene {
  preload() {
    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );

    this.load.image("sky", "/.DO_NOT_TOUCH/assets/sky.png");
    this.load.image("ground", "/.DO_NOT_TOUCH/assets/ground.png");
    this.load.image("cloud", "/.DO_NOT_TOUCH/assets/cloud.png");
    this.load.image("meat", "/.DO_NOT_TOUCH/assets/meat.png");
    this.load.image("ball", "/.DO_NOT_TOUCH/assets/ball.png");
    this.load.image("heart", "/.DO_NOT_TOUCH/assets/heart.png");

    // Load the pet's spritesheet
    this.load.spritesheet("pet", "/.DO_NOT_TOUCH/assets/pet.png", {
      frameWidth: 17,
      frameHeight: 21,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;

    // Create sky
    this.sky = this.add.sprite(halfGameWidth, halfGameHeight, "sky");

    // Create ground
    this.ground = this.physics.add.staticSprite(halfGameWidth, 83, "ground");

    // Create clouds
    this.cloudLeft = this.add.sprite(50, 20, "cloud");
    this.cloudRight = this.add.sprite(150, 5, "cloud");

    // Create pet
    this.pet = new Animal(this, 30, 10);

    // Create the ball
    this.ball = new Ball(this, 50, 10);

    this.physics.add.collider(this.pet, this.ground);
    this.physics.add.collider(this.ball, this.ground);
    this.physics.add.collider(this.pet, this.ball);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);
  }

  update(time, delta) {}

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}
