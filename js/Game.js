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
	
  spawnEnemy(100,100);
  spawnCoins();

  decals.scatterDecorations(); // rocks and grass etc
  
  gameState = 'game';
}

function gameUpdate(){
  updateTimer();
  player.update();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update()
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    enemyTelegraphs[i].update()
  }
  
  moneyBucket.update();
  checkIfCoinsNeedToRespawn()
  
  for (var i = 0; i < ducketList.length; i++) {
    if(ducketList[i].readyToRemove){
      ducketList.splice(i,1);
    }
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    if(enemyTelegraphs[i].readyToRemove){
      enemyTelegraphs.splice(i,1);
    }
  }
}

function gameDraw(){
  moneyBucket.draw();

  decals.draw(); // footsteps etc
  
  for (var i = 0; i < ducketList.length; i++) {
    ducketList[i].draw();
  }
  
  player.draw();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw()
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    enemyTelegraphs[i].draw()
  }
  drawTimer();
}
