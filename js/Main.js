const FPS = 60;
const ANIMATION_DELAY = 10;
const PIXEL_SCALE_UP = 3;

var canvas;
var canvasContext;

var player;
var enemy;
var coinList = [];
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

	for (var i = 0; i < 20; i++) {
		//WARM UP: limit coin positioning so all of them are 100% on screen
		var coin = new coinClass();
		coin.x = Math.floor(Math.random()*canvas.width);
		coin.y = Math.floor(Math.random()*canvas.height);
		coin.initCoin();
		coinList.push(coin);
	}

	console.log("Game Initialized");
}

function update(){
	if(gameState == "menu"){
		
	} else{
		player.update();
		enemy.update();
		moneyBucket.update();
		
		for (var i = 0; i < coinList.length; i++) {
			if(coinList[i].readyToRemove){
				coinList.splice(i,1);
			}
		}
	}
	
	//coin.update();
	draw();
}

function draw(){
	cls();
	if(gameState == "menu"){
		menuSprite.draw();
	} else{
		for (var i = 0; i < coinList.length; i++) {
			coinList[i].draw();
		}
		moneyBucket.draw();
		player.draw();
		enemy.draw();
	}
	
}
