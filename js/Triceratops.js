var triceratopEnemies = [];

function triceratopsClass(){
	this.x = 100;
	this.y = 100;
	this.width = ENEMY_WIDTH;
	this.height = ENEMY_HEIGHT;
	this.speedX; 
	this.speedY; 
	this.pathTiming;
	this.detectionDistance; //How far the triceratops can detect player for charge
	this.charging;
	//WARM UP: how many duckets does the player lose when hit by this enemy?

	// Animation Variables
	//WARM UP: Need an enemy spritesheet with two animations (idle, walking) Trello card - https://trello.com/c/wBKqdxs8
	//this.leftSprite;
	//this.rightSprite;
	this.sprite;
	//this.animColumns = 5;
	//this.animRows = 1;
	//this.frameWidth;
	//this.frameHeight;
	//this.currentFrame = 0;
	//this.animationFrameDelay = ANIMATION_DELAY;
	//this.currentAnimationFrameDelay = ANIMATION_DELAY;
	//this.flipped = true;

	this.init = function(atX,atY){
		
		//this.sprite = images.triceratops;
		//this.sprite.loaded = true;
		// let randomX = randomIntFromInterval(0,canvas.width);
		// let randomY = randomIntFromInterval(0,canvas.height);
		
		this.x = atX;
		this.y = atY;
		this.pathTiming = 0;
		this.charging = false;
		this.detectionDistance = 200;
		while((Math.abs(playerArray[0].x - this.x) < this.frameWidth) && (Math.abs(playerArray[0].y - this.x < this.frameHeight))) {
			console.log("whatsmy point")
			this.x = randomIntFromInterval(0,canvas.width);
			this.y = randomIntFromInterval(0,canvas.height);
		}
	}

	this.moveUp = function(){
		this.speedY = 6;
		this.speedX = 0;
	}

	this.moveDown = function(){
		this.speedY = -6;
		this.speedX = 0;
	}

	this.moveLeft = function(){
		this.speedX = -6;
		this.speedY = 0;
	}

	this.moveRight = function(){
		this.speedX = 6;
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
  		this.speedX = (sprite1.x - this.x) / 10;
  		this.speedY = (sprite1.y - this.y) / 10;
  		this.charging = true;
  		this.pathTiming = 0;
  	}

	this.update = function(){
		var oldX = this.x;
		var oldY = this.y;
		if(this.pathTiming >= 60 && !this.charging){
			this.pathTiming = 0;
		}
		this.pathTiming++;

		if(this.pathTiming <= 15 && !this.charging){
			this.moveUp();
		}
		if(this.pathTiming > 15 && this.pathTiming <= 30 && !this.charging){
			this.moveRight();
		}
		if(this.pathTiming > 30 && this.pathTiming<= 45 && !this.charging){
			this.moveDown();
		}
		if(this.pathTiming > 45 && !this.charging){
			this.moveLeft();
		}
		if(this.charging && this.pathTiming >= 120){
			this.charging = false;
			this.pathTiming = 0;
			this.moveLeft();
		}

		//WARM UP: Does the enemy make a sound when hitting the edges of the canvas?
		if(this.x < 0){
			this.charging = false;
			this.moveRight();
			//this.sprite = this.rightSprite;
		}
		if(this.x > canvas.width - this.width*PIXEL_SCALE_UP){
			this.charging = false;
			this.moveLeft();
		}
		if(this.y < this.height/2){
			this.charging = false;
			this.moveUp();
		}
		if(this.y > canvas.height - this.height*PIXEL_SCALE_UP*1.5){
			this.charging = false;
			this.moveDown();
		}

		for(let i = 0; i < playerArray.length; i++)
		{
			if(this.checkDetection(playerArray[i]) && !this.charging){
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

	this.draw = function(){
		drawRect(this.x,this.y, this.width,this.height, 'white');
		//animate(this,true);

	}
}

function spawnTriceratops(atX,atY){
	var enemy = new triceratopsClass();
	enemy.init(atX,atY);
	triceratopEnemies.push(enemy);
}
