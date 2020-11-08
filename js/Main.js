const FPS = 60;
const ANIMATION_DELAY = 10;
const PIXEL_SCALE_UP = 3;
const RESIZE_THE_CANVAS = false; // if true, resizing the browser resizes the game canvas

var canvas;
var canvasContext;
var loadingAndInputToLaunchScreen;
var splashTimer;
//var player;
var decals;
var enemyTelegraphs = [];
var ducketList = [];
var menuSprite;
var moneyBucket;
var gameState = "loading";
var menuUI;
var animUI;
var transitionAnim;

//WARM UP: Looking for a good place to add a comment as a practice commit?
//How about on the next line?

window.onload = function(){
	// Check for game controller plugged in
	window.addEventListener("gamepadconnected", (evt)=>{
		console.log("gamepad connected");
	});
	window.addEventListener("gamepaddisconnected", (evt)=>{
		console.log("gamepad disconnected");
	});
    
    if (RESIZE_THE_CANVAS) {
        // we only need to only subscribe to this event if we want
        // to adjust the canvas when the browser window changes shape
        window.addEventListener('resize', resizeCanvas, false);
    }
    
    preImageLoadingInit();
	
	loadingAndInputToLaunchScreen.drawLoading();
 
  	console.log("Initializing game. Downloading "+allImages.length+" sprites.");
  	
  	
  
	loadImages();

	
	
	images.animated_splash.onload=function()
	{
		splashTimer=setInterval(function(){return loadingAndInputToLaunchScreen.drawAnimatedSplash();},100);
		loadingAndInputToLaunchScreen.drawInputToLaunch();
	}
	
	
}

function resizeCanvas() {
    if (RESIZE_THE_CANVAS) {
        canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
        console.log("resized the canvas to "+canvas.width+"x"+canvas.height);
    }
	draw();
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

	loadingAndInputToLaunchScreen = new LoadingAndInputToLaunchScreen();
	
	initInput();
}

/* possibly redundant code
function startgameIfDownloadsComplete() {
	console.log(`${this.src} downloaded ok.`)
    // console.log(allImages[imagesDownloaded]+" downloaded ok.")
    imagesDownloaded++;
    if (imagesDownloaded>=allImages.length) {
		console.log("All "+imagesDownloaded+" downloads complete! Starting game.");
		
        init();
	}
	
}
*/
function init(isResettingGame = false){
	
	//Stop Splash animation
	clearInterval(splashTimer);

    //WARM UP: can we listen to the "resize" event and resize the canvas while
    //maintaining the aspect ratio?
	gameState = 'menu';
	x.style.display = "block"; 
	
  decals = new decalManager(); // fx on the ground
	
	transitionAnim = new transitionClass();

  menuUI = document.getElementById('allmenu');
	
	

  menuInit();
  characterSelectScreen = new CharacterSelectScreen();

	console.log("Initialization complete. Running game!");

	if (!isResettingGame) {
	    setInterval(update,1000/FPS);
	}
	
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

	//resizeCanvas();
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
	
	transitionAnim.draw();
	
}

function randomIntFromInterval(min,max){ // min and max included
	min = Math.ceil(min);
	max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1)) + min;
}
