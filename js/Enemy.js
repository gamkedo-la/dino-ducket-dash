const ENEMY_WIDTH = 20;
const ENEMY_HEIGHT = 20;
var enemies = [];

function enemyClass(){
	this.x = 100;
	this.y = 100;
	this.width = ENEMY_WIDTH;
	this.height = ENEMY_HEIGHT;
	this.speedX; 
	this.speedY; 
	//WARM UP: how many duckets does the player lose when hit by this enemy?

	// Animation Variables
	//WARM UP: Need an enemy spritesheet with two animations (idle, walking) Trello card - https://trello.com/c/wBKqdxs8
	this.leftSprite;
	this.rightSprite;
	this.sprite;
	this.animColumns = 5;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = ANIMATION_DELAY;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;
	this.flipped = true;

	this.init = function(atX,atY){
		this.rightSprite = images.pterodactyl_sprite_facing_right;
		this.rightSprite.loaded = true;
		this.leftSprite = images.pterodactyl_sprite_facing_left;
		this.leftSprite.loaded = true;

		let coinFlipForDirection = Math.random();
		if (coinFlipForDirection < 0.5)
		{
			this.sprite = this.rightSprite;
		}
		else
		{
			this.sprite = this.leftSprite;
		}
		
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
		let randomSpeedX = randomIntFromInterval(3,8);
		// let randomX = randomIntFromInterval(0,canvas.width);
		// let randomY = randomIntFromInterval(0,canvas.height);
		this.speedX = randomSpeedX;
		if (coinFlipForDirection >= 0.5)
		{
			this.speedX *= -1;
		}
		this.speedY = 11 - randomSpeedX;
		this.x = atX;
		this.y = atY;
		while((Math.abs(playerArray[0].x - this.x) < this.frameWidth) && (Math.abs(playerArray[0].y - this.x < this.frameHeight))) {
			console.log("whatsmy point")
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
			this.sprite = this.rightSprite;
		}
		if(this.x > canvas.width - this.width*PIXEL_SCALE_UP){
			this.speedX *= -1;
			this.sprite = this.leftSprite;
		}
		if(this.y < this.height/2){
			this.speedY *= -1;
		}
		if(this.y > canvas.height - this.height*PIXEL_SCALE_UP*1.5){
			this.speedY *= -1;
		}

		for(let i = 0; i < playerArray.length; i++)
		{
			if(checkCollision(this,playerArray[i]) && !godMode && !playerArray[i].immunity && !playerArray[i].dead && !playerArray[i].insideDucketBucket){
				screenShouldBeShaking = true;
				damageOverlay=true;
				setTimeout(function(){screenShouldBeShaking = false,damageOverlay=false},100);

				
				this.x = oldX;
				this.y = oldY;
				this.speedX *= -1;
				this.speedY *= -1;
				
				if (this.sprite === this.rightSprite)
				{
					this.sprite = this.leftSprite;
				}
				else if (this.sprite === this.leftSprite)
				{
					this.sprite = this.rightSprite;
				}
				
				hitSFX.play();

				if(playerArray[i].ducketsCarried <= 0){
					decals.deathSplatter(this.x,this.y+50); // pile of bones!
					playerArray[i].kill();
					//gameState = 'gameOver';
				} else{
					playerArray[i].ducketsCarried = 0;
					playerArray[i].immunityTimer = 30;
					playerArray[i].immunity = true;
				}
			}// end of collision check with player
		}

		this.x += this.speedX;
		this.y += this.speedY;

	}

	this.draw = function(){
		// drawRect(this.x,this.y, this.width,this.height, 'white');
		animate(this,true);
	}
}

function spawnEnemy(atX,atY){
	var enemy = new enemyClass();
	enemy.init(atX,atY);
	enemies.push(enemy);
}
