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
	this.sprite = {};
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
		this.sprite = images.ducket;
		this.sprite.loaded = true;
        this.frameWidth = this.sprite.width / this.animColumns;
        this.frameHeight = this.sprite.height / this.animRows;
                
        this.x=this.y=0; // reset so we never skip doing both checks below

		//Never spawn coin under MoneyBucket
		//WARM UP: Do we also need to make sure coins don't spawn on top of other coins?
		while(!this.x||!this.y||checkCollision(this,moneyBucket)) {

            // choose a location that is on screen
            this.x = getRandomIntInclusive(DUCKET_WIDTH*3,canvas.width-DUCKET_WIDTH*3);
            this.y = getRandomIntInclusive(DUCKET_HEIGHT*3,canvas.height-DUCKET_HEIGHT*3);
                
			for(let i = 0; i < playerArray.length; i++)
			{
				while(checkCollision(this,playerArray[i])) {
					this.x = randomIntFromInterval(0,canvas.width);
					this.y = randomIntFromInterval(0,canvas.height);
				}
			}
		}
	}

  this.update = function(){
	for(let i = 0; i < playerArray.length; i++)
	{
		if(checkCollision(this,playerArray[i]) && !playerArray[i].dead){
			coinPickUpSFX.play();
			this.readyToRemove = true;
			playerArray[i].ducketsCarried++;
			console.log("Player is now carrying "+playerArray[i].ducketsCarried+" duckets.");

            let ducketParticlesInstance = new DucketParticlesInstance(this);
			ducketParticlesInstance.init();
			ducketParticlesManager.arrayOfParticleInstances.push(ducketParticlesInstance);
		}
	}
  }

  this.draw = function(){
	if(!this.readyToRemove)
	{
		animate(this,true);
	}
  }
}

function DucketParticlesInstance(ducket)
{
	this.sprite = images.enemy_run;
	this.arrayOfParticles = [];
	this.width = 10;
	this.height = 10;

	this.currentAlpha = 1;

	this.init = function()
	{
		for (let i = 0; i < 8; i++)
		{
			let ducketParticle = {x: ducket.x + ducket.width/2 - this.width/2, y: ducket.y + ducket.height/2 - this.height/2};
			this.arrayOfParticles.push(ducketParticle);
		}
	}

	this.draw = function()
	{
		if (this.arrayOfParticles.length !== 0)
		{
			canvasContext.globalAlpha = this.currentAlpha;
			for (let i = 0; i < this.arrayOfParticles.length; i++)
			{
				canvasContext.drawImage(this.sprite, this.arrayOfParticles[i].x,this.arrayOfParticles[i].y, this.width,this.height);
			}
			canvasContext.globalAlpha = 1;
		}
	}

	this.update = function()
	{
		if (this.arrayOfParticles.length !== 0)
		{
				//1st one goes up
			this.arrayOfParticles[0].y -= 1.5;
			// //2nd one goes up right
			this.arrayOfParticles[1].x += 1.5;
			this.arrayOfParticles[1].y -= 1.5;
			// //3rd one goes right
			this.arrayOfParticles[2].x += 1.5;
			// //4th one goes down right
			this.arrayOfParticles[3].x += 1.5;
			this.arrayOfParticles[3].y += 1.5;
			// //5th one goes down
			this.arrayOfParticles[4].y += 1.5;
			// //6th one goes down left
			this.arrayOfParticles[5].x -= 1.5;
			this.arrayOfParticles[5].y += 1.5;
			// //7th one goes left
			this.arrayOfParticles[6].x -= 1.5;
			// //8th one goes up left
			this.arrayOfParticles[7].x -= 1.5;
			this.arrayOfParticles[7].y -= 1.5;
			
			this.currentAlpha -= 0.05;

			if (this.currentAlpha < 0.05)
			{
				this.arrayOfParticles = [];
			}
		}
	}
}

function DucketParticlesManager()
{
	this.arrayOfParticleInstances = [];

	this.init = function()
	{
		this.arrayOfParticleInstances = [];
	}

	this.updateParticleInstances = function()
	{
		for (let i = 0; i < this.arrayOfParticleInstances.length; i++)
		{
			this.arrayOfParticleInstances[i].update();
			if (this.arrayOfParticleInstances[i].arrayOfParticles.length === 0)
			{
				this.arrayOfParticleInstances.splice(i,1);
			}
		}
	}

	this.drawParticleInstances = function()
	{
		for (let i = 0; i < this.arrayOfParticleInstances.length; i++)
		{
			this.arrayOfParticleInstances[i].draw();
		}
	}
}

function spawnCoins(){
	ducketList = [];
	for (var i = 0; i < 20; i++) {
		var ducket = new ducketClass();
		ducket.initCoin();
		ducketList.push(ducket);
	}
}

function checkIfCoinsNeedToRespawn(){
	let counter = 0;
	for(let i = 0; i < playerArray.length; i++)
	{
		if(ducketList.length == 0 && playerArray[i].ducketsCarried == 0){
			counter++;
		}
	}
	if(counter == playerArray.length){
		spawnCoins();
	}
}
