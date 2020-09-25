function checkCollision(sprite1,sprite2){
  if(sprite1.x < sprite2.x + sprite2.width*PIXEL_SCALE_UP &&
    sprite1.x + sprite1.width*PIXEL_SCALE_UP > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height*PIXEL_SCALE_UP &&
    sprite1.y + sprite1.height*PIXEL_SCALE_UP > sprite2.y){
      return true;
  } else{
    return false;
  }
}
