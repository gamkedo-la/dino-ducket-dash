function animUIClass(){
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;
  this.timer = 60;
  this.visible = true;
	this.sprite = new Image();
	this.animColumns = 9;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 3;
	this.currentAnimationFrameDelay = 3;
	this.flipped = true;

	this.init = function(){
		this.sprite.src = 'images/UI_Anim.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
	}

	this.update = function(){
    if(this.currentFrame >= 8){
      this.visible = false;
    }
	}

	this.draw = function(){
		if(this.visible){
			animate(this,false);
		}
	}
}
