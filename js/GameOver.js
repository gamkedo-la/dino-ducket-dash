function gameOverUpdate(){
  return;
}

function gameOverDraw(){
  canvasContext.fillStyle = 'black';
  canvasContext.font = '72px "Press Start 2P"'
  canvasContext.fillText('GAME OVER!', canvas.width/6,canvas.height/2);
  
  canvasContext.font = '24px "Press Start 2P"'
  canvasContext.fillText('PRESS R TO TRY AGAIN!', canvas.width/4,canvas.height/1.5);
  return;
}
