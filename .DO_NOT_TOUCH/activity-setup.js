import DevLaunchers from "./classes/dev-launchers";

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

export function setupActivity(scene) {
  new DevLaunchers.Activities.Info.Text(
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
    if (this.scene.progressData.numFoodsCreated >= 3) {
      //console.log("SUCCESS");
      this.scene.activityText.setText("Yum! You did it!");
    }
  });

  loadModifyCode(scene);
}
