function detectMouseHover(item){
    switch(buttonSelectState) {
        case buttonsList.single:
            removeSingleSelect()
            break;
        case buttonsList.multi:
            removeMultiSelect();
            break;
        case buttonsList.audio:
            removeAudioSelect();
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
        case buttonsList.audio:
            addAudioSelect();
            break;
        case buttonsList.highscore:
            addHighscoreSelect();
            break;
    }
    buttonSelectState = item;

}