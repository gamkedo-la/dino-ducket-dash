var currentScore = 0;

function gameOverUpdate(){
  //get the gamepads connected 
	var gamepads = navigator.getGamepads();

	if(currentScore < score){
		currentScore++;
		coinPickUpSFX.play();
	}
	
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
    canvasContext.font = '64px "Press Start 2P"';
    canvasContext.textAlign = 'center';
	canvasContext.fillText(_('SCORE') + ': '+ currentScore, canvas.width/2,canvas.height/4);
	
	canvasContext.fillStyle = 'black';
	canvasContext.textAlign = 'start';
    canvasContext.fillText(_('GAME OVER!'), canvas.width/6,canvas.height/2);
  
	canvasContext.font = '24px "Press Start 2P"'	
	canvasContext.fillText(_('PRESS ESC TO GO BACK TO MAIN MENU!'), canvas.width/11,canvas.height/1.7);	
	canvasContext.fillText(_('PRESS R TO TRY AGAIN!'), canvas.width/4,canvas.height/1.5);	
  
    /// draw High Score List 
    canvasContext.textAlign = 'center';
    canvasContext.fillText(_('HIGH SCORES'), canvas.width/2,canvas.height - 160);
    canvasContext.fillText(sortedHighScoreList[0], canvas.width/2,canvas.height - 130);
    if(sortedHighScoreList.length > 1){
	  canvasContext.fillText(sortedHighScoreList[1], canvas.width/2,canvas.height - 100);
    }
    if(sortedHighScoreList.length > 2){
	  canvasContext.fillText(sortedHighScoreList[2], canvas.width/2,canvas.height - 70);
    }
  
    canvasContext.textAlign = 'start'; 

    DrawOverlay(images.knockOverlay,0,0,320,240);
  
    return;
}
