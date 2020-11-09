function CountdownToGamePlay()
{
	this.secondsLeft = 3;
	var timerClock = new countdownTimer();

	this.init = function()
	{
		window.countdownToGamePlayInterval = setInterval(window.countdownToGamePlayTimer.decreaseSecondsLeft,1000);
		countdownSecondSFX.play();
	}

	this.draw = function()
	{
		canvasContext.fillStyle = 'white';
		canvasContext.font = '150px "Press Start 2P"';
		canvasContext.textAlign = 'center';
		canvasContext.fillText(this.secondsLeft, canvas.width/2,canvas.height/1.75);
		canvasContext.textAlign = 'start';
		// FIXME we could put the animated timer sprite here TODO
	}

	this.decreaseSecondsLeft = function()
	{
		if (window.countdownToGamePlayTimer)
		{
			window.countdownToGamePlayTimer.secondsLeft--;
			if (window.countdownToGamePlayTimer.secondsLeft > 0)
			{
				countdownSecondSFX.play();
				drawRect(canvas.width / 2, canvas.height / 2, 50, 50, 'white'); // COUNTDOWN TIMER SPRITESHEET NOT WORKING: tried to test if drawing a dummy timer works. Doesn't work

			}

			if (window.countdownToGamePlayTimer.secondsLeft === 0)
			{
				gameStartSFX.play();
				clearInterval(window.countdownToGamePlayInterval);
				window.countdownToGamePlayTimer = null;		
			}
		}
	}
}

// HELP : This one not working.
function countdownTimer() {
	this.initTimer = function() {
		this.sprite = images.timerSheet;
		this.sprite.loaded = true;
	  	this.frameWidth = this.sprite.width / this.animColumns;
		this.frameHeight = this.sprite.height / this.animRows;
		
		this.x = (canvas.width / 2) - 50;
		this.y = (canvas.height / 2) + 50;
	}

	this.draw = function() {
		animate(this, true);
	}
} 