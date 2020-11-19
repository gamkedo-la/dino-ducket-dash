var meteors = [];

function meteorClass(){
	this.landLocationX;
	this.landLocationY;

	this.x;
	this.y;
	this.height = 32;
	this.width = 32;
	this.speedX;
	this.speedY;
	this.speedFactor = .01;
	this.animColumns = 1;
	this.animRows = 3;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 2;
	this.currentAnimationFrameDelay = ANIMATION_DELAY;

	this.init = function(toX, toY){
		this.x = toX - 400;
		this.y = toY - 400;
		this.landLocationX = toX;
		this.landLocationY = toY;
		this.sprite = images.meteor;
		this.frameHeight = 32;
		this.frameWidth = 32;
		this.sprite.loaded = true;
	}

	this.update = function(){

		this.speedX = 5;
		this.speedY = 5;

		//var oldX = this.x;
        //var oldY = this.y;

        this.x += this.speedX;
		this.y += this.speedY;

	}

	this.draw = function(){
		animateFrameToFrame(this,true,1,3);
	}




}

//spawns meteor that will land @(toX, toY)
function spawnMeteor(toX, toY){
	var meteor = new meteorClass();
	meteor.init(toX, toY); //create meteor up and to the left of landing zone
	meteors.push(meteor);

	var landing = new meteorLandingClass();
	landing.init(toX, toY);
	meteorLandings.push(landing);

}

var meteorInterval = 0;

function meteorShower(){
	if(meteorInterval == 0){
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height;

		spawnMeteor(x,y);
	}
	meteorInterval++;
	if(meteorInterval >= 120){
		meteorInterval = 0;
	}
}