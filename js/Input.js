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
const KEY_SPACEBAR = 'Space';
//WARM UP: Add values for "P" and "M" in preparation for Pause & Mute functionality
//WARM UP: Add values for "+" and "-" in preparation for volume controls
//WARM UP: Add values for cheats (stop the enemy's movement? spawn more enemies or duckets?) Trello Card: https://trello.com/c/J4VYQDmw

var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

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
	//console.log(evt.code);
	if(gameState == "menu"){
		initGame();
	}
	
	if(gameState == 'gameOver'){
		if(evt.code == KEY_R){
			initGame();
		}
	}
	switch(evt.code){
		//movement
		case KEY_W:
			moveUp = true;
			break
		case KEY_A:
			moveLeft = true;
			break
		case KEY_S:
			moveDown = true;
			break
		case KEY_D:
			moveRight = true;
			break

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
		//WARM UP: Add cases to handle ARROW Keys as alternative to WASD
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
		//WARM UP: Add cases to handle cheats (stop the enemy's movement? spawn more enemies or duckets?)
	}
}

function keyReleased(evt){
	switch(evt.code){
		case KEY_W:
			moveUp = false;
			break
		case KEY_A:
			moveLeft = false;
			break
		case KEY_S:
			moveDown = false;
			break
		case KEY_D:
			moveRight = false;
			break
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
	}
}
