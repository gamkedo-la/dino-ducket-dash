function detectMouseHover(item){
    switch(buttonSelectState) {
        case buttonsList.single:
            removeSingleSelect()
            break;
        case buttonsList.multi:
            removeMultiSelect();
            break;
        case buttonsList.threePlayers:
            removeThreePlayersSelect();
            break;
        case buttonsList.fourPlayers:
            removeFourPlayersSelect();
            break; 
        case buttonsList.help:
            removeHelpSelect();
            break;
        case buttonsList.highscore:
            removeHighscoreSelect();
            break;
    }

    switch(item){
        case buttonsList.single:
            addSingleSelect()
            break;
        case buttonsList.multi:
            addMultiSelect();
            break;
        case buttonsList.threePlayers:
            addThreePlayersSelect();
            break;
        case buttonsList.fourPlayers:
            addFourPlayersSelect();
            break;
        case buttonsList.help:
            addHelpSelect();
            break;
        case buttonsList.highscore:
            addHighscoreSelect();
            break;
    }
    buttonSelectState = item;
    menuSelect.play();
}