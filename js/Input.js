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
const KEY_I = 'KeyI';
const KEY_J = 'KeyJ';
const KEY_K = 'KeyK';
const KEY_L = 'KeyL';
const KEY_B = 'KeyB';
const KEY_1 = 'Digit1';
const KEY_2 = 'Digit2';
const KEY_3 = 'Digit3';
const KEY_4 = 'Digit4';
const KEY_NUM4 = 'Numpad4';
const KEY_NUM5 = 'Numpad5';
const KEY_NUM6 = 'Numpad6';
const KEY_NUM8 = 'Numpad8';
const KEY_SPACEBAR = 'Space';
const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const ENTER = 'Enter';
const ESC = 'Escape'

//WARM UP: Add values for "P" and "M" in preparation for Pause & Mute functionality
//WARM UP: Add values for "+" and "-" in preparation for volume controls
//WARM UP: Add values for cheats (stop the enemy's movement? spawn more enemies or duckets?) Trello Card: https://trello.com/c/J4VYQDmw

var moveLeft0 = false;
var moveRight0 = false;
var moveUp0 = false;
var moveDown0 = false;

var moveLeft1 = false;
var moveRight1 = false;
var moveUp1 = false;
var moveDown1 = false;

var moveLeft2 = false;
var moveRight2 = false;
var moveUp2 = false;
var moveDown2 = false;

var moveLeft3 = false;
var moveRight3 = false;
var moveUp3 = false;
var moveDown3 = false;

var firstClick = false;

function initInput(){
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	document.addEventListener('mousedown',mouseClicked);
}

function mouseClicked(evt){
	if (gameState !== 'input to launch')
	{
		return;
	}

	if(!firstClick){
		firstClick = true;
		mainMenuMusic.play();
		gameState = 'menu';
		init();
	}
}

function keyPressed(evt){
	let keyCode = evt.code;

	if (gameState == 'loading')
	{
		return;
	}

	if(gameState == 'input to launch')
	{
		
		if ((keyCode == ENTER || keyCode == KEY_SPACEBAR ) )
		{
			menuSelect.play();
			gameState = 'menu';
			mainMenuMusic.play();
			init();
			keyCode = null;
		}
		
	}
	if(gameState == "menu"){
		if( (buttonSelectState === buttonsList.single || buttonSelectState === buttonsList.multi ||
			 buttonSelectState === buttonsList.threePlayers || buttonSelectState === buttonsList.fourPlayers)
			 &&
			 (keyCode === ENTER || keyCode === KEY_SPACEBAR) ) {
				menuSelect.play();
				x.style.display = "none";
			   gameIsPaused = false;
				switch(buttonSelectState){
					case buttonsList.single:
						singlePlayer();
						break;
					case buttonsList.multi:
						twoPlayer();
						break;
					case buttonsList.threePlayers:
						threePlayers();
						break;
					case buttonsList.fourPlayers:
						fourPlayers();
						break;
				}
				
				transitionAnim.transitionToScene('character select screen');
				console.log('gameState: ' + gameState);
				keyCode = null;
		}
	}

	if (gameState === 'character select screen')
	{
		console.log(`Play Mode: ${playMode}`)
		switch(keyCode)
		{
			case ESC:
				transitionAnim.transitionToScene('menu');
				break;
			case ENTER || KEY_SPACEBAR:
			transitionAnim.transitionToScene('game');
			menuSelect.play();
			depositSFX.play();
			gamePlayMusic.play();
			gamePlayMusic.setTime(mainMenuMusic.getTime());
			mainMenuMusic.stop();
			initGame();
			break;

			case KEY_1:
				menuSFX.play();
				playMode = 0;
				break;
			case KEY_2:
				menuSFX.play();
				playMode = 1;
				break;
			case KEY_3:
				menuSFX.play();
				playMode = 2;
				break;		
			case KEY_4:
				menuSFX.play();
				playMode = 3;
				break;
		}

		if(playMode == 0)
		{
			switch(keyCode)
			{
			case KEY_A:
			case KEY_LEFT:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[0].playerBoxMovesLeft();
				break;
			case KEY_D:
			case KEY_RIGHT:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[0].playerBoxMovesRight();
				break
			}
		}
		if(playMode > 0)
		{
			switch(keyCode)
			{
			case KEY_LEFT:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[0].playerBoxMovesLeft();
				break;
			case KEY_RIGHT:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[0].playerBoxMovesRight();
				break;
			case KEY_A:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[1].playerBoxMovesLeft();
				break;
			case KEY_D:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[1].playerBoxMovesRight();
				break;
			}
		}
		if(playMode > 1)
		{
			switch(keyCode)
			{
			case KEY_J:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[2].playerBoxMovesLeft();
				break;
			case KEY_L:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[2].playerBoxMovesRight();
				break;
			}
		}
		if(playMode > 2)
		{
			switch(keyCode)
			{
			case KEY_NUM4:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[3].playerBoxMovesLeft();
				break;
			case KEY_NUM6:
				menuSFX.play();
				characterSelectScreen.playerSelectBox[3].playerBoxMovesRight();
				break;
			}
		}
	}
	
	if(gameState == 'gameOver'){		
		switch(keyCode){
			//movement
			case KEY_UP:
				increaseLetter = true;
				break;
			case KEY_DOWN:
				decreaseLetter = true;
				break;
			case KEY_LEFT:
				decreaseInitial = true;
				break;
			case KEY_RIGHT:
				increaseInitial = true;
				break
			case ENTER:
				saveName();
			case KEY_R:
				initGame();
				break;
			case ESC:				
				gameState = 'menu';
				init(true);
				break;
		}
		
	}
	if(playMode == 0){
		switch(keyCode){
			//movement
			case KEY_W:
			case KEY_UP:
				moveUp0 = true;
				break
			case KEY_A:
			case KEY_LEFT:
				moveLeft0 = true;
				break
			case KEY_S:
			case KEY_DOWN:
				moveDown0 = true;
				break
			case KEY_D:
			case KEY_RIGHT:
				moveRight0 = true;
				break
		}
	}
	else
	{
		switch(keyCode){
			//movement
			case KEY_UP:
				moveUp0 = true;
				break
			case KEY_W:
				moveUp1 = true;
				break
			case KEY_I:
				moveUp2 = true;
				break
			case KEY_NUM8:
				moveUp3 = true;
				break

			case KEY_LEFT:
				moveLeft0 = true;
				break
			case KEY_A:	
				moveLeft1 = true;
				break
			case KEY_J:
				moveLeft2 = true;
				break
			case KEY_NUM4:
				moveLeft3 = true;
				break

			case KEY_DOWN:
				moveDown0 = true;
				break
			case KEY_S:
				moveDown1 = true;
				break
			case KEY_K:
				moveDown2 = true;
				break
			case KEY_NUM5:
				moveDown3 = true;
				break

			case KEY_RIGHT:
				moveRight0 = true;
				break
			case KEY_D:
				moveRight1 = true;
				break
			case KEY_L:
				moveRight2 = true;
				break
			case KEY_NUM6:
				moveRight3 = true;
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
			break;
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
		    break;
		case KEY_B:
			if (debugOn)
			{
				spawnSurpriseBox(100,100);
			}
		//WARM UP: Add cases to handle ARROW Keys as alternative to WASD
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
		//WARM UP: Add cases to handle cheats (stop the enemy's movement? spawn more enemies or duckets?)
	}
}

function keyReleased(evt){
	if(playMode == 0)
	{
		switch(evt.code){
			case KEY_W:
			case KEY_UP:
				moveUp0 = false;
				break
			case KEY_A:
			case KEY_LEFT:
				moveLeft0 = false;
				break
			case KEY_S:
			case KEY_DOWN:
				moveDown0 = false;
				break
			case KEY_D:
			case KEY_RIGHT:
				moveRight0 = false;
				break
		}
	}
	else
	{
		switch(evt.code){
			case KEY_UP:
				moveUp0 = false;
				break
			case KEY_W:
				moveUp1 = false;
				break
			case KEY_I:
				moveUp2 = false;
				break
			case KEY_NUM8:
				moveUp3 = false;
				break

			case KEY_LEFT:
				moveLeft0 = false;
				break
			case KEY_A:	
				moveLeft1 = false;
				break
			case KEY_J:
				moveLeft2 = false;
				break
			case KEY_NUM4:
				moveLeft3 = false;
				break

			case KEY_DOWN:
				moveDown0 = false;
				break
			case KEY_S:
				moveDown1 = false;
				break
			case KEY_K:
				moveDown2 = false;
				break
			case KEY_NUM5:
				moveDown3 = false;
				break

			case KEY_RIGHT:
				moveRight0 = false;
				break
			case KEY_D:
				moveRight1 = false;
				break
			case KEY_L:
				moveRight2 = false;
				break
			case KEY_NUM6:
				moveRight3 = false;
				break
		}
	}
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
}












































function inputKey()
{
	spawnSurpriseBox(moneyBucket.x-100,moneyBucket.y-60);
	spawnSurpriseBox(moneyBucket.x,moneyBucket.y-60);
	spawnSurpriseBox(moneyBucket.x+100,moneyBucket.y-60);
	spawnSurpriseBox(moneyBucket.x+200,moneyBucket.y-60);
	characterSelect.play();
}
