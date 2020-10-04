const FPS = 60;
const ANIMATION_DELAY = 10;
const PIXEL_SCALE_UP = 3;

var canvas;
var canvasContext;

var player;
var enemies = [];
var ducketList = [];
var menuSprite;
var moneyBucket;
var gameState = "menu";
var score;
var menuUI;

//WARM UP: Looking for a good place to add a comment as a practice commit?
//How about on the next line?

//WARM UP: May want to move this list to another file because it will probably get very long
var allImages = ['images/ducket.png','images/enemy_run.png','images/menu_title.png','images/player_idle.png'];
var imagesDownloaded = 0;

window.onload = function(){
	// Check for game controller plugged in
	window.addEventListener("gamepadconnected", (evt)=>{
		console.log("gamepad connected");
	});
	window.addEventListener("gamepaddisconnected", (evt)=>{
		console.log("gamepad disconnected");
	});
	
  console.log("Initializing game. Downloading "+allImages.length+" sprites.");
  for (var i=0; i<allImages.length; i++) {
      var nextone = new Image();
      nextone.src = allImages[i];
      
      // bugfix: this would run the function NOW, not when the image has loaded
      // nextone.onload = startgameIfDownloadsComplete();
      
      // instead, we want a reference to the function we want run later on
      nextone.onload = startgameIfDownloadsComplete;
  }

}

function startgameIfDownloadsComplete() {
    console.log(allImages[imagesDownloaded]+" downloaded ok.")
    imagesDownloaded++;
    if (imagesDownloaded>=allImages.length) {
        console.log("All "+imagesDownloaded+" downloads complete! Starting game.");
        init();
    }
}

function init(){
    //WARM UP: can we listen to the "resize" event and resize the canvas while
    //maintaining the aspect ratio?
	canvas = document.getElementById('gameCanvas');
    //WARM UP: round these values to the nearest integer to ensure crisp pixels
	canvas.width = PIXEL_SCALE_UP * canvas.width;
	canvas.height = PIXEL_SCALE_UP * canvas.height;
	
	canvasContext = canvas.getContext('2d');
	
	//let's keep those pixels crisp
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msImageSmoothingEnabled = false;
	canvasContext.font = "Press Start 2P";
	
	menuUI = document.getElementById('allmenu');
	
	initInput();
	menuInit();

	console.log("Initialization complete. Running game!");

  setInterval(update,1000/FPS);

}

function update(){
	switch (gameState) {
		case 'menu': 
			menuUpdate(); 
			break;
		case 'game': 
			menuUI.style.display = 'none';
			gameUpdate();
			break;
		case 'gameOver': 
			gameOverUpdate();
			break;
	}	

	draw();
}

function spawnCoins(){
	for (var i = 0; i < 20; i++) {
		//WARM UP: limit ducket positioning so all of them are 100% on screen
		var ducket = new ducketClass();
		ducket.x = Math.floor(Math.random()*canvas.width);
		ducket.y = Math.floor(Math.random()*canvas.height);
		ducket.initCoin();
		ducketList.push(ducket);
	}
}

function spawnEnemy(){
	var enemy = new enemyClass();
	enemy.init();
	enemies.push(enemy);
}

function checkIfCoinsNeedToRespawn(){
	if(ducketList.length == 0 && player.ducketsCarried == 0){
		spawnCoins();
	}
}

function draw(){
	cls();
	
	switch (gameState) {
		case 'menu': 
			menuDraw();
			break;
		case 'game': 
			gameDraw();
			break;
		case 'gameOver': 
			gameOverDraw();
			break;
	}	
	
}

function randomIntFromInterval(min,max){ // min and max included
	min = Math.ceil(min);
	max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)) + min;
}
