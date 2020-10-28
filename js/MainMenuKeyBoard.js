document.addEventListener('keydown', detectKeyPresses);

// detect key presses from player and change the UI Buttons
function detectKeyPresses(evt) {

    // FIXME don't process keypresses while game is in progress!
    if (gameState!='menu') return;

    const keyPress = evt.code;
    console.log('buttonSelectState: ' + buttonSelectState);
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
                buttonSelectState = buttonsList.threePlayers;
                removeMultiSelect();
                addThreePlayersSelect();
                playMenuSelectSFX();
            }
            break;
        case buttonsList.threePlayers:

            if (keyPress === KEY_UP || keyPress === KEY_W)
            {
                buttonSelectState = buttonsList.multi;
                removeThreePlayersSelect();
                addMultiSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.fourPlayers;
                removeThreePlayersSelect();
                addFourPlayersSelect();
                playMenuSelectSFX();
            }
                
            break;
        case buttonsList.fourPlayers:
            if (keyPress === KEY_UP || keyPress === KEY_W)
            {
                buttonSelectState = buttonsList.threePlayers;
                removeFourPlayersSelect();
                addThreePlayersSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.audio;
                removeFourPlayersSelect();
                addAudioSelect();
                playMenuSelectSFX();
            }
            break;
        case buttonsList.audio:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.fourPlayers;
                removeAudioSelect();
                addFourPlayersSelect();
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
