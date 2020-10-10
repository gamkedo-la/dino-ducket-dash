//Input Variables 
const KEY_W = 87; 
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const KEY_R = 82;
const KEY_M = 77;
//WARM UP: Add values for ARROW Keys
//WARM UP: Add values for "P" and "M" in preparation for Pause & Mute functionality
//WARM UP: Add values for "+" and "-" in preparation for volume controls
//WARM UP: Add values for cheats (stop the enemy's movement? spawn more enemies or duckets?) Trello Card: https://trello.com/c/J4VYQDmw

var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

function initInput(){
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

function keyPressed(evt){
	//console.log(evt.keyCode);
	if(gameState == "menu"){
		initGame();
	}
	
	if(gameState == 'gameOver'){
		if(evt.keyCode == KEY_R){
			initGame();
		}
	}
	switch(evt.keyCode){
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
		case KEY_M:
			if (!isMuted)
			{
				isMuted = true;
			}
			else
			{
				isMuted = false;
			}
		//WARM UP: Add cases to handle ARROW Keys as alternative to WASD
		//WARM UP: Add cases to handle "P"/"M"/"+"/"-" for Pause, Mute, Volume up, Volume down
		//WARM UP: Add cases to handle cheats (stop the enemy's movement? spawn more enemies or duckets?)
	}
}

function keyReleased(evt){
	switch(evt.keyCode){
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
