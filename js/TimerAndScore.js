const START_MINUTES = 1;
const START_SECONDS = 30;
const START_UPDATEGAMETIME = 60
var gameMinutes = START_MINUTES;
var gameSeconds = START_SECONDS;
var updateGameTime = START_UPDATEGAMETIME;
var timerText = "1:30";

var score = 0;
var highScore = 0;
var highScoreList = []; 
var sortedHighScoreList = [];
var scoredNotChecked = true;
var enterNewHighScoreName = false;
var name = [];
var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var firstInitial = letters[0];
var middleInitial = letters[0];
var lastInitial = letters[0];	
var increaseLetter = false;
var decreaseLetter = false;
var increaseInitial = false;
var decreaseInitial = false;
var initialPosition = [0];

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
		transitionAnim.transitionToScene('gameOver');
	}
	countdownSFX();
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
	canvasContext.fillStyle = '#fe4101';
	canvasContext.fillText(timerText, xPos+5,yPos+25);
}

function checkScore(){
	if(scoredNotChecked){
		highScoreList.push(score);
		highScore = Math.max(...highScoreList);
		intHighestScoreList = localStorage.getItem('highScoreList');
		if(intHighestScoreList < highScore){
			localStorage.setItem("highestScore",highScore);
			enterNewHighScoreName = true;
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

//ugly variables for countdownSFX
var one = false;
var two = false;
var three = false;
var four = false;
var five = false;
var six = false;
var seven = false;
var eight = false;
var nine = false;
var ten = false;

//ugly function for countdownSFX, not sure how else to do it though
function countdownSFX(){

	if(gameMinutes == 0 ){
		
		if(gameSeconds == 10 && !ten){
			countdownSecondSFX.play();
			ten = true;
		}

		if(gameSeconds == 9 && !nine){
			countdownSecondSFX.play();
			nine = true;
		}

		if(gameSeconds == 8 && !eight){
			countdownSecondSFX.play();
			eight = true;
		}

		if(gameSeconds == 7 && !seven){
			countdownSecondSFX.play();
			seven = true;
		}

		if(gameSeconds == 6 && !six){
			countdownSecondSFX.play();
			six = true;
		}

		if(gameSeconds == 5 && !five){
			countdownSecondSFX.play();
			five = true;
		}

		if(gameSeconds == 4 && !four){
			countdownSecondSFX.play();
			four = true;
		}

		if(gameSeconds == 3 && !three){
			countdownSecondSFX.play();
			three = true;
		}

		if(gameSeconds == 2 && !two){
			countdownSecondSFX.play();
			two = true;
		}

		if(gameSeconds == 1 && !one){
			countdownSecondSFX.play();
			one = true;
		}
	}
}

function enterNewName(){
	if(KEY_UP){
		letters++;
	} else if (KEY_DOWN){
		letters--;
	}
}