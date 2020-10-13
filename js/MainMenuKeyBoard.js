document.addEventListener('keydown', detectKeyPresses);

// detect key presses from player and change the UI Buttons
function detectKeyPresses(evt) {
    const keyPress = evt.code;
    switch(buttonSelectState) {
        case buttonsList.single:
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.multi;
                removeSingleSelect();
                addMultiSelect();
                playMenuSelectSFX();
            }
            if(keyPress === ENTER) {

            }
            break;
        case buttonsList.multi:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.single;
                removeMultiSelect();
                addSingleSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.audio;
                removeMultiSelect();
                addAudioSelect();
                playMenuSelectSFX();
            }
            break;
        case buttonsList.audio:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.multi;
                removeAudioSelect();
                addMultiSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.highscore;
                removeAudioSelect();
                addHighscoreSelect();
                playMenuSelectSFX();
            }
            break;
        case buttonsList.highscore:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.audio;
                removeHighscoreSelect();
                addAudioSelect();
                playMenuSelectSFX();
            }
            break;
    }

}

function playMenuSelectSFX(){
  if(gameState == "menu"){
    menuSFX.play();
  }
}
