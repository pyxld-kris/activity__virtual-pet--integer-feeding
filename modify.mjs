/**** WELCOME! *********************************************/
/**
 * GOAL: Change the variable NUM_FOODS in order to feed the pet 
 * enough to fill it up. Your pet wants 3 pieces of food right now!
 * 
 * ----------------------------------------------------------
 * After making a change: save this file, then press the refresh
 * button above the game window!
 * ----------------------------------------------------------
 */
/**************** Start Modifying Here! *********************/


// How many food items should we give to our pet?
const NUM_FOODS = 0; // Integer variable

/**** GOODBYE! ************************************************/
/**** Stop Modifying Here! (Unless you want to experiment!) ***/

/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**/
/**//* eslint-disable */ // Stops codesandbox from giving us annoying errors
/** The following code helps our activity work on a slightly deeper level */
let scene = this; // Setting this variable for readability

// This function creates one food item in our active game scene
function createFood(scene) {
  dropMeat(scene); // Call our meat making function, defined in activity-setup.js

  // Record that we created this so our SuccessMonitor can detect
  //  when activities are completed
  if (scene.progressData != undefined) {
    scene.progressData.numFoodsCreated = (scene.progressData.numFoodsCreated === undefined) ? 1 : scene.progressData.numFoodsCreated+1;
  }
}

// Loop the appropriate number of times defined by NUM_FOODS
for (let i=0; i<NUM_FOODS; i++) {
  createFood(scene);
}


/* eslint-enable */
