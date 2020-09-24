function coinClass(){
  //Coin Variables
	this.x = 8;
	this.y = 8;
	this.width = 16;
	this.height = 16;
	this.speed = 5;

	// Animation Variables
	this.sprite = new Image();
	this.animColumns = 4;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;
	this.readyToRemove = false;

	this.initCoin = function(){
		// console.log(this.x+"/"+this.y);
		this.sprite.src = 'images/coin.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
	}

  this.update = function(){

  }

  this.draw = function(){
		if(checkCollision(this,player)){
			this.readyToRemove = true;
			player.coinsCarried++
		} else{
			animate(this);
		}

  }
}
