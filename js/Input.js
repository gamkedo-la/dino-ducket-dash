//Input Variables 
const KEY_W = 87; 
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;

function initInput(){
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

function keyPressed(evt){
	if(gameState == "menu"){
		gameState = "game";
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
	}
}
