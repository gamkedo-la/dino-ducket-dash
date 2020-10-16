var godMode = false;

function playerClass(playerNumber){	
	//Player Variables
	this.width = 10;
	this.height = 10;
	this.x = 0;
	this.y = this.height*5;
	
	this.speed = 10;
	this.ducketsCarried = 0;
    this.controllerThreshold = 0.5;
	this.stepCounter = 0;

	//Things for coop
	this.playerNumber = playerNumber;
	this.gamepadID;
	this.moveLeft = false;
	this.moveRight = false;
	this.moveDown = false;
	this.moveUp = false;

	// Animation Variables
	this.leftSprite;
	this.rightSprite;
	this.sprite;
	this.animColumns = 6;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.initPlayer = function(){
		//console.log(this.x+"/"+this.y);
		this.leftSprite = images.player_idle_facing_left;
		this.leftSprite.loaded = true;
		this.rightSprite = images.player_idle_facing_right;
		this.rightSprite.loaded = true;
		this.sprite = this.rightSprite;
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true; // FIXME: this is a lie!!!
		if(this.playerNumber == 1)
		{
			this.gamepadID = 0;
		}
		else if(this.playerNumber == 2)
		{
			this.gamepadID = 1;
		}
	}

	this.update = function(){
		//translate inputs to players
		if(this.playerNumber == 1)
		{
			this.moveRight = moveRight;
			this.moveLeft = moveLeft;
			this.moveUp = moveUp;
			this.moveDown = moveDown;
		}
		if(this.playerNumber == 2)
		{
			this.moveRight = moveRight2;
			this.moveLeft = moveLeft2;
			this.moveUp = moveUp2;
			this.moveDown = moveDown2;
		}
		console.log(this.playerNumber)

		//get connected gamepads
		if (this.moveRight)
		{
			this.sprite = this.rightSprite;
		}
		else if (this.moveLeft)
		{
			this.sprite = this.leftSprite;
		}

		var gamepads = navigator.getGamepads();

		//check if there's gamepads connected.
		if(gamepads.length > 0 && gamepads[0] && gamepads[0].buttons!=undefined){
			
			//gamepad player movement code
			if(gamepads[this.gamepadID].axes[0] > this.controllerThreshold){
				if(this.x < canvas.width - this.width*PIXEL_SCALE_UP - 15){
					this.x += (this.speed);
				}
			}
			if(gamepads[this.gamepadID].axes[0] < -this.controllerThreshold){
				if(this.x > 0){
					this.x -= (this.speed);
				}
			}
			if(gamepads[this.gamepadID].axes[1] < -this.controllerThreshold){
				if(this.y > 0){
					this.y -= (this.speed);
				}
			}
			if(gamepads[this.gamepadID].axes[1] > this.controllerThreshold){
				if(this.y < canvas.height-this.height*PIXEL_SCALE_UP - this.height*4){
					this.y += (this.speed);
				}
			}
		}
		
		if(this.moveRight){
			if(this.x < canvas.width - this.width*PIXEL_SCALE_UP - 15){
				this.x += (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(this.moveLeft){
			if(this.x > 0){
				this.x -= (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(this.moveUp){
			if(this.y > 15){
				this.y -= (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(this.moveDown){
			if(this.y < canvas.height - this.height*PIXEL_SCALE_UP - this.height){
				this.y += (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		
		if(!this.moveDown && !this.moveUp && !this.moveRight && !this.moveLeft){ // idle?
			this.animationFrameDelay = ANIMATION_DELAY;
        } else { // we are moving
            this.stepCounter++;
            if (this.stepCounter%3==0) decals.add(this.x+10,this.y+30);
        }
	}
	
	function playerGamepadMovement(gamepads){
		if(gamepads[this.gamepadID].axes[0] > this.controllerThreshold){
			if(this.x < canvas.width - this.width*PIXEL_SCALE_UP){
				this.x += (this.speed);
			}
		}
		if(gamepads[this.gamepadID].axes[0] < -this.controllerThreshold){
			if(this.x > 0){
				this.x -= (this.speed);
			}
		}
		if(gamepads[this.gamepadID].axes[1] < -this.controllerThreshold){
			if(this.y > 0){
				this.y -= (this.speed);
			}
		}
		if(gamepads[this.gamepadID].axes[1] > this.controllerThreshold){
			if(this.y < canvas.height-this.height*PIXEL_SCALE_UP){
				this.y += (this.speed);
			}
		}

		if(playerNumber = 2){

		}
	}

	this.draw = function(){
		//drawRect(this.x,this.y, this.sprite.width,this.sprite.height, 'white');
		canvasContext.fillStyle = 'black';
		canvasContext.font = '12px "Press Start 2P"'
		canvasContext.fillText(this.ducketsCarried, this.x+10,this.y-2);
		
		animate(this,true);
		
	}
}
