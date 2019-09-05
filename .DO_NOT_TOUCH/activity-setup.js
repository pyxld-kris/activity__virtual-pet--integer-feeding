import DevLaunchers from "./classes/dev-launchers";

// Load specific game stuff here that will be used in
// this file, or in 'modify.mjs'
import Meat from "./classes/Meat.js";

function dropMeat(scene) {
  // Create a new meat object somewhere random in the sky
  let thisMeat = new Meat(scene, 60 + Math.floor(Math.random() * 90), 10);
}

export function setupActivity(scene) {
  scene.activityText = new DevLaunchers.Activities.Info.Text(
    scene,
    Math.floor(scene.game.config.width / 2),
    Math.floor(scene.game.config.height - 10),
    "Your pet needs food!"
  );

  new DevLaunchers.Activities.Info.InstructionSequence(scene, [
    new DevLaunchers.Activities.Info.Instruction(
      scene,
      "This is your new pet",
      2000
    ),
    new DevLaunchers.Activities.Info.Instruction(
      scene,
      "Code to care for it",
      2000
    )
  ]);

  // Monitor this activity's success conditions
  new DevLaunchers.Activities.ProgressMonitor(scene, function() {
    let numFoodsCreated = this.scene.progressData.numFoodsCreated;
    if (numFoodsCreated === undefined) return;
    if (numFoodsCreated == 0) {
      this.scene.activityText.setText("Your pet needs food!");
    } else if (numFoodsCreated < 3) {
      this.scene.activityText.setText("More food please!");
    } else if (numFoodsCreated > 3) {
      this.scene.activityText.setText("Too much food!!");
    } else {
      // numFoods == 3
      //console.log("SUCCESS");
      this.scene.activityText.setText("Yum! You did it!!!");
      new DevLaunchers.Activities.Success.Noise(scene);
      this.destroy();
    }
  });

  loadModifyCode(scene);
}

/***************************/
/* HELPER FUNCTIONS FOLLOW */
/***************************/

/*
 * evalWithinContext()
 * Allows a string of javascript code to be executed within the given scope/context
 * Used after fetching student code in order to run it within the current Phaser scene
 *     (Keeps student coding interface clean)
 */
var evalWithinContext = function(context, code) {
  (function(code) {
    eval(code);
  }.apply(context, [code]));
};

/*
 * loadModifyCode()
 * Loads the 'modify.mjs' file students will be making changes in, and executes it in the
 * current module's scope. We're using this method instead of import to maintain scene scope
 * and keep import/export out of the modify.js script. This makes it more simple for the
 * students to work with.
 */
function loadModifyCode(scene) {
  // Let's load the modify.js script and run it in this scope!
  // using this method instead of import to maintain scene scope and keep import/export
  //    out of the modify.js script. More simple for students to work with
  /* eslint-disable */
  //var scene = this;
  let codeText = fetch("../modify.mjs")
    .then(function(response) {
      return response.text();
    })
    .then(function(textString) {
      evalWithinContext(scene, textString);
    });
  /* eslint-enable */
}
