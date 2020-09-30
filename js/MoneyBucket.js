function moneyBucketClass(){
  this.x = canvas.width/2 - 16;
  this.y = canvas.height/2 - 16;
  this.width = 32;
  this.height = 32;
  
  this.update = function(){
    if(checkCollision(this,player)){
      if(player.ducketsCarried > 0){
        score += player.ducketsCarried;
        player.ducketsCarried = 0;
        spawnEnemy();
      }
		}
  }
  
  this.draw = function(){
    drawRect(this.x,this.y, this.width,this.height, 'white');
    canvasContext.fillStyle = 'black';
    canvasContext.font = '24px "Press Start 2P"'
		canvasContext.fillText(score, this.x+8*PIXEL_SCALE_UP,this.y+16*PIXEL_SCALE_UP);
  }
  
}
