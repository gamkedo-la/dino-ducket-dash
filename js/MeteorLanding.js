var meteorLandings = [];

function meteorLandingClass(){
	this.x;
	this.y;
	this.height = 32;
	this.width = 32;
	this.animColumns = 1;
	this.animRows = 6;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 10;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;

	this.sprite;

	this.init = function(atX, atY){
		this.x = atX;
		this.y = atY;
		this.sprite = images.meteorshadow;
		this.frameWidth = 32;
		this.frameHeight = 32;
		this.sprite.loaded = true;
	}

	this.update = function(){

		for(var i = 0; i < meteors.length; i++){
			if(checkCollides(this, meteors[i])){
				//if meteor lands
				if(meteors[i].landLocationX == this.x && meteors[i].landLocationY == this.y){
					
					for(var j = 0; j < playerArray.length; j++){

						if(checkCollision(this, playerArray[i])){
							
							if(playerArray[i].ducketsCarried <= 0){
								decals.deathSplatter(this.x,this.y+50); // pile of bones!
								playerArray[i].kill();
								//gameState = 'gameOver';
							} else{
								playerArray[i].ducketsCarried = 0;
								playerArray[i].immunityTimer = 30;
								playerArray[i].immunity = true;
							}
						}
					}

					//meteor kills enemies
					for(var k = 0; k < enemies.length; k++){
						if(checkCollision(this, enemies[k])){
							enemies.splice(k);
						}
					}


					for(var k = 0; k < triceratopEnemies.length; k++){
						if(checkCollision(this, triceratopEnemies[k])){
							triceratopEnemies.splice(k);
						}
					}

					meteors.splice(i); // remove meteor

				}
			}
		}

	}

	this.draw = function(){
		animateFrameToFrame(this,false,1,6);
	}
}

function spawnMeteorLanding(atX, atY){
		var landing = new meteorLandingClass();
		landing.init(atX, atY);
		meteorLandings.push(landing);
}

function checkCollides(sprite1,sprite2){
  if(sprite1.x < sprite2.x - 65 + sprite2.width*PIXEL_SCALE_UP &&
    sprite1.x + sprite1.width*PIXEL_SCALE_UP > sprite2.x &&
    sprite1.y < sprite2.y - 65 + sprite2.height*PIXEL_SCALE_UP &&
    sprite1.y + sprite1.height*PIXEL_SCALE_UP > sprite2.y){
      return true;
  } else{
    return false;
  }
}

