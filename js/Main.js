const FPS = 60;
const ANIMATION_DELAY = 10;
const PIXEL_SCALE_UP = 3;

var canvas;
var canvasContext;

var player;
var decals;
var enemies = [];
var enemyTelegraphs = [];
var ducketList = [];
var menuSprite;
var moneyBucket;
var gameState = "menu";
var menuUI;
var animUI;

//WARM UP: Looking for a good place to add a comment as a practice commit?
//How about on the next line?

//WARM UP: May want to move this list to another file because it will probably get very long
var allImages = [
	'images/decals.png',
	'images/ducket_particle.png',
	'images/ducket.png',
	'images/enemy_run.png',
	'images/enemy_telegraph.png',
	'images/menu_title.png',
	'images/player_idle_facing_left.png',
	'images/player_idle_facing_right.png',
	'images/pterodactyl_sprite_facing_left.png',
	'images/pterodactyl_sprite_facing_right.png',
	'images/tile-sand-01.png',
	'images/UI_Anim.png'
];
var imagesDownloaded = 0;
var images = {
	decals: {},
	ducket_particle: {},
	ducket: {},
	enemy_run: {},
	enemy_telegraph: {},
	menu_title: {},
	player_idle_facing_left: {},
	player_idle_facing_right: {},
	pterodactyl_sprite_facing_left: {},
	pterodactyl_sprite_facing_right: {},
	tile_sand_01: {},
	UI_Anim: {},
};

window.onload = function(){
	// Check for game controller plugged in
	window.addEventListener("gamepadconnected", (evt)=>{
		console.log("gamepad connected");
	});
	window.addEventListener("gamepaddisconnected", (evt)=>{
		console.log("gamepad disconnected");
	});
	
  console.log("Initializing game. Downloading "+allImages.length+" sprites.");
  const imagesKeys = Object.keys(images);
  for (var i=0; i<allImages.length; i++) {
	  images[imagesKeys[i]] = new Image();
	  images[imagesKeys[i]].onload = startgameIfDownloadsComplete;

      images[imagesKeys[i]].src = allImages[i];      
  }
}

function startgameIfDownloadsComplete() {
	console.log(`${this.src} downloaded ok.`)
    // console.log(allImages[imagesDownloaded]+" downloaded ok.")
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
	
    decals = new decalManager(); // fx on the ground

    menuUI = document.getElementById('allmenu');
	
	initInput();
    menuInit();

	console.log("Initialization complete. Running game!");

  setInterval(update,1000/FPS);

}

function update(){
	switch (gameState) {
		case 'menu': 
			menuUpdate(1000/FPS);
			break;
		case 'game': 
			menuUI.style.display = 'none';
			gameUpdate();
			break;
		case 'gameOver': 
			checkScore();
			gameOverUpdate();
			break;

	}	

	draw();
}

function spawnCoins(){
	ducketList = [];
	for (var i = 0; i < 20; i++) {

		//WARM UP: limit ducket positioning so all of them are 100% on screen
		var ducket = new ducketClass();
		ducket.x = getRandomIntInclusive(DUCKET_WIDTH,canvas.width - DUCKET_WIDTH*2);
		ducket.y = getRandomIntInclusive(DUCKET_HEIGHT,canvas.height - DUCKET_HEIGHT*5);
		ducket.initCoin();
		ducketList.push(ducket);
	}
}

function spawnEnemy(atX,atY){
	var enemy = new enemyClass();
	enemy.init(atX,atY);
	enemies.push(enemy);
}

function spawnEnemyTelegraph(){
	var telegraph = new enemyTelegraphClass();
	telegraph.init();
	enemyTelegraphs.push(telegraph);
}

function checkIfCoinsNeedToRespawn(){
	if(ducketList.length == 0 && player.ducketsCarried == 0){
		spawnCoins();
	}
}

function draw(){
	cls();
	if (debugOn)
	{
		canvasContext.fillStyle = 'blue';
		canvasContext.font = '30px Helvetica';
		canvasContext.fillText('Debug On', 30,canvas.height - 30);
		if (godMode)
		{
			canvasContext.fillText('God Mode On', canvas.width/2,canvas.height - 30);
		}
	}
	
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
