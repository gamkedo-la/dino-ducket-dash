const START_MINUTES = 1;
const START_SECONDS = 30;
const START_UPDATEGAMETIME = 60
var gameMinutes = START_MINUTES;
var gameSeconds = START_SECONDS;
var updateGameTime = START_UPDATEGAMETIME;
var timerText = "1:30";

var score = 0;
var highScore = 0;
var highScoreList = []; //WIP for tracking all scores
var sortedHighScoreList = [];
var scoredNotChecked = true;

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
	drawRect(xPos, yPos, timerBoxWidth + 2, timerBoxHeight, "black");
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(timerText, xPos+5,yPos+25);
}

function checkScore(){
	if(scoredNotChecked){
		highScoreList.push(score);
		highScore = Math.max(...highScoreList);
		intHighestScoreList = localStorage.getItem('highScoreList');
		if(intHighestScoreList < highScore){
			localStorage.setItem("highestScore",highScore);
		}
		sortedHighScoreList = highScoreList.sort(function(a,b){return b-a});
		//score = 0;
		scoredNotChecked = false;
	}
}		

function drawHighScore(){
    
    // this runs every frame!! FIXME - cache value so we don't do this a million times
    let highestScoreEverRecorded = localStorage.getItem("highestScore"); 

    // bugfix: if none recorded or browser security denies, don't crash
    if (!highestScoreEverRecorded) {
        // P.S. it HAS to be a string, not an integer, which has no padStart() LOL
        highestScoreEverRecorded = "0";
    }

	let hsScoreText = highestScoreEverRecorded.padStart(10,'0');

	let labelText = 'High Score:';
	let labelTextWidth = canvasContext.measureText(labelText).width;

	let hsScoreBoxWidth = 100;
	let hsScoreBoxHeight = 10;
	let xPos = canvas.width - (hsScoreBoxWidth*PIXEL_SCALE_UP/2)-5;
	let yPos = 0;

    drawRect(xPos - labelTextWidth - 10,yPos, hsScoreBoxWidth + labelTextWidth, hsScoreBoxHeight, "black");
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(labelText, xPos - labelTextWidth - 5,yPos+25);
	canvasContext.fillText(hsScoreText, xPos+5,yPos+25);
}

function drawCurrentScore()
{
	let labelText = 'Score:';
	let labelTextWidth = canvasContext.measureText(labelText).width;
	
	let currentScoreBoxWidth = 10;
	let currentScoreBoxHeight = 10;
	let xPos = labelTextWidth;
	let yPos = 0;
	let currentScoreText = score.toString().padStart(10,'0');
	drawRect(0,yPos, labelTextWidth*0.925,currentScoreBoxHeight, 'black');
	canvasContext.fillStyle = 'white';
	canvasContext.fillText(labelText, 0,25);
	canvasContext.fillText(currentScoreText, xPos+5,yPos+25);
}
