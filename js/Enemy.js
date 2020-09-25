

function enemyClass(){
	this.x = 100;
	this.y = 100;
	this.width = 20;
	this.height = 20;
	this.speedX = 4;
	this.speedY = 8;

	// Animation Variables
	this.sprite = new Image();
	this.animColumns = 5;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.init = function(){
		this.sprite.src = 'images/enemy_run.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
	}

	this.update = function(){
		var oldX = this.x;
		var oldY = this.y;

		if(this.x < 0){
			this.speedX *= -1;
		}
		if(this.x > canvas.width - this.width*PIXEL_SCALE_UP){
			this.speedX *= -1;
		}
		if(this.y < 0){
			this.speedY *= -1;
		}
		if(this.y > canvas.height - this.height*PIXEL_SCALE_UP){
			this.speedY *= -1;
		}

		if(checkCollision(this,player)){
			this.x = oldX;
			this.y = oldY;
			this.speedX *= -1;
			this.speedY *= -1;
		}

		this.x += this.speedX;
		this.y += this.speedY;



	}

	this.draw = function(){
		// drawRect(this.x,this.y, this.width,this.height, 'white');
		animate(this);
	}
}
