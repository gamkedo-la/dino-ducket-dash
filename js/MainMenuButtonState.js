//Elements
var singleDiv = document.getElementById('single');
var multiDiv = document.getElementById('multi');
var audioDiv = document.getElementById('audio');
var highscoreDiv = document.getElementById('highscore');

// have the single player mode highlighted when game starts
this.startMenuShape();

// Enum Object
var buttonsList = {
    single: 0,
    multi: 1,
    audio: 2,
    highscore: 3
}

// Button State
var buttonSelectState = this.buttonsList.single;

function removeSingleSelect() {
    singleDiv.classList.remove('buttonSelected');
    singleDiv.classList.add('buttonUnselected');
}

function addSingleSelect() {
    singleDiv.classList.remove('buttonUnselected');
    singleDiv.classList.add('buttonSelected');
}

function removeMultiSelect() {
    multiDiv.classList.remove('buttonSelected');
    multiDiv.classList.add('buttonUnselected');
}

function addMultiSelect() {
    multiDiv.classList.remove('buttonUnselected');
    multiDiv.classList.add('buttonSelected');
}

function removeAudioSelect() {
    audioDiv.classList.remove('buttonSelected');
    audioDiv.classList.add('buttonUnselected');
}

function addAudioSelect() {
    audioDiv.classList.remove('buttonUnselected');
    audioDiv.classList.add('buttonSelected');
}

function removeHighscoreSelect() {
    highscoreDiv.classList.remove('buttonSelected');
    highscoreDiv.classList.add('buttonUnselected');
}

function addHighscoreSelect() {
    highscoreDiv.classList.remove('buttonUnselected');
    highscoreDiv.classList.add('buttonSelected');
}

function startMenuShape(){
    singleDiv.classList.add('buttonSelected');
    multiDiv.classList.add('buttonUnselected');
    audioDiv.classList.add('buttonUnselected');
    highscoreDiv.classList.add('buttonUnselected');
}