const START_MINUTES = 2;
const START_SECONDS = 59;
const START_UPDATEGAMETIME = 60
var gameMinutes = START_MINUTES;
var gameSeconds = START_SECONDS;
var updateGameTime = START_UPDATEGAMETIME;
var timerText = "3:00";

var score = 0;
var highScore = 0;
var highScoreList = []; //WIP for tracking all scores
var sortedHighScoreList = [];

/*
 updateTimer is to keep track of Game Time.    
*/
function updateTimer(){
	updateGameTime--;
	if(updateGameTime == 0){4
		gameSeconds--;
		updateGameTime = START_UPDATEGAMETIME;
	}
	if (gameSeconds < 0){
		gameMinutes--;
		gameSeconds = START_SECONDS
	}
	if(gameSeconds == 0 && gameMinutes == 0){
		gameState = 'gameOver';
	}
}

function resetTimer(){
	gameMinutes = START_MINUTES;
	gameSeconds = START_SECONDS;
	updateGameTime = START_UPDATEGAMETIME;
}


function drawTimer(){
	let timerBoxWidth = 20;
	let timerBoxHeight = 10;
	let xPos = canvas.width/2 - (timerBoxWidth*PIXEL_SCALE_UP/2);
	let yPos = 0;
	let secondDisplay = gameSeconds.toString().padStart(2,'0');
	timerText = gameMinutes + ":" + secondDisplay;
	drawRect(xPos, yPos, timerBoxWidth, timerBoxHeight, "black");
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(timerText, xPos+5,yPos+20);
}

function checkScore(){
	highScoreList.push(score);
	highScore = Math.max(...highScoreList);
	sortedHighScoreList = highScoreList.sort(function(a,b){return b-a});
	score = 0;
}		

function drawHighScore(){
	let hsScoreBoxWidth = 100;
	let hsScoreBoxHeight = 10;
	let xPos = canvas.width - (hsScoreBoxWidth*PIXEL_SCALE_UP/2)-5;
	let yPos = 0;
	let hsScoreText = highScore.toString().padStart(10,'0');
	drawRect(xPos, yPos, hsScoreBoxWidth, hsScoreBoxHeight, "black");
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(hsScoreText, xPos+5,yPos+20);
}