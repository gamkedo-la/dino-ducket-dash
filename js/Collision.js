function checkCollision(sprite1,sprite2){
  if(sprite1.x < sprite2.x + sprite2.width &&
    sprite1.x + sprite1.width > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height &&
    sprite1.y + sprite1.height > sprite2.y){
      return true;
  } else{
    return false;
  }
}
