function resetGame(){
  score = 0;
  enemies = [];
  ducketList = [];
  resetTimer();
}

function initGame(){
  resetGame();
  
  player = new playerClass();
	player.initPlayer();
  
  moneyBucket = new moneyBucketClass();
	
	spawnEnemy();
  spawnCoins();
  
  gameState = 'game';
}

function gameUpdate(){
  updateTimer();
  player.update();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update()
  }
  
  moneyBucket.update();
  checkIfCoinsNeedToRespawn()
  
  for (var i = 0; i < ducketList.length; i++) {
    if(ducketList[i].readyToRemove){
      ducketList.splice(i,1);
    }
  }
}

function gameDraw(){
  moneyBucket.draw();
  
  for (var i = 0; i < ducketList.length; i++) {
    ducketList[i].draw();
  }
  
  player.draw();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw()
  }
  drawTimer();
}
