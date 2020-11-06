function transitionClass(){
  this.x = 0;
  this.y = 0;
  this.width = 320;
  this.height = 240;
  this.frame=0;
  this.frameDelay = 0;
  this.animSpeed = 2;
  this.beginTransition = false;
  this.reverseTransition = false;
  this.sceneToTransitionTo;
  
  this.changeScene = function(){
    gameState = this.sceneToTransitionTo;
  }
  
  this.transitionToScene = function(scene){
    this.sceneToTransitionTo = scene;
    this.beginTransition = true;
  }
  
  this.nextFrame = function(){
    this.frameDelay++
    
    if(this.frameDelay >= this.animSpeed){
      this.frameDelay = 0;
      if(this.reverseTransition){
        this.frame -= 1;
      } else{
        this.frame += 1;
      }
    }
  }
  
  this.draw = function(){
    if(this.beginTransition){
      
      if(this.frame > 4){
        this.frame = 4;
        this.reverseTransition = true;
        this.changeScene();
        this.backAtMenu();
      }
      
      if(this.reverseTransition && this.frame <= 0){
        this.beginTransition = false;
        this.reverseTransition = false;
        return;
      }
      
      canvasContext.drawImage(images.transition,this.frame*320,0,this.width,this.height,0,0,this.width*PIXEL_SCALE_UP,this.height*PIXEL_SCALE_UP);
      
      this.nextFrame();
      
    }
  }

  this.backAtMenu = function(){
    if(gameState == "menu" && menuUI.style.display == "none"){
      menuUI.style.display = "block";
    }
  }

}
