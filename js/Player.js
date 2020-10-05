function playerClass(){	
	//Player Variables
	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	this.speed = 10;
	this.ducketsCarried = 0;
	this.controllerThreshold = 0.5;

	// Animation Variables
	this.sprite = new Image();
	this.animColumns = 6;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.initPlayer = function(){
		console.log(this.x+"/"+this.y);
		this.sprite.src = 'images/player_idle.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
	}

	this.update = function(){
		//get connected gamepads
		var gamepads = navigator.getGamepads();

		//check if there's gamepads connected.
		if(gamepads.length > 0 && gamepads[0] && gamepads[0].buttons!=undefined){
			
			//gamepad player movement code
			if(gamepads[0].axes[0] > this.controllerThreshold){
				if(this.x < canvas.width - this.width*PIXEL_SCALE_UP){
					this.x += (this.speed);
				}
			}
			if(gamepads[0].axes[0] < -this.controllerThreshold){
				if(this.x > 0){
					this.x -= (this.speed);
				}
			}
			if(gamepads[0].axes[1] < -this.controllerThreshold){
				if(this.y > 0){
					this.y -= (this.speed);
				}
			}
			if(gamepads[0].axes[1] > this.controllerThreshold){
				if(this.y < canvas.height-this.height*PIXEL_SCALE_UP){
					this.y += (this.speed);
				}
			}
		}
		
		if(moveRight){
			if(this.x < canvas.width - this.width*PIXEL_SCALE_UP){
				this.x += (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(moveLeft){
			if(this.x > 0){
				this.x -= (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(moveUp){
			if(this.y > 0){
				this.y -= (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(moveDown){
			if(this.y < canvas.height-this.height*PIXEL_SCALE_UP){
				this.y += (this.speed);
				this.animationFrameDelay = 1;
			}
		}
	}
	
	function playerGamepadMovement(gamepads){
		if(gamepads[0].axes[0] > this.controllerThreshold){
			if(this.x < canvas.width - this.width*PIXEL_SCALE_UP){
				this.x += (this.speed);
			}
		}
		if(gamepads[0].axes[0] < -this.controllerThreshold){
			if(this.x > 0){
				this.x -= (this.speed);
			}
		}
		if(gamepads[0].axes[1] < -this.controllerThreshold){
			if(this.y > 0){
				this.y -= (this.speed);
			}
		}
		if(gamepads[0].axes[1] > this.controllerThreshold){
			if(this.y < canvas.height-this.height*PIXEL_SCALE_UP){
				this.y += (this.speed);
			}
		}
	}

	this.draw = function(){
		//drawRect(this.x,this.y, this.sprite.width,this.sprite.height, 'white');
		canvasContext.fillStyle = 'black';
		canvasContext.font = '12px "Press Start 2P"'
		canvasContext.fillText(this.ducketsCarried, this.x+10,this.y-2);
		animate(this);
	}
}
