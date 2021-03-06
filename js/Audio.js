// Audio.js by Michael Fewkes
var musicVolume = 0.7;
var effectsVolume = 0.7;
var isMuted = false;
var firstGesture = false;
const VOLUME_INCREMENT = 0.0333;


//define sounds
// var backgroundSong = new soundLoopsClass("");
var coinPickUpSFX = new soundSingleBufferClass("audio/coinPickUpSFX.ogg");
var hitSFX = new soundSingleBufferClass("audio/hitSFX.ogg");
var depositSFX = new soundSingleBufferClass("audio/depositSFX.ogg");
var countdownSecondSFX = new soundSingleBufferClass("audio/countdownSecond.ogg");
var characterSelect = new soundSingleBufferClass("audio/characterSelect.ogg");
var gameStartSFX = new soundSingleBufferClass("audio/gameStart.ogg");
var menuSFX = new soundSingleBufferClass("audio/menuSFX.ogg");
var powerup01 = new soundSingleBufferClass("audio/powerup01.ogg");
var menuSelect = new soundSingleBufferClass("audio/menuSelect.ogg");

var mainMenuMusic = new soundLoopsClass("audio/mainmenu.ogg");
var gamePlayMusic = new soundLoopsClass("audio/gameplay.ogg");

//--//sound classes-----------------------------------------------------------
var backgroundMusic = function backgroundMusicClass() {

	var musicSound = null;
	var fadeTrack = null;
	var fileName;

	this.loopSong = function(fullFilenameWithPath) {
		if (fullFilenameWithPath == fileName) {
			return false;
		} else {
			fileName = fullFilenameWithPath;
		}

		var newTrack = new Audio(fileName);
		newTrack.oncanplaythrough = function() {
			if (musicSound != null && fadeTrack != null) {
				fadeTrack.pause();
				fadeTrack = musicSound;
				musicSound = null;
			} else if (musicSound != null) {
				fadeTrack = musicSound;
				musicSound = null;
			}
			musicSound = newTrack;
			musicSound.loop = true;
			this.setVolume(musicVolume);

			if (fadeTrack != null) {
				fadeTrack.ontimeupdate = function() {
					var newVolume = fadeTrack.volume - VOLUME_INCREMENT;

					if(newVolume > 1.0) {newVolume = 1.0;}

					if (newVolume < 0.015) {
						fadeTrack.pause();
						fadeTrack = null;
					} else {
						fadeTrack.volume = newVolume;
					}
				}
			}
		}
	}

	this.pause = function() {
		musicSound.pause();
		fadeTrack.pause();
		fadeTrack = null;
	}

	this.stop = function() {
		musicSound.pause();
		if (fadeTrack != null) {
			fadeTrack.pause();
			fadeTrack = null;
		}

		musicSound.currentTime = 0;
	}

	this.resume = function() {
		musicSound.play();
	}

	this.restart = function() {
		musicSound.pause();
		musicSound.currentTime = 0;
		musicSound.play();
	}

	this.setVolume = function(value) {
		if (musicSound == null) {return;}

		musicSound.volume = Math.pow(value * !isMuted, 2);

		if(musicSound.volume == 0) {
			musicSound.pause();
		} else if (musicSound.paused) {
			musicSound.play();
		}
	}
}

function soundLoopsClass(fullFilenameWithPath) {

	var fileName = fullFilenameWithPath;
	var sound = new Audio(fileName);
	sound.loop = true;

	this.play = function() {
		if (sound.paused) {
			sound.currentTime = 0;
			sound.volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
			sound.play();
		}
	}

	this.stop = function() {
		sound.pause();
	}

	this.getTime = function() {
		return sound.currentTime;
	}

	this.setTime = function(value) {
		var newTime = value;
		while (newTime >= sound.duration) {
			newTime -= sound.duration;
		}

		sound.currentTime = newTime;
	}
}

function soundSingleBufferClass(fullFilenameWithPath) {

	var fileName = fullFilenameWithPath;
	var sound = new Audio(fileName);

	this.play = function() {

		sound.currentTime = 0;
		sound.volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sound.play();
	}


	this.stop = function() {
		sound.pause();
	}
}

function soundMultiBufferClass(fullFilenameWithPath, voices = 2) {

	var fileName = fullFilenameWithPath;
	var soundIndex = 0;
	var sounds = new Array(voices);
	for (var i = 0; i < sounds.length; i++) {
		sounds[i] = new Audio(fileName);
	}

	this.play = function() {

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();
		soundIndex++;
		if(soundIndex >= sounds.length){
			soundIndex = 0;
		}
	}

	this.stop = function() {
		for (var i in sounds) {
			sounds[i].pause();
		}
	}
}

function soundDynamicBufferClass(fullFilenameWithPath) {

	var fileName = fullFilenameWithPath;
	var soundIndex = 0;
	var sounds = [new Audio(fileName)];

	this.play = function() {
		if(!sounds[soundIndex].paused) {
			sounds.splice(soundIndex, 0, new Audio(fileName));
		}

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();

		soundIndex = (++soundIndex) % sounds.length;
	}

	this.stop = function() {
		for (var i in sounds) {
			sounds[i].pause();
		}

		sounds = [new Audio(fileName)];
		soundIndex = 0;
	}
}

function soundRandomClass(arrayOfFilenames) {
	var soundIndex = 0;
	var sounds = [''];

	for (var i = 0; i < arrayOfFilenames.length; i++) {
		sounds[i] = new Audio(arrayOfFilenames[i]);
		sounds[i+arrayOfFilenames.length] = new Audio(arrayOfFilenames[i]);
	}

	this.play = function() {
		soundIndex = rndInt(0, sounds.length - 1);
		if(!sounds[soundIndex].paused) {
			var startIndex = soundIndex;
			soundIndex++;
			while (!sounds[soundIndex].paused && startIndex != soundIndex) {
				if (soundIndex >= sounds.length) {
					soundIndex = 0;
				}
			}
		}

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(getRandomVolume() * effectsVolume * !isMuted, 2);
		sounds[soundIndex].play();
	}

	this.stop = function() {
		for (var i in sounds) {
			sounds[i].pause();
		}
	}
}

//--//sound functions---------------------------------------------------------
function getRandomVolume(){
	var min = 0.8;
	var max = 1;
	var randomVolume = Math.random() * (max - min) + min;
	return randomVolume.toFixed(2);
}

function toggleMute() {
	isMuted = !isMuted;
	backgroundMusic.setVolume(musicVolume);
}

function setMusicVolume(amount) {
	musicVolume = amount;
	if(musicVolume > 1.0) {
		musicVolume = 1.0;
	} else if (musicVolume < 0.0) {
		musicVolume = 0.0;
	}
	backgroundMusic.setVolume(musicVolume);
}

function turnMusicVolumeUp() {
	setMusicVolume(musicVolume + VOLUME_INCREMENT);
}

function turnMusicVolumeDown() {
	setMusicVolume(musicVolume - VOLUME_INCREMENT);
}

function setEffectsVolume(amount) {
	effectsVolume = amount;
	if(effectsVolume > 1.0) {
		effectsVolume = 1.0;
	} else if (effectsVolume < 0.0) {
		effectsVolume = 0.0;
	}
}

function turnEffectsVolumeUp() {
	setEffectsVolume(effectsVolume + VOLUME_INCREMENT);
}

function turnEffectsVolumeDown() {
	setEffectsVolume(effectsVolume - VOLUME_INCREMENT);
}

function setVolume(amount) {
	setMusicVolume(amount);
	setEffectsVolume(amount);
}

function turnVolumeUp() {
	turnMusicVolumeUp();
	turnEffectsVolumeUp();
}

function turnVolumeDown() {
	turnMusicVolumeDown();
	turnEffectsVolumeDown();
}

function gesture() {
	if (firstGesture) return;

	//On first click code, probably title music

	firstGesture = true;
}
