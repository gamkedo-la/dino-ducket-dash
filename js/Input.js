debugOn = false;

//Input Variables 
const KEY_W = 'KeyW';
const KEY_S = 'KeyS';
const KEY_A = 'KeyA';
const KEY_D = 'KeyD';
const KEY_R = 'KeyR';
const KEY_M = 'KeyM';
const KEY_P = 'KeyP';
const KEY_C = 'KeyC';
const KEY_E = 'KeyE';
const KEY_G = 'KeyG';
const KEY_SPACEBAR = 'Space';
const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const ENTER = 'Enter';

//WARM UP: Add values for "P" and "M" in preparation for Pause & Mute functionality
//WARM UP: Add values for "+" and "-" in preparation for volume controls
//WARM UP: Add values for cheats (stop the enemy's movement? spawn more enemies or duckets?) Trello Card: https://trello.com/c/J4VYQDmw

var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

var moveLeft2 = false;
var moveRight2 = false;
var moveUp2 = false;
var moveDown2 = false;


var firstClick = false;

function initInput(){
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	document.addEventListener('mousedown',mouseClicked);
}

function mouseClicked(evt){
	if(!firstClick){
		firstClick = true;
		mainMenuMusic.play();
	}
}

function keyPressed(evt){
	let keyCode = evt.code;

	if(gameState == "menu"){
		if(buttonSelectState === buttonsList.single &&
			(keyCode === ENTER || keyCode === KEY_SPACEBAR)) {
			gameState = 'character select screen';
		console.log('gameState: ' + gameState);
		keyCode = null;
		}
	}

	if (gameState === 'character select screen')
	{
		switch(keyCode)
		{
			case ENTER || KEY_SPACEBAR:
			gameState = 'game';
			depositSFX.play();
			initGame();
			break;

			case KEY_RIGHT:
			characterSelectScreen.player1SelectBox.player1BoxMovesRight();
			break;
			case KEY_LEFT:
			characterSelectScreen.player1SelectBox.player1BoxMovesLeft();
			break;

			case KEY_A:
			characterSelectScreen.player2SelectBox.player2BoxMovesLeft();
			break;
			case KEY_D:
			characterSelectScreen.player2SelectBox.player2BoxMovesRight();
			break;
		}
		
	}
	
	if(gameState == 'gameOver'){
		if(keyCode == KEY_R){
			initGame();
		}
	}
	if(playMode == 1)
	{
		switch(keyCode){
			//movement
			case KEY_W:
			case KEY_UP:
				moveUp = true;
				break
			case KEY_A:
			case KEY_LEFT:
				moveLeft = true;
				break
			case KEY_S:
			case KEY_DOWN:
				moveDown = true;
				break
			case KEY_D:
			case KEY_RIGHT:
				moveRight = true;
				break
		}
	}

	if(playMode == 2)
	{
		switch(keyCode){
			//movement
			case KEY_W:
				moveUp2 = true;
				break
			case KEY_UP:
				moveUp = true;
				break
			case KEY_A:
				moveLeft2 = true;
				break
			case KEY_LEFT:
				moveLeft = true;
				break
			case KEY_S:
				moveDown2 = true;
				break
			case KEY_DOWN:
				moveDown = true;
				break
			case KEY_D:
				moveRight2 = true;
				break
			case KEY_RIGHT:
				moveRight = true;
				break
		}
	}

	switch(keyCode){
		//mute
		case KEY_M:
			if (!isMuted)
			{
				isMuted = true;
			}
			else
			{
				isMuted = false;
			}
			break;

		//pause
		case KEY_P:
			if (gameIsPaused === false)
			{
				console.log('inside gameIsPaused === false');
				gameIsPaused = true;
			}
			else if (gameIsPaused === true)
			{
				gameIsPaused = false;
			}
			console.log('gameIsPaused: ' + gameIsPaused);
			break;

		//cheats and debugs
		case KEY_SPACEBAR:
			if (!debugOn)
			{
				debugOn = true;
			}
			else
			{
				debugOn = false;
			}
		case KEY_E:
		 	if (gameState === 'game' && debugOn)
		 	{
		 		spawnEnemyTelegraph();
		 	}
			break;
		case KEY_C:
			if (gameState === 'game' && debugOn)
			{
				spawnCoins();
			}
			break;
		case KEY_G:
		    if (debugOn)
		    {
		    	if (!godMode)
		    	{
		    		godMode = true;
		    	}
		    	else
		    	{
		    		godMode = false;
		    	}
		    }
		//WARM UP: Add cases to handle ARROW Keys as alternative to WASD
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
		//WARM UP: Add cases to handle cheats (stop the enemy's movement? spawn more enemies or duckets?)
	}
}

function keyReleased(evt){
	if(playMode == 1)
	{
		switch(evt.code){
			case KEY_W:
			case KEY_UP:
				moveUp = false;
				break
			case KEY_A:
			case KEY_LEFT:
				moveLeft = false;
				break
			case KEY_S:
			case KEY_DOWN:
				moveDown = false;
				break
			case KEY_D:
			case KEY_RIGHT:
				moveRight = false;
				break
		}
	}

	if(playMode == 2)
	{
		switch(evt.code){
			case KEY_W:
				moveUp2 = false;
			case KEY_UP:
				moveUp = false;				
				break
			case KEY_A:
				moveLeft2 = false;
			case KEY_LEFT:
				moveLeft = false;	
				break
			case KEY_S:
				moveDown2 = false;
			case KEY_DOWN:
				moveDown = false;
				break
			case KEY_D:
				moveRight2 = false;
			case KEY_RIGHT:
				moveRight = false;
				break
		}
	}
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
}
