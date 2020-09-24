function menuClass(){
  //Menu Variables
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;
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

	this.init = function(){
		this.sprite.src = 'images/menu_title.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
	}
  
  this.draw = function(){
    animate(this);
  }
}
