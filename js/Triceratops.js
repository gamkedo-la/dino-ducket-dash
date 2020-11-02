var triceratopEnemies = [];

const TRI_MOVE_SPEED = 3; // px per frame, was 6 but it felt too fast
const TRI_CHARGE_TIMESPAN = 120; // max frames to charge at player 
const TRI_DIR_CHANGE_TIMESPAN = 60; // frames per dir change, was 30 
const TRI_DETECTION_DISTANCE = 350; // was 200 but it was so close
const TRI_CHARGE_COOLDOWN_TIME = 120; // was 100

function triceratopsClass(){
	this.x = 100;
	this.y = 100;
	this.width = ENEMY_WIDTH;
	this.height = ENEMY_HEIGHT;

	this.speedX; 
	this.speedY; 
	this.aggressionFactor=0.05;
	this.pathTiming;
	this.detectionDistance; //How far the triceratops can detect player for charge
	this.charging;
	this.COOLDOWN_TIME = TRI_CHARGE_COOLDOWN_TIME;
	this.chargeCooldown = this.COOLDOWN_TIME;
	//WARM UP: how many duckets does the player lose when hit by this enemy?

	// Animation Variables
	//WARM UP: Need an enemy spritesheet with two animations (idle, walking) Trello card - https://trello.com/c/wBKqdxs8
	this.leftSprite;
	this.rightSprite;
	this.sprite;
	this.animColumns = 5;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.init = function(atX,atY){
		
		this.rightSprite = images.triceratops_sprite_facing_right;
		this.rightSprite.loaded = true;
		this.leftSprite = images.triceratops_sprite_facing_left;
		this.leftSprite.loaded = true;

		this.sprite = this.rightSprite;
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;

		// let randomX = randomIntFromInterval(0,canvas.width);
		// let randomY = randomIntFromInterval(0,canvas.height);
		
		this.x = atX;
		this.y = atY;
		this.pathTiming = 0;
		this.charging = false;
		this.detectionDistance = TRI_DETECTION_DISTANCE;

		while((Math.abs(playerArray[0].x - this.x) < this.frameWidth) && (Math.abs(playerArray[0].y - this.x < this.frameHeight))) {
			console.log("whatsmy point")
			this.x = randomIntFromInterval(0,canvas.width);
			this.y = randomIntFromInterval(0,canvas.height);
		}
	}

	this.moveUp = function(){
		this.speedY = TRI_MOVE_SPEED;
		this.speedX = 0;
	}

	this.moveDown = function(){
		this.speedY = -TRI_MOVE_SPEED;
		this.speedX = 0;
	}

	this.moveLeft = function(){
		this.speedX = -TRI_MOVE_SPEED;
		this.speedY = 0;
	}

	this.moveRight = function(){
		this.speedX = TRI_MOVE_SPEED;
		this.speedY = 0;
	}
	//checks detection for charge
	this.checkDetection = function(sprite1){
  		if(sprite1.x + sprite1.width*PIXEL_SCALE_UP > this.x - this.detectionDistance && 
  			sprite1.y + sprite1.height*PIXEL_SCALE_UP > this.y - this.detectionDistance &&
  			sprite1.x < this.x + this.detectionDistance &&
  			sprite1.y < this.y + this.detectionDistance){
			return true;
			  
  		}
  		else{
  			return false;
  		}
  	}

  	this.chargeAt = function(sprite1){
        console.log("triceratops is charging!");
  		this.speedX = (sprite1.x - this.x) * this.aggressionFactor;
  		this.speedY = (sprite1.y - this.y) * this.aggressionFactor;	  
		this.charging = true;
		this.pathTiming = 0;
		  
  	}

	this.update = function(){
		
		var oldX = this.x;
        var oldY = this.y;
        
		if(!this.charging) this.chargeCooldown--;
        
        // reset movement loop timer
        if(this.pathTiming >= TRI_DIR_CHANGE_TIMESPAN*4 && !this.charging){
			this.pathTiming = 0;
        }
        
		this.pathTiming++;

        // move times are evenly split - FIXME? randomize?
        if(this.pathTiming <= TRI_DIR_CHANGE_TIMESPAN && !this.charging){
			this.moveUp();
		}
		if(this.pathTiming > TRI_DIR_CHANGE_TIMESPAN && this.pathTiming <= TRI_DIR_CHANGE_TIMESPAN*2 && !this.charging){
			this.sprite = this.rightSprite;
			this.moveRight();
		}
		if(this.pathTiming > TRI_DIR_CHANGE_TIMESPAN*2 && this.pathTiming<= TRI_DIR_CHANGE_TIMESPAN*3 && !this.charging){
			this.moveDown();
		}
		if(this.pathTiming > TRI_DIR_CHANGE_TIMESPAN*3 && !this.charging){
			this.sprite = this.leftSprite;
			this.moveLeft();
        }
        
		if(this.charging && this.pathTiming >= TRI_CHARGE_TIMESPAN){
            console.log("Triceratops finished charging, resetting.")
			this.resetCharging();
			// this.charging = false;
			this.sprite = this.leftSprite;
			this.pathTiming = 0;
			this.moveLeft();
		}

		//WARM UP: Does the enemy make a sound when hitting the edges of the canvas?
		if(this.x < 0){
			this.resetCharging();
			// this.charging = false;
			this.moveRight();
			this.sprite = this.rightSprite;
		}
		if(this.x > canvas.width - this.width*PIXEL_SCALE_UP){
			this.resetCharging();
			// this.charging = false;
			this.moveLeft();
			this.sprite = this.leftSprite;
		}
		if(this.y < this.height/2){
			this.resetCharging();
			// this.charging = false;
			this.moveUp();
		}
		if(this.y > canvas.height - this.height*PIXEL_SCALE_UP*1.5){
			this.resetCharging();
			// this.charging = false;
			this.moveDown();
		}

		for(let i = 0; i < playerArray.length; i++)
		{
			if(this.checkDetection(playerArray[i]) && !this.charging && this.chargeCooldown <= 0){
				this.chargeAt(playerArray[i]);
			}

			if(checkCollision(this,playerArray[i]) && !godMode && !playerArray[i].immunity && !playerArray[i].dead){
				screenShouldBeShaking = true;
				setTimeout(function(){screenShouldBeShaking = false},100);

				this.x = oldX;
				this.y = oldY;
				
				
				hitSFX.play();

				if(playerArray[i].ducketsCarried <= 0){
					decals.deathSplatter(this.x,this.y+50); // pile of bones!
					playerArray[i].kill();
					//gameState = 'gameOver';
				} else{
					playerArray[i].ducketsCarried = 0;
					playerArray[i].immunityTimer = 30;
					playerArray[i].immunity = true;
				}
			}// end of collision check with player
		}

		this.x += this.speedX;
		this.y += this.speedY;

	}

	this.resetCharging = function(){
		this.charging = false;
		this.chargeCooldown = this.COOLDOWN_TIME;
	}
	

	this.draw = function(){
		//drawRect(this.x,this.y, this.width,this.height, 'white');
		

		if (this.charging)
		{
			animateFrameToFrame(this,true,3,5);
		}else
		{
			animateFrameToFrame(this,true,1,2);
		}

	}
	
}

function spawnTriceratops(atX,atY){
	var enemy = new triceratopsClass();
	enemy.init(atX,atY);
	triceratopEnemies.push(enemy);
}
