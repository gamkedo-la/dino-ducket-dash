gameIsPaused = false;

function resetGame(){
  enemies = [];
  ducketList = [];
  resetTimer();
  checkScore();
  score = 0;
 }

function initGame(){
  resetGame();
  
  if (firstPlayThrough)
  {
    setTimeout(function(){firstPlayThrough = false},3000);
  }

  countdownToGamePlayTimer = new CountdownToGamePlay();
  countdownToGamePlayTimer.init();

  player = new playerClass();
  player.initPlayer();

  animUI = new animUIClass();
  animUI.init();
  
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
  
  animUI.update();

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

var screenShouldBeShaking = false;
var firstPlayThrough = true;
var depositInstructionShouldBeShowing = true;

function gameDraw(){
  if (screenShouldBeShaking)
  {
    canvasContext.save();
    let shakeCoordinateX = getRandomIntInclusive(0,canvas.width/20);
    let shakeCoordinateY = getRandomIntInclusive(0,canvas.height/20);
    canvasContext.translate(shakeCoordinateX,shakeCoordinateY);
  }

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

  if (depositInstructionShouldBeShowing)
  {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px "Press Start 2P"';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Deposit Coins Here!", canvas.width/2,(canvas.height/2) - (scaledbucketSize/2) - 15);
    canvasContext.textAlign = 'start';
  }

  animUI.draw();
  
  if (countdownToGamePlayTimer)
  {
    countdownToGamePlayTimer.draw();
  }
  
  if (firstPlayThrough)
  {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '35px "Press Start 2P"';
    canvasContext.textAlign = 'center';
    canvasContext.fillText("Collect and Deposit Coins!", canvas.width/2,canvas.height*0.33);
    canvasContext.textAlign = 'start';
  }

  

  drawTimer();
  drawHighScore();
  drawCurrentScore();
  
  canvasContext.restore();
}
