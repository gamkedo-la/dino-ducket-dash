var surpriseBoxes = [];

function surpriseBoxClass(){
  //Coin Variables
	this.x = 8;
	this.y = 8;
	this.width = 16;
	this.height = 16;
	this.speed = 5;

	// Animation Variables
	this.sprite = {};
	this.animColumns = 1;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 5;
	this.currentAnimationFrameDelay = 5;
	this.flipped = true;
	this.readyToRemove = false;

	this.init = function(atX,atY){
    this.x = atX;
    this.y= atY;
    this.sprite = images.SupriseBox;
		this.sprite.loaded = true;
    this.frameWidth = this.sprite.width / this.animColumns;
    this.frameHeight = this.sprite.height / this.animRows;
	}

  this.update = function(){
    if(checkCollision(this,player)){
			coinPickUpSFX.play();
			this.readyToRemove = true;
		}
  }

  this.draw = function(){
	   animate(this,true);
  }

}

function spawnSurpriseBox(atX,atY){
	var surpriseBox = new surpriseBoxClass();
	surpriseBox.init(atX,atY);
  surpriseBoxes.push(surpriseBox);
}
