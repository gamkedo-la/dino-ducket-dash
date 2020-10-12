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
            }
            if(keyPress === ENTER) {

            }
            break;
        case buttonsList.multi:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.single;
                removeMultiSelect();
                addSingleSelect();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.audio;
                removeMultiSelect();
                addAudioSelect();
            }
            break;
        case buttonsList.audio:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.multi;
                removeAudioSelect();
                addMultiSelect();
            }
            if(keyPress === KEY_DOWN || keyPress === KEY_S) {
                buttonSelectState = buttonsList.highscore;
                removeAudioSelect();
                addHighscoreSelect();
            }
            break;
        case buttonsList.highscore:
            if(keyPress === KEY_UP || keyPress === KEY_W) {
                buttonSelectState = buttonsList.audio;
                removeHighscoreSelect();
                addAudioSelect();
            }
            break;
    }

}
