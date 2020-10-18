const FPS = 60;
const ANIMATION_DELAY = 10;
const PIXEL_SCALE_UP = 3;

var canvas;
var canvasContext;
var loadingAndInputToLaunchScreen;

var player;
var decals;
var enemyTelegraphs = [];
var ducketList = [];
var menuSprite;
var moneyBucket;
var gameState = "loading";
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
	
	'images/green_player_idle_facing_left.png',
	'images/green_player_idle_facing_right.png',

	'images/blue_player_idle_facing_left.png',
	'images/blue_player_idle_facing_right.png',

	'images/pinkish_player_idle_facing_left.png',
	'images/pinkish_player_idle_facing_right.png',

	'images/yellow_player_idle_facing_left.png',
	'images/yellow_player_idle_facing_right.png',
	
	'images/pterodactyl_sprite_facing_left.png',
	'images/pterodactyl_sprite_facing_right.png',

	'images/tile-sand-01.png',
	'images/UI_Anim.png',
	'images/SurpriseBox.png'
];
var imagesDownloaded = 0;
var images = {
	decals: {},
	ducket_particle: {},
	ducket: {},
	enemy_run: {},
	enemy_telegraph: {},
	menu_title: {},
	green_player_idle_facing_left: {},
	green_player_idle_facing_right: {},
	blue_player_idle_facing_left: {},
	blue_player_idle_facing_right: {},
	pink_player_idle_facing_left: {},
	pink_player_idle_facing_right: {},
	yellow_player_idle_facing_left: {},
	yellow_player_idle_facing_right: {},
	pterodactyl_sprite_facing_left: {},
	pterodactyl_sprite_facing_right: {},
	tile_sand_01: {},
	UI_Anim: {},
	SupriseBox: {}
};

window.onload = function(){
	// Check for game controller plugged in
	window.addEventListener("gamepadconnected", (evt)=>{
		console.log("gamepad connected");
	});
	window.addEventListener("gamepaddisconnected", (evt)=>{
		console.log("gamepad disconnected");
	});
	
	preImageLoadingInit();
	loadingAndInputToLaunchScreen.drawLoading();

  console.log("Initializing game. Downloading "+allImages.length+" sprites.");
  const imagesKeys = Object.keys(images);
  for (var i=0; i<allImages.length; i++) {
	  images[imagesKeys[i]] = new Image();
	  images[imagesKeys[i]].onload = function()
	  {
	  	gameState = 'input to launch';
	  	cls();
	  	loadingAndInputToLaunchScreen.drawInputToLaunch();
	  };

      images[imagesKeys[i]].src = allImages[i];      
  }
}



function preImageLoadingInit()
{
	canvas = document.getElementById('gameCanvas');
	canvas.width = Math.ceil(PIXEL_SCALE_UP * canvas.width);
	canvas.height = Math.ceil(PIXEL_SCALE_UP * canvas.height);
	
	canvasContext = canvas.getContext('2d');
	
	//let's keep those pixels crisp
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msImageSmoothingEnabled = false;
	canvasContext.font = "Press Start 2P";

	initInput();

	loadingAndInputToLaunchScreen = new LoadingAndInputToLaunchScreen();
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
	gameState = 'menu';
	x.style.display = "block"; 
	
    decals = new decalManager(); // fx on the ground

    menuUI = document.getElementById('allmenu');
	
	
    menuInit();
    characterSelectScreen = new CharacterSelectScreen();

	console.log("Initialization complete. Running game!");

  setInterval(update,1000/FPS);

}

function update(){
	switch (gameState) {
		case 'menu': 
			menuUpdate(1000/FPS);
			break;
		case 'character select screen':
			characterSelectScreen.update();
			break;
		case 'game': 
			menuUI.style.display = 'none';
			gameUpdate();
			scoredNotChecked = true;
			break;
		case 'gameOver': 
			checkScore();
			gameOverUpdate();
			break;

	}	

	draw();
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
		case 'character select screen':
			characterSelectScreen.draw();
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
