function enemyTelegraphClass(){
	this.x = 100;
	this.y = 100;
	this.width = 20;
	this.height = 20;
  this.timer = 60;
  this.readyToRemove = false;

	// Animation Variables
	//WARM UP: Need an enemy spritesheet with two animations (idle, walking) Trello card - https://trello.com/c/wBKqdxs8
	this.sprite = {};
	this.animColumns = 5;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.init = function(){
		this.sprite = images.enemy_telegraph;
		this.sprite.loaded = true;
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		
		let randomX = randomIntFromInterval(0,canvas.width-20);
		let randomY = randomIntFromInterval(0,canvas.height-20);
		this.x = randomX;
		this.y = randomY;
		while((Math.abs(player.x - this.x) < this.frameWidth) && (Math.abs(player.y - this.x < this.frameHeight))) {
			this.x = randomIntFromInterval(0,canvas.width);
			this.y = randomIntFromInterval(0,canvas.height);
		}
	}

	this.update = function(){
    if(this.timer > 0){
      this.timer--
    } else{
      spawnEnemy(this.x,this.y);
      this.readyToRemove = true;
    }

	}

	this.draw = function(){
		animate(this);
	}
}
