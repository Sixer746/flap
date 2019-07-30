// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var height = 400;
var width = 790;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */

 var score = 0;
 var labelScore;
 var pipes = [];


var player;

function preload() {
  game.load.image("sup", "../assets/flappy_superman.png");
  game.load.image("p", "../assets/flappy.png");
  game.load.audio("track", "../assets/point.ogg")
  game.load.image("n", "..")
  game.load.image("p2", "../assets/flappy_frog.png");
  game.load.image("pipeBlock", "../assets/pipe.png");
  game.load.image("pipeend", "../assets/pipe-end.png")





}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    labelScore = game.add.text(20, 20, "0");
game.stage.setBackgroundColor("#00ffee");
player = game.add.sprite(20, height/2 -30, "p");
game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(playerJump);
  player.anchor.setTo(0.5, 0.5);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 200;
generatePipe();
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(pipeInterval, generatePipe);

}



/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
   player,
   pipes,
   gameOver);

  if (player.y < 0 || player.y > 400) {
    gameOver();
  }
}

function gameOver(){
  location.reload();
}


function playerJump(){
  player.body.velocity.y = - 200;

}



function changeScore() {
  score = score + 1
  labelScore.setText(score.toString());
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for (var count = 0; count < 8; count = count + 1){
  if(count != gapStart && count!= gapStart + 1){
    addPipeBlock(750, count * 50);
  }
  }
  changeScore();
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x,y, "pipeBlock")
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;}
