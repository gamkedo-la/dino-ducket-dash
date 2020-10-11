function enemyClass(){
	this.x = 100;
	this.y = 100;
	this.width = 20;
	this.height = 20;
	this.speedX; 
	this.speedY; 
	//WARM UP: how many duckets does the player lose when hit by this enemy?

	// Animation Variables
	//WARM UP: Need an enemy spritesheet with two animations (idle, walking) Trello card - https://trello.com/c/wBKqdxs8
	this.sprite = new Image();
	this.animColumns = 5;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.init = function(atX,atY){
		//this.sprite.src = 'images/enemy_run.png';
		this.sprite.src = 'images/pterodactyl_sprite_facing_left.png';
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
		let randomSpeedX = randomIntFromInterval(3,8);
		// let randomX = randomIntFromInterval(0,canvas.width);
		// let randomY = randomIntFromInterval(0,canvas.height);
		this.speedX = randomSpeedX;
		this.speedY = 11 - randomSpeedX;
		this.x = atX;
		this.y = atY;
		while((Math.abs(player.x - this.x) < this.frameWidth) && (Math.abs(player.y - this.x < this.frameHeight))) {
			this.x = randomIntFromInterval(0,canvas.width);
			this.y = randomIntFromInterval(0,canvas.height);
		}
	}

	this.update = function(){
		var oldX = this.x;
		var oldY = this.y;

		//WARM UP: Does the enemy make a sound when hitting the edges of the canvas?
		if(this.x < 0){
			this.speedX *= -1;
			this.sprite.src = 'images/pterodactyl_sprite_facing_right.png';
		}
		if(this.x > canvas.width - this.width*PIXEL_SCALE_UP){
			this.speedX *= -1;
			this.sprite.src = 'images/pterodactyl_sprite_facing_left.png';
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
			
			if (this.sprite.src === 'images/pterodactyl_sprite_facing_right.png')
			{
				this.sprite.src = 'images/pterodactyl_sprite_facing_left.png';
			}
			else if (this.sprite.src = 'images/pterodactyl_sprite_facing_left.png')
			{
				this.sprite.src = 'images/pterodactyl_sprite_facing_right.png';
			}
			
			hitSFX.play();

			if(player.ducketsCarried <= 0){
                decals.deathSplatter(this.x,this.y+50); // pile of bones!
				gameState = 'gameOver';
			} else{
				player.ducketsCarried = 0;
			}
		}

		this.x += this.speedX;
		this.y += this.speedY;

	}

	this.draw = function(){
		// drawRect(this.x,this.y, this.width,this.height, 'white');
		animate(this);
	}
}
