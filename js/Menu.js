var showingCredits = false;

function menuClass(){
  //Menu Variables
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;
	this.speed = 5;

	// Animation Variables
	this.sprite;
	this.animColumns = 4;
	this.animRows = 1;
	this.frameWidth;
	this.frameHeight;
	this.currentFrame = 0;
	this.animationFrameDelay = 5;
	this.currentAnimationFrameDelay = 5;
	this.flipped = true;

	this.init = function(){
		this.sprite = images.menu_title;
		this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		this.sprite.loaded = true;
	}
  
  this.draw = function(){
  	if(showingCredits) {
  		drawCredits();
  	} else {
    	animate(this,true);
	}
  }
}

function menuInit(){
	menuSprite = new menuClass();
	menuSprite.init();
}

function menuDraw(){
	menuSprite.draw();
}
//menuItem variables

let scoreMenu = document.getElementById("scoremenu");
function singlePlayer() {
	playMode = 0;
	transitionAnim.transitionToScene('character select screen');
}

function twoPlayer() {
	playMode = 1;
	transitionAnim.transitionToScene('character select screen');
}

function threePlayers()
{
	playMode = 2;
	transitionAnim.transitionToScene('character select screen');
}

function fourPlayers()
{
	playMode = 3;
	transitionAnim.transitionToScene('character select screen');
}

function hideHighScore(){	
	backToMenu();
	if(scoreMenu.style.display == 'block') {
		scoreMenu.style.display = 'none';
	}
}

function showHighScore(){
	exitMenu();
	if(scoreMenu.style.display=='none'){
		scoreMenu.style.display = 'block';
	}
	let maxScoresToShow = 3;
	let scoreToShow = maxScoresToShow;
	if (sortedHighScoreList.length < scoreToShow) {
		scoreToShow = sortedHighScoreList.length;
	}
	for (let i=0; i<scoreToShow; i++){
		let scoreNumber = document.getElementById("score" + (i+1) + "Number");
		scoreNumber.innerHTML = sortedHighScoreList[i];
		let scoreName = document.getElementById("score" + (i+1) + "Name");
		scoreName.innerHTML = "zzz";
	}
	
	for (let i=scoreToShow; i<maxScoresToShow; i++){
		let scoreNumber = document.getElementById("score" + (i+1) + "Number");
		scoreNumber.innerHTML = 0;
		let scoreName = document.getElementById("score" + (i+1) + "Name");
		scoreName.innerHTML = "___";
	}
	// let scoreArray = highScoreList.split("<br>"); 
	// let SCOREBOARD = document.getElementById("highScore");
	// SCOREBOARD.innerHTML = scoreArray;
	// var tbl = document.createElement("table");
	// var row = document.createElement("tr");
}

function showHelp() {
	
}

function backToMenu(){
	if(menuUI.style.display === "none"){
		menuUI.style.display = "block"; 
	}
}

function exitMenu(){
	if(menuUI.style.display === "block"){
		menuUI.style.display = "none";
	}
}

function showCredits() {
	if(showingCredits == false) {
		showingCredits = true;
		menuUI.style.display = "none";
	}
}

function exitIfShowingCredits() { // called from canvas mousedown event hook
	if(showingCredits) {
		showingCredits = false;
		menuUI.style.display = "block";
	}
}

var creditsMaxCharWidthToWrap = 120;
var creditsScrollRate = 0.0;
var creditsScroll = 0;

var creditNameList = [
"Gabriel Cornish: Project lead, core gameplay, music integration, placeholder art, canvas scale, font selection, ducket and enemy spawning, game over and replay support, PS4 controller support, coin sound, animation frame timing, coin loss on damage, sounds (hit, deposit, menu, character select), menu art improvement, odds tuning, color palette, screen transitions, surprise box announcement",
"Stebs: Sprite flipping, debug cheats, coin particles, countdown timer sound hookup, pause fix, mute key, intervals error fix, bounds checking, screenshake, in-game instructions, coin spawning improvements, initial character selection, loading screen, additional surprise box outcome, 3-4 player selection from menu",
"Christer \"McFunkypants\" Kaitila: DecalFX feature and assorted uses (footsteps, ground cracks), collision bounce, coin overlap avoidance, ducket bucket, triceratops attack and related effects, timer animation touch up, UI flash when in danger, intro sequence, CSS fixes (removed scrollbars, canvas centers, etc), loading fix, gamepad null checks, pixel scale improvement, assorted bug fixes, font improvement",
"Carson Sanders: Triceratops enemy implementation, brief immunity after damage, display value rounding, surprise box reset, game over screen polish (score counts up, plays sounds), additional sound integration",
"Jeff \"Axphin\" Hanlon: Triceratops enemy art, enemy attack telegraph animation, sound effects (7), sand tile, dino animation speed tuning, coin bucket and UI position tweaks",
"Muhammed \"EyeForcz\" Durmusoglu: Co-op 2 & 4 player support, gamepad bug fix, start sequence polish, surprise box feature",
"Vince McKeown: Pterodactyle sprite, timer implementation, enemy randomization, clock bug fix, high score local storage, high score initials",
"I-wei Chen: Random bucket designs, animation strip support, Triceratops sprite hookup, assorted fixes (gamepad, keyboard control, movement related), screen crack effect, ducket deposit effect, splash screen animation",
"H Trayford: Safe enemy spawn margin, image loading code, UI layout improvement, variable player menu hookup, Triceratops attack recharge delay, bucket protection from flying enemy and boss, dust particle fix",
"Michael \"Misha\" Fewkes: Music (menu, gameplay), audio file format conversion for compatibility, volume mixing",
"Vaan Hope Khani: Cactus art, menu code (including high scores readout), exit button, canvas resize, audio button fix",
"Jose Reque Martinez: Menu key and controller support, key input refactor,  escape button, player select to main menu transition",
"Charlene A.: Timer sprite (animation and integration), dust particle sprite",
"Gonzalo Delgado: T-Rex player sprite, localization support with Spanish translations (both JS and HTML)",
"Randy Tan Shaoxian: Selection box smoothing, selectable player colors, transition from game over back to menu",
"Joansito Colimon: Special thanks for practice commit (welcome to HomeTeam Apollo!)",
    " ",
    "Made by members of HomeTeam GameDev (Apollo!)"," ","Join at HomeTeamGameDev.com to make games with us!",
    ];

function drawCredits(){
	var posX = 10;
	var posHeight = 70;
	var count = 0;

	var anyDrew = false;
	canvasContext.font = '17px Helvetica';
	canvasContext.textAlign = 'left';
	for (count; count < creditNameList.length; count++){
		var drawAt = posHeight+count*18-creditsScroll;
		canvasContext.fillStyle = 'black';
		canvasContext.fillText(creditNameList[count], posX, drawAt);
		canvasContext.fillStyle = 'white';
		canvasContext.fillText(creditNameList[count].substr(0, creditNameList[count].indexOf(':')), posX-1, drawAt-1); // names pop
		anyDrew = true;
	}
	canvasContext.fillStyle = 'yellow';
	canvasContext.font = '18px Helvetica';
	canvasContext.textAlign = "center";
	canvasContext.fillText('-- Press Enter or CLICK HERE to return to the menu --', canvas.width/2,50);
	canvasContext.textAlign = "left";

	creditsScroll+=creditsScrollRate;
	if(anyDrew==false) { // reset, all off screen
		creditsScroll=0;
	}
}

function wrapCredits(){ // note: gets calling immediately after definition
    var newCut = [];
    var findEnd;
    for(var i=0;i<creditNameList.length;i++) {
        while(creditNameList[i].length > 0) {
            findEnd = creditsMaxCharWidthToWrap;
            if(creditNameList[i].length > creditsMaxCharWidthToWrap) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditNameList[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditNameList[i].substring(0, findEnd));
            creditNameList[i] = creditNameList[i].substring(findEnd, creditNameList[i].length);
        }
    }
    creditNameList = newCut;
}
wrapCredits();