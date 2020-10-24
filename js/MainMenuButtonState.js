//Elements
//main menu
var singleDiv = document.getElementById('single');
var multiDiv = document.getElementById('multi');
var threePlayersDiv = document.getElementById('threePlayers');
var fourPlayersDiv = document.getElementById('fourPlayers');
var audioDiv = document.getElementById('audio');
var highscoreDiv = document.getElementById('highscore');

//For  HighScoreMenu
var exitHighscoreDiv= document.getElementById('exitHighscore');

//character select
var greenDino = document.getElementById('greenDino');
var blueDino = document.getElementById("blueDino");
var pinkDino = document.getElementById('pinkDino');
var yellowDino = document.getElementById('yellowDino');

// have the single player mode highlighted when game starts
this.startMenuShape();

// Enum Object
var buttonsList = {
    //main menu
    single: 0,
    multi: 1,
    threePlayers: 2,
    fourPlayers: 3,
    audio: 4,
    highscore: 5,
    exitHighscore: 6,
    //character select
    greenDino: 7,
    blueDino: 8,
    pinkDino: 9,
    yellowDino: 10
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

function removeThreePlayersSelect()
{
    threePlayersDiv.classList.remove('buttonSelected');
    threePlayersDiv.classList.add('buttonUnselected');
}

function addThreePlayersSelect()
{
    threePlayersDiv.classList.remove('buttonUnselected');
    threePlayersDiv.classList.add('buttonSelected');
}

function removeFourPlayersSelect()
{
    fourPlayersDiv.classList.remove('buttonSelected');
    fourPlayersDiv.classList.add('buttonUnselected');
}

function addFourPlayersSelect()
{
    fourPlayersDiv.classList.remove('buttonUnselected');
    fourPlayersDiv.classList.add('buttonSelected');
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

function removeExitHighscoreSelect() {
    exitHighscoreDiv.classList.remove('buttonSelected');
    exitHighscoreDiv.classList.add('buttonUnselected');
}

function addExitHighscoreSelect() {
    exitHighscoreDiv.classList.remove('buttonUnselected');
    exitHighscoreDiv.classList.add('buttonSelected');
}

function startMenuShape(){
    singleDiv.classList.add('buttonSelected');
    multiDiv.classList.add('buttonUnselected');
    threePlayersDiv.classList.add('buttonUnselected');
    fourPlayersDiv.classList.add('buttonUnselected');
    audioDiv.classList.add('buttonUnselected');
    highscoreDiv.classList.add('buttonUnselected');
    exitHighscoreDiv.classList.add('buttonUnselected');
}