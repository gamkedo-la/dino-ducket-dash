const DUCKET_WIDTH = 16;
const DUCKET_HEIGHT = 16;

function ducketClass(){
  //Coin Variables
	this.x = 8;
	this.y = 8;
	this.width = DUCKET_WIDTH;
	this.height = DUCKET_HEIGHT;
	this.speed = 5;

	// Animation Variables
	this.sprite = new Image();
	this.animColumns = 6;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 5;
	this.currentAnimationFrameDelay = 5;
	this.flipped = true;
	this.readyToRemove = false;

	this.initCoin = function(){
        // console.log(this.x+"/"+this.y);
        this.sprite.src = 'images/ducket.png';
        this.frameWidth = this.sprite.width / this.animColumns;
        this.frameHeight = this.sprite.height / this.animRows;
        this.sprite.loaded = true; 
				
				//Never spawn coin under MoneyBucket
				while(checkCollision(this,moneyBucket)) {
					this.x = randomIntFromInterval(0,canvas.width);
					this.y = randomIntFromInterval(0,canvas.height);
					
					while(checkCollision(this,player)) {
						this.x = randomIntFromInterval(0,canvas.width);
						this.y = randomIntFromInterval(0,canvas.height);
					}
				}
	}

  this.update = function(){

  }

  this.draw = function(){
		if(checkCollision(this,player)){
			coinPickUpSFX.play();
			this.readyToRemove = true;
			player.ducketsCarried++
		} else{
			animate(this);
		}
  }
}
