

function enemyClass(){
	this.x = 100;
	this.y = 100;
	this.width = 20;
	this.height = 20;
	this.speedX = 2;
	this.speedY = 4;

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
		if(this.x > canvas.width - this.width){
			this.speedX *= -1;
		}
		if(this.y < 0){
			this.speedY *= -1;
		}
		if(this.y > canvas.height - this.height){
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

	this.playerCollision = function(){
		if(this.x < player.x + PLAYER_WIDTH &&
			this.x + this.width > player.x &&
			this.y < player.y + PLAYER_HEIGHT &&
			this.y + this.height > player.y){

			this.speedX *= -1;
			this.speedY *= -1;
		}
	}
}
