var surpriseBoxes = [];
var surpriseTexts = [];

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
	for(let i = 0; i < playerArray.length; i++)
	{
		if(checkCollision(this,playerArray[i]) && !playerArray[i].dead){
				powerup01.play();
				gameSeconds += 20;
				this.chooseSurpriseAndImplementIt();
				this.readyToRemove = true;
				break;
		}
	}
  }

  this.eliminateHalfTheEnemies = function()
  {
  	for (let i = 0; i < enemies.length/2; i++){
		enemies.splice(0,1);
		surpriseTexts.push(new surpriseBoxTextClass(this.x,this.y,"ENEMIES DESTROYED!"));
	}
  }

  this.spawnExtraCoins = function(){
  	for (var i = 0; i < DUCKETS_PER_LEVEL/2; i++) {
		var ducket = new ducketClass();
		ducket.initCoin();
		ducketList.push(ducket);
		surpriseTexts.push(new surpriseBoxTextClass(this.x,this.y,"EXTRA COINS!"));
	}
  }

  this.doubleDucketsCarried = function()
  {
	for(let i = 0; i < playerArray.length; i++)
	{
		playerArray[i].ducketsCarried += playerArray[i].ducketsCarried;
		surpriseTexts.push(new surpriseBoxTextClass(this.x,this.y,"DOUBLE DUCKETS!"));
	}
  }

  this.chooseSurpriseAndImplementIt = function()
  {
	  let coinFlip = Math.random();
  	if (coinFlip < 0.5)
  	{
  		this.eliminateHalfTheEnemies();
  	}
  	else if(coinFlip > 0.5 && coinFlip < 0.8)
  	{
  		this.spawnExtraCoins();
	}
	  else if(coinFlip > 0.8)
  	{
  		this.doubleDucketsCarried();
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

function surpriseBoxTextClass(atX,atY,text){
	this.x = atX;
	this.y = atY;
	this.speed = 5;
	this.text = text;
	this.readyToRemove = false;

	this.update = function(){
		this.y -= this.speed;
		if(this.y < 0){
			this.readyToRemove = true;
		}
	}

	this.draw = function(){
		colorTextShadow(this.text, this.x, this.y, fillColor="white", font = "Press Start 2P", align="left");
	}

}
