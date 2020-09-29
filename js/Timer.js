const START_MINUTES = 2;
const START_SECONDS = 59;
const START_UPDATEGAMETIME = 60
var gameMinutes = START_MINUTES;
var gameSeconds = START_SECONDS;
var updateGameTime = START_UPDATEGAMETIME;
var timerText = "3:00";

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
	let timerBoxWidth = 15;
	let timerBoxHeight = 10;
	let xPos = canvas.width/2 - timerBoxWidth/2;
	let yPos = 5;
	timerText = gameMinutes + ":" + gameSeconds;
	drawRect(xPos, yPos, timerBoxWidth, timerBoxHeight, "grey");
	colorTextShadow(timerText, xPos+5, yPos+20, fillColor="black", font = "14px Arial Black", align="left") 
}