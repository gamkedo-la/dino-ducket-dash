gameIsPaused = false;
playMode = 3; //0 for 1P, 1 for 2P,.......
playerArray = [];
var screenShouldBeShaking = false;
var firstPlayThrough = true;
var depositInstructionShouldBeShowing = true;

function resetGame(){
  enemies = [];
  ducketList = [];
  surpriseBoxes = [];
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

  for(let i = 0; i <= playMode; i++)
  {
    let player = new playerClass(i); 
    playerArray[i] = player;
    playerArray[i].initPlayer();
  }

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

// FIXME this routine can run BEFORE initGame() has run? 
function gameUpdate(){ 
  let deathCounter = 0;
  if (gameIsPaused || countdownToGamePlayTimer)
  {
    if (gameIsPaused && x.style.display == "none"){
      menuUI.style.display = 'block';
      }  
    return;
  }
  updateTimer();

  for(let i = 0; i < playerArray.length; i++){ 
    if(!playerArray[i].dead)
    {
      playerArray[i].update();
    }
    else
    {
      deathCounter++;
    }
  }

  if(deathCounter == playerArray.length)
  {
    gameState = 'gameOver';
  }
  
  animUI.update();

  ducketParticlesManager.updateParticleInstances();
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update()
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    enemyTelegraphs[i].update()
  }
  
  for (var i = 0; i < surpriseBoxes.length; i++) {
    surpriseBoxes[i].update();
  }
  
  moneyBucket.update();
  checkIfCoinsNeedToRespawn();
  bouncePlayersOffEachOther();

  for (var i = 0; i < ducketList.length; i++) {
    ducketList[i].update();
    if(ducketList[i].readyToRemove){
      ducketList.splice(i,1);
    }
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    if(enemyTelegraphs[i].readyToRemove){
      enemyTelegraphs.splice(i,1);
    }
  }
  
  for (var i = 0; i < surpriseBoxes.length; i++) {
    if(surpriseBoxes[i].readyToRemove){
      surpriseBoxes.splice(i,1);
    }
  }
}

//
//Drawing after here
//
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
  for(let i = 0; i < playerArray.length; i++){
    if(!playerArray[i].dead)
    {
      playerArray[i].draw();
    }  
  }
  
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw()
  }
  
  for (var i = 0; i < enemyTelegraphs.length; i++) {
    enemyTelegraphs[i].draw()
  }
  
  for (var i = 0; i < surpriseBoxes.length; i++) {
    surpriseBoxes[i].draw()
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
