function menuClass(){
  //Menu Variables
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;
	this.speed = 5;

	// Animation Variables
	this.sprite = new Image();
	this.animColumns = 4;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.init = function(){
		this.sprite.src = 'images/menu_title.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
	}
  
  this.draw = function(){
    animate(this);
  }
}

function menuInit(){
	menuSprite = new menuClass();
	menuSprite.init();
}

function menuUpdate(){
	//get the gamepads connected 
	var gamepads = navigator.getGamepads();
	
	//check if any button on the gamepad has been pressed
	if(gamepads.length > 0 && gamepads[0] && gamepads[0].buttons!=undefined){
        for (var i = 0; i < gamepads[0].buttons.length; i++) {
            if(gamepads[0].buttons[i].pressed){
                if(gameState == "menu"){
                    initGame();
                }
            } // end gamepad button if
        } // end buttons for loop
	} //end gamepad check
}

function menuDraw(){
	menuSprite.draw();
}

function menuButton() {
	var x = document.getElementById("allmenu");
	if (x.style.display === "none") {
	  x.style.display = "block";
	} else {
	  x.style.display = "none";
	}
  }