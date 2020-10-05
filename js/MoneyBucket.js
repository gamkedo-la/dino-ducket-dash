let bucketSize = 32;
let scaledbucketSize = bucketSize*PIXEL_SCALE_UP;
//let bucketFontSize = "24px";

function moneyBucketClass(){
  this.x = (canvas.width/2) - (scaledbucketSize/2);
  this.y = (canvas.height/2) - (scaledbucketSize/2);
  this.width = bucketSize;
  this.height = bucketSize;
  
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
    drawRect(this.x, this.y, this.width, this.height, 'white');
    canvasContext.fillStyle = 'black';
    //need to draw bucket score text centered. use CSS?
    canvasContext.font = '30px "Press Start 2P"';
    canvasContext.fillText(score, (canvas.width/2)-30, (canvas.height/2)+16);
  }
  
}
