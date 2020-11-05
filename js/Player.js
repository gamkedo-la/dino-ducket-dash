// if true, a player with >1 duckets hitting one with 0 duckets gives them one
const SHARE_DUCKETS_IF_IN_NEED = true; 

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
	this.immunityTimer = 0;
	this.immunity = false;
	this.dead = false;

	//Things for coop
	this.playerNumber = playerNumber;
	this.gamepadID = 0;
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
		characterSelectScreen.assignSpriteSheets(playerNumber);
		this.leftSprite.loaded = true;
		this.rightSprite.loaded = true;
		this.sprite = this.rightSprite;
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true; // FIXME: this is a lie!!!
		if(this.playerNumber == 0) {
			this.gamepadID = 0;
		}
		else if(this.playerNumber == 1) {
			this.x = 960 - this.sprite.width;
			this.gamepadID = 1;
		}
		else if(this.playerNumber == 2){
			this.y = 650;
		}
		else if(this.playerNumber == 3){
			this.y = 650;
			this.x = 960 - this.sprite.width;
		}
	}

	this.update = function(){
		//translate inputs to players
		if(this.playerNumber == 0)
		{
			this.moveRight = moveRight0;
			this.moveLeft = moveLeft0;
			this.moveUp = moveUp0;
			this.moveDown = moveDown0;
		}
		
		if(this.playerNumber == 1)
		{
			this.moveRight = moveRight1;
			this.moveLeft = moveLeft1;
			this.moveUp = moveUp1;
			this.moveDown = moveDown1;
		}
		if(this.playerNumber == 2)
		{
			this.moveRight = moveRight2;
			this.moveLeft = moveLeft2;
			this.moveUp = moveUp2;
			this.moveDown = moveDown2;
		}
		if(this.playerNumber == 3)
		{
			this.moveRight = moveRight3;
			this.moveLeft = moveLeft3;
			this.moveUp = moveUp3;
			this.moveDown = moveDown3;
		}

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
		if(gamepads.length > 0 && gamepads[this.gamepadID] && gamepads[this.gamepadID].buttons!=undefined){
			
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

        if(this.immunityTimer > 0){
        	this.immunityTimer--;
        }else{
        	this.immunity = false;
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
		canvasContext.fillStyle = '#fe4101';
		canvasContext.font = '14px "Press Start 2P"'
		canvasContext.fillText(this.ducketsCarried, this.x+11,this.y);

		canvasContext.fillStyle = 'black';
		canvasContext.font = '14px "Press Start 2P"'
		canvasContext.fillText(this.ducketsCarried, this.x+10,this.y-1);
		
		animate(this,true);
		
	}

	this.kill = function(){
		this.dead = true;
	}

}

function bouncePlayersOffEachOther() {
    
    const STR = 4; // speed * this = bounce dist

    var p1,p2;
    for(let i = 0; i < playerArray.length; i++) {
        
        p1 = playerArray[i];
        
        for(let j = 0; j < playerArray.length; j++) {
        
            p2 = playerArray[j];
            
            // reasons to not bounce
            if (i==j || p1.immunity || p1.dead || p2.immunity || p2.dead) {
                continue; // skip the check below
            }

            // allowed to bounce together! let's check
            if (checkCollision(p1,p2)) {

                console.log('player'+i+' bumped into player'+j);

                screenShouldBeShaking = true;
                setTimeout(function(){screenShouldBeShaking = false},1);
                
                if (SHARE_DUCKETS_IF_IN_NEED) {
                    if (p1.ducketsCarried>1 && p2.ducketsCarried==0) {
                        p1.ducketsCarried--;
                        p2.ducketsCarried++;
                        console.log('player'+i+' gave one ducket to player'+j);
                    }
                    else if (p2.ducketsCarried>1 && p1.ducketsCarried==0) {
                        p2.ducketsCarried--;
                        p1.ducketsCarried++;
                        console.log('player'+j+' gave one ducket to player'+i);
                    }
                }

                // change dir
                p1.speedX *= -STR;
                p1.speedY *= -STR;
                p2.speedX *= -STR;
                p2.speedY *= -STR;

                /* etc?
                if (p1.sprite === p1.rightSprite)
                {
                    p1.sprite = p1.leftSprite;
                }
                else if (p1.sprite === p1.leftSprite)
                {
                    this.sprite = this.rightSprite;
                }
                */
            
                hitSFX.play();

            } // collided
        } // j
    } // i
}

