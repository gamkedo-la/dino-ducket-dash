function playerClass(){
	//Player Variables
	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	this.speed = 10;
	this.coinsCarried = 0;

	// Animation Variables
	//WARM UP: Need a Player Sprite sheet with three animations (idle, moving, hurt) - Trello card: https://trello.com/c/OpkypkYK
	this.sprite = new Image();
	this.animColumns = 5;
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
	}

	this.update = function(){
		//console.log(this.x+"/"+this.y);
		if(moveRight){
			if(this.x < canvas.width - this.width*PIXEL_SCALE_UP){
				this.x += (this.speed);
			}
		}
		if(moveLeft){
			if(this.x > 0){
				this.x -= (this.speed);
			}
		}
		if(moveUp){
			if(this.y > 0){
				this.y -= (this.speed);
			}
		}
		if(moveDown){
			if(this.y < canvas.height-this.height*PIXEL_SCALE_UP){
				this.y += (this.speed);
			}
		}

		//WARM UP: Check for collision with the enemy (see the enemy class for an example)
		//WARM UP: if player hit by enemy, lose some/all duckets carried (maybe depends on which enemy?) Trell card - https://trello.com/c/KkRCpNMk
		//WARM UP: if player hit by enemy, need hurt SFX
		//WARM UP: if player hit by enemy, transition to hurt animation (once there is one)
		//WARM UP: if player hit by enemy, screen shake? Trello card - https://trello.com/c/UQpCL4pt
	}

	this.draw = function(){
		//drawRect(this.x,this.y, this.sprite.width,this.sprite.height, 'white');
		canvasContext.fillStyle = 'black';
		canvasContext.font = '12px "Press2Start"'
		canvasContext.fillText(this.coinsCarried, this.x+10,this.y-2);
		animate(this);
	}
}
