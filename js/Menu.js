function menuClass(){
  //Menu Variables
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;
	this.speed = 5;

	// Animation Variables
	this.sprite;
	this.animColumns = 4;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 5;
	this.currentAnimationFrameDelay = 5;
	this.flipped = true;

	this.init = function(){
		this.sprite = images.menu_title;
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
	}
  
  this.draw = function(){
    animate(this,true);
  }
}

function menuInit(){
	menuSprite = new menuClass();
	menuSprite.init();
}

function menuDraw(){
	menuSprite.draw();
}
//menuItem variables
let x = document.getElementById("allmenu");
x.style.display = "none";
let s = document.getElementById("single");
let m = document.getElementById("multi");
let a = document.getElementById("audio");
let c = document.getElementById("highscore");

function singlePlayer() {
	playMode = 0;
	transitionAnim.transitionToScene('character select screen');
}

function twoPlayer() {
	playMode = 1;
	transitionAnim.transitionToScene('character select screen');
}

function threePlayers()
{
	playMode = 2;
	gameState = 'character select screen';
}

function fourPlayers()
{
	playMode = 3;
	gameState = 'character select screen';
}

function showHighScore(){
	
}

function showCredits() {
	console.log('creditsss');
	if(x.style.display === "none"){
		x.style.display = "block"; 
		 } else {
		   x.style.display = "none";
		 }
}
