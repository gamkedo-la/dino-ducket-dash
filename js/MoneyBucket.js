function moneyBucketClass(){
  this.x = canvas.width/2 - 16;
  this.y = canvas.height/2 - 16;
  this.width = 32;
  this.height = 32;
  
  this.update = function(){
    if(checkCollision(this,player)){
			score += player.coinsCarried;
      player.coinsCarried = 0;
		}
  }
  
  this.draw = function(){
    drawRect(this.x,this.y, this.width,this.height, 'black');
    canvasContext.fillStyle = 'white';
		canvasContext.fillText(score, this.x+8,this.y+16);
  }
  
}
