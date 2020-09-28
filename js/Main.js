const FPS = 60;
const ANIMATION_DELAY = 10;
const PIXEL_SCALE_UP = 3;

var canvas;
var canvasContext;

var player;
var enemy;
var ducketList = [];
var menuSprite;
var moneyBucket;
var gameState = "menu";
var score;

window.onload = function(){
	init();

	setInterval(update,1000/FPS);
}

function init(){
	//WARM UP: can we listen to the "resize" event and resize the canvas while
	//maintaining the aspect ratio?
	canvas = document.getElementById('gameCanvas');
	canvas.width = PIXEL_SCALE_UP * canvas.width;
	canvas.height = PIXEL_SCALE_UP * canvas.height;
	
	canvasContext = canvas.getContext('2d');
	
	//let's keep those pixels crisp
	canvasContext.mozImageSmoothingEnabled = false;
	canvasContext.imageSmoothingEnabled = false;
	canvasContext.msImageSmoothingEnabled = false;
	

	initInput();

	player = new playerClass();
	player.initPlayer();

	enemy = new enemyClass();
	enemy.init();
	
	menuSprite = new menuClass();
	menuSprite.init();
	
	moneyBucket = new moneyBucketClass();
	
	score = 0;

	spawnCoins();

	console.log("Game Initialized");
}

function update(){
	if(gameState == "menu"){
		
	} else{
		player.update();
		enemy.update();
		moneyBucket.update();
		checkIfCoinsNeedToRespawn()
		
		for (var i = 0; i < ducketList.length; i++) {
			if(ducketList[i].readyToRemove){
				ducketList.splice(i,1);
			}
		}
	}
	
	//ducket.update();
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

function checkIfCoinsNeedToRespawn(){
	if(ducketList.length == 0 && player.ducketsCarried == 0){
		spawnCoins();
	}
}

function draw(){
	cls();
	if(gameState == "menu"){
		menuSprite.draw();
	} else{
		for (var i = 0; i < ducketList.length; i++) {
			ducketList[i].draw();
		}
		moneyBucket.draw();
		player.draw();
		enemy.draw();
	}
	
}
