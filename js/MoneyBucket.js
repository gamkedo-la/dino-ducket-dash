

let bucketSize = 32;
let bucketHeight=48;
let scaledbucketSize   = bucketSize*PIXEL_SCALE_UP;
let scaledbucketHeight = bucketHeight*PIXEL_SCALE_UP;
let typesofBucket=5;
let depositRegister=false;

//let bucketFontSize = "24px";

function moneyBucketClass(){
  this.x = (canvas.width/2) - (scaledbucketSize/2);
  this.y = (canvas.height/2) - (scaledbucketSize/2);
  this.width = bucketSize;
  this.height = bucketSize;
  
  this.bucketSprite=32* Math.floor(Math.random()*typesofBucket);

  this.celebrateDeposit=new confettiClass();
  this.celebrateDeposit.init(this.x-7,this.y);

  this.update = function(){
    for(let i = 0; i < playerArray.length; i++)
    {
      if(checkCollision(this,playerArray[i]) && !playerArray[i].dead){
        playerArray[i].insideDucketBucket = true;
        if(playerArray[i].ducketsCarried > 0){
          
          //Was trying to put confetti at the player's position
          //this.celebrateDeposit.x=playerArray[i].x;
          //this.celebrateDeposit.y=playerArray[i].y;      
          
          screenShouldBeShaking = true;
          depositRegister=true;
    
          setTimeout(function(){screenShouldBeShaking = false},100); 
          setTimeout(function(){depositRegister=false},1000);
          depositSFX.play();
          score += playerArray[i].ducketsCarried;
          playerArray[i].ducketsCarried = 0;
          spawnEnemyTelegraph();

          if (depositInstructionShouldBeShowing)
          {
            depositInstructionShouldBeShowing = false;
          }
        }
      } else {
        playerArray[i].insideDucketBucket = false;
      }
    }
  }
  
  this.draw = function() {
    
    // draw a temporary white square
    //drawRect(this.x, this.y, this.width, this.height, 'white');
    //canvasContext.fillStyle = 'black';
    
    let rand = prng(777); // seed random numbers same each run
    var ds = DUCKET_SPRITE_W*PIXEL_SCALE_UP;
    // actually draw all the coins just for fun =)
    for (let i=0; i<score; i++) {
        canvasContext.drawImage(images.ducket,
            0,0,//DUCKET_SPRITE_W*(i%6),0, // frame 1-6?
            DUCKET_SPRITE_W,DUCKET_SPRITE_H,
            this.x + prng()*(scaledbucketSize - ds - 3),
            this.y + prng()*(scaledbucketSize - ds - 3), 
            ds,ds);
    }

    

    
    // draw the ducket bucket
    canvasContext.drawImage(images.bucket,
        this.bucketSprite,0,bucketSize,bucketHeight,
        this.x,this.y,scaledbucketSize,scaledbucketHeight);

    // display the coin count on the bucket
    canvasContext.font = '32px "Press Start 2P"';
    canvasContext.textAlign = 'center';
    canvasContext.fillStyle = "black";
    canvasContext.fillText(score, canvas.width/2+1,(canvas.height/2)+16+1);
    canvasContext.fillStyle = "white";
    canvasContext.fillText(score, canvas.width/2,(canvas.height/2)+16);
    canvasContext.textAlign = 'start';

    if (debugOn) // draw a black line straight down the middle of the screen
    {
      canvasContext.strokeStyle = 'black';
      canvasContext.moveTo(canvas.width/2,0);
      canvasContext.lineTo(canvas.width/2,canvas.height);
      canvasContext.stroke();
    }

    //draw confetti
    if(depositRegister)
    {
      this.celebrateDeposit.draw();
    }
  }
  
}


function confettiClass()
{
    this.x;
    this.y;
    this.sprite;
    this.animColumns = 4;
    this.animRows = 1;
    this.frameWidth;
    this.frameHeight;
    this.currentFrame = 0;
    this.animationFrameDelay = ANIMATION_DELAY;
    this.currentAnimationFrameDelay = ANIMATION_DELAY;
    this.flipped = true;
    
    this.init=function(_x,_y)
    {
        this.x=_x;
        this.y=_y;
        this.sprite=images.confetti;
        this.sprite.loaded=true;
        this.frameWidth = this.sprite.width / this.animColumns;
		    this.frameHeight = this.sprite.height / this.animRows;
    }

    this.draw=function()
    {
       animate(this,true);
        //canvasContext.drawImage(images.confetti,0,0,48*PIXEL_SCALE_UP,48*PIXEL_SCALE_UP);
    }
    
}


// pseudo random number generator, same as math.random but reproducable from a seed
const prng = s => (typeof s!=='undefined'&&((l=s%2147483647)<=0&&(l+=2147483646)),((l=l*16807%2147483647)-1)/2147483646);