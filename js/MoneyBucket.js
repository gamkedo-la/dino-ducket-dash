function moneyBucketClass(){
  this.x = canvas.width/2 - 16;
  this.y = canvas.height/2 - 16;
  this.width = 32;
  this.height = 32;
  
  this.update = function(){
    if(checkCollision(this,player)){
      //WARM UP: Need an SFX to support this. Cha-Ching! Trello card - https://trello.com/c/O295lfdz
      //WARM UP: Screen shake? Trell card - https://trello.com/c/UQpCL4pt
			score += player.coinsCarried;
      player.coinsCarried = 0;
		}
  }
  
  this.draw = function(){
    drawRect(this.x,this.y, this.width,this.height, 'white');
    canvasContext.fillStyle = 'black';
    canvasContext.font = '24px "Press2Start"'
		canvasContext.fillText(score, this.x+8*PIXEL_SCALE_UP,this.y+16*PIXEL_SCALE_UP);
  }
  
}
