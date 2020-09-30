function playerClass(){
	//Player Variables
	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	this.speed = 10;
	this.ducketsCarried = 0;

	// Animation Variables
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
	}

	this.draw = function(){
		//drawRect(this.x,this.y, this.sprite.width,this.sprite.height, 'white');
		canvasContext.fillStyle = 'black';
		canvasContext.font = '12px "Press Start 2P"'
		canvasContext.fillText(this.ducketsCarried, this.x+10,this.y-2);
		animate(this);
	}
}
