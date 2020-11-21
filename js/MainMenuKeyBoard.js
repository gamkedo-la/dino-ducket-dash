document.addEventListener('keydown', detectKeyPresses);

// detect key presses from player and change the UI Buttons
function detectKeyPresses(evt) {

    // FIXME don't process keypresses while game is in progress!
    if (gameState!='menu' && !gameIsPaused) return;

    const keyPress = evt.code;
    //console.log('buttonSelectState: ' + buttonSelectState);
    switch(buttonSelectState) {
        case buttonsList.single:
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.multi;
                removeSingleSelect();
                addMultiSelect();
                playMenuSelectSFX();
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

            if (keyPress === KEY_UP || keyPress === KEY_W){
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
            if (keyPress === KEY_UP || keyPress === KEY_W){
                buttonSelectState = buttonsList.threePlayers;
                removeFourPlayersSelect();
                addThreePlayersSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.highscore;
                removeFourPlayersSelect();
                addHighscoreSelect();
                playMenuSelectSFX();
            }
            break;
        /*case buttonsList.help:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.fourPlayers;
                removeHelpSelect();
                addFourPlayersSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.highscore;
                removeHelpSelect();
                addHighscoreSelect();
                playMenuSelectSFX();
            }
            break;*/
        case buttonsList.highscore:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.fourPlayers;
                removeHighscoreSelect();
                addFourPlayersSelect();
                playMenuSelectSFX();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.credits;
                removeHighscoreSelect();
                addCreditsSelect();
                playMenuSelectSFX();
            }
            break;
        case buttonsList.credits:
                if(keyPress === KEY_UP || keyPress === KEY_W) {
                    buttonSelectState = buttonsList.highscore;
                    removeCreditsSelect();
                    addHighscoreSelect();
                    playMenuSelectSFX();
                }
        break;
    }

    if (keyPress === ENTER){
            if(showingCredits) {
                exitIfShowingCredits();
                return;
            }
            switch(buttonSelectState){
            case buttonsList.single:
                singlePlayer();
                break;
            case buttonsList.multi:
                twoPlayer();
                break;
            case buttonsList.threePlayers:
                threePlayers();
                break;
            case buttonsList.fourPlayers:
                fourPlayers();
                break;
            case buttonsList.highscore:
                showHighScore();
                addExitHighscoreSelect();
                break;
            case buttonsList.exitHighscore:
                hideHighScore();
                removeExitHighscoreSelect();
                break;
            case buttonsList.credits:
                showCredits();
                break;
        }

         menuSelect.play();
         exitMenu();
}

    function playMenuSelectSFX(){
        if(gameState == "menu"){
            menuSFX.play();
        }
    }
}
