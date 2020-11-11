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

let scoreMenu = document.getElementById("scoremenu");
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
	transitionAnim.transitionToScene('character select screen');
}

function fourPlayers()
{
	playMode = 3;
	transitionAnim.transitionToScene('character select screen');
}

function hideHighScore(){
	backToMenu();
	scoreMenu.style.display = 'none';
}

function showHighScore(){
	exitMenu();
	scoreMenu.style.display = 'block';
	let maxScoresToShow = 3;
	let scoreToShow = maxScoresToShow;
	if (sortedHighScoreList.length < scoreToShow) {
		scoreToShow = sortedHighScoreList.length;
	}
	for (let i=0; i<scoreToShow; i++){
		let scoreNumber = document.getElementById("score" + (i+1) + "Number");
		scoreNumber.innerHTML = sortedHighScoreList[i];
		let scoreName = document.getElementById("score" + (i+1) + "Name");
		scoreName.innerHTML = "zzz";
	}
	
	for (let i=scoreToShow; i<maxScoresToShow; i++){
		let scoreNumber = document.getElementById("score" + (i+1) + "Number");
		scoreNumber.innerHTML = 0;
		let scoreName = document.getElementById("score" + (i+1) + "Name");
		scoreName.innerHTML = "___";
	}
	// let scoreArray = highScoreList.split("<br>"); 
	// let SCOREBOARD = document.getElementById("highScore");
	// SCOREBOARD.innerHTML = scoreArray;
	// var tbl = document.createElement("table");
	// var row = document.createElement("tr");
}

function showCredits() {
	console.log("CREDITS");
}

function backToMenu(){
	console.log('backToMenu');
	if(menuUI.style.display === "none"){
		menuUI.style.display = "block"; 
		 }
}

function exitMenu(){
	console.log('exitMenu');
	if(menuUI.style.display === "block"){
		menuUI.style.display = "none";
		 }
}
