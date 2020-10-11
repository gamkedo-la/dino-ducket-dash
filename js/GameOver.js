function gameOverUpdate(){
  //get the gamepads connected 
	var gamepads = navigator.getGamepads();
	
	//check if any button on the gamepad has been pressed
	if(gamepads.length > 0 && gamepads[0] && gamepads[0].buttons!=undefined){
		for (var i = 0; i < gamepads[0].buttons.length; i++) {
			if(gamepads[0].buttons[i].pressed){
				if(gameState == "gameOver"){
					initGame();
				}
			} // end gamepad button if
		} // end buttons for loop
	} //end gamepad check
  return;
}

function gameOverDraw(){
  canvasContext.fillStyle = '#FFF';
  canvasContext.font = '72px "Press Start 2P"'
	canvasContext.fillText('SCORE: '+ score, canvas.width/6,canvas.height/4);
	
	canvasContext.fillStyle = 'black';
  canvasContext.fillText('GAME OVER!', canvas.width/6,canvas.height/2);
  
  canvasContext.font = '24px "Press Start 2P"'
  canvasContext.fillText('PRESS R TO TRY AGAIN!', canvas.width/4,canvas.height/1.5);
  
  /// draw High Score List 
  canvasContext.fillText('HIGH SCORES', canvas.width/4,canvas.height - 160);
  canvasContext.fillText(sortedHighScoreList[0], canvas.width/4,canvas.height - 130);
  if(sortedHighScoreList.length > 1){
	canvasContext.fillText(sortedHighScoreList[1], canvas.width/4,canvas.height - 100);
  }
  if(sortedHighScoreList.length > 2){
	 canvasContext.fillText(sortedHighScoreList[2], canvas.width/4,canvas.height - 70);
  }
  
   
  
  
  
  return;
}
