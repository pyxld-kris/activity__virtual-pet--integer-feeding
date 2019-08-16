/**** WELCOME! *********************************************/
/**
 * GOAL: Change the variable NUM_FOODS in order to feed the pet 
 * enough to fill it up!
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

/*/
/*/
/*/
/*/
/*/
/*/
/*/
/*/
/*/
/*/
/*/

/* eslint-disable */ // Stops codesandbox from giving us annoying errors

let scene = this; // Setting this variable for readability

// This function creates one food item in our active game scene
function createFood() {
  let thisMeat = scene.physics.add.sprite(60+Math.floor(Math.random()*90), 10, 'meat');
  scene.physics.add.collider(thisMeat, scene.ground);
  scene.physics.add.collider(thisMeat, scene.pet.sprite, function() {
    thisMeat.destroy();
  });
}

// Loop the appropriate number of times defined by NUM_FOODS
for (let i=0; i<NUM_FOODS; i++) {
  createFood();
}

/* eslint-enable */