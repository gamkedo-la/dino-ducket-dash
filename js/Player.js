var godMode = false;

function playerClass(){	
	//Player Variables
	this.width = 10;
	this.height = 10;
	this.x = 0;
	this.y = this.height*5;
	
	this.speed = 10;
	this.ducketsCarried = 0;
    this.controllerThreshold = 0.5;
    this.stepCounter = 0;

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
	}

	this.update = function(){
		//get connected gamepads
		if (moveRight)
		{
			this.sprite = this.rightSprite;
		}
		else if (moveLeft)
		{
			this.sprite = this.leftSprite;
		}

		var gamepads = navigator.getGamepads();

		//check if there's gamepads connected.
		if(gamepads.length > 0 && gamepads[0] && gamepads[0].buttons!=undefined){
			
			//gamepad player movement code
			if(gamepads[0].axes[0] > this.controllerThreshold){
				if(this.x < canvas.width - this.width*PIXEL_SCALE_UP - 15){
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
				if(this.y < canvas.height-this.height*PIXEL_SCALE_UP - this.height*4){
					this.y += (this.speed);
				}
			}
		}
		
		if(moveRight){
			if(this.x < canvas.width - this.width*PIXEL_SCALE_UP - 15){
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
			if(this.y > 15){
				this.y -= (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		if(moveDown){
			if(this.y < canvas.height - this.height*PIXEL_SCALE_UP - this.height*4){
				this.y += (this.speed);
				this.animationFrameDelay = 1;
			}
		}
		
		if(!moveDown && !moveUp && !moveRight && !moveLeft){ // idle?
			this.animationFrameDelay = ANIMATION_DELAY;
        } else { // we are moving
            this.stepCounter++;
            if (this.stepCounter%3==0) decals.add(this.x+10,this.y+30);
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
		
		animate(this,true);
		
	}
}
