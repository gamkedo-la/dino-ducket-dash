const FPS = 60;
const ANIMATION_DELAY = 10;

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
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	initInput();

	player = new playerClass();
	player.initPlayer();

	enemy = new enemyClass();
	enemy.init();
	
	menuSprite = new menuClass();
	menuSprite.init();
	
	moneyBucket = new moneyBucketClass;
	
	score = 0;

	for (var i = 0; i < 20; i++) {
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
