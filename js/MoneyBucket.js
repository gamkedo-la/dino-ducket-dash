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
        depositSFX.play();
        score += player.ducketsCarried;
        player.ducketsCarried = 0;
        spawnEnemyTelegraph();
      }
		}
  }
  
  this.draw = function(){
    drawRect(this.x, this.y, this.width, this.height, 'white');
    canvasContext.fillStyle = 'black';
    //need to draw bucket score text centered. use CSS?
    let scoreTextWidth = canvasContext.measureText(score).width;
    console.log('scoreTextWidth: ' + scoreTextWidth);
    canvasContext.font = '30px "Press Start 2P"';
    canvasContext.textAlign = 'center';
    canvasContext.fillText(score, canvas.width/2,(canvas.height/2)+16);

    canvasContext.textAlign = 'start';
    
    if (debugOn)
    {
      canvasContext.strokeStyle = 'black';
      canvasContext.moveTo(canvas.width/2,0);
      canvasContext.lineTo(canvas.width/2,canvas.height);
      canvasContext.stroke();
    }
  }
  
}
