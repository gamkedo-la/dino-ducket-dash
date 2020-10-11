gameIsPaused = false;

function resetGame(){
  enemies = [];
  ducketList = [];
  resetTimer();
  checkScore();
 }

function initGame(){
  resetGame();
  
  countdownToGamePlayTimer = new CountdownToGamePlay();
  countdownToGamePlayTimer.init();

  player = new playerClass();
	player.initPlayer();
  
  moneyBucket = new moneyBucketClass();

  ducketParticlesManager = new DucketParticlesManager();
	
  spawnEnemy(100,100);
  spawnCoins();

  decals.scatterDecorations(); // rocks and grass etc
  
  gameState = 'game';
  if (gameIsPaused === true)
			{
				gameIsPaused = false;
			}
}

function gameUpdate(){
  if (gameIsPaused || countdownToGamePlayTimer)
  {
    if (gameIsPaused && x.style.display == "none"){
      menuUI.style.display = 'block';
      }  
    return;
  }
  updateTimer();
  player.update();

  ducketParticlesManager.updateParticleInstances();
  
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
  
  ducketParticlesManager.drawParticleInstances();
  player.draw();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw()
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    enemyTelegraphs[i].draw()
  }

  if (countdownToGamePlayTimer)
  {
    countdownToGamePlayTimer.draw();
  }
  
  drawTimer();
  drawHighScore();
}

