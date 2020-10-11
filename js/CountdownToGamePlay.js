function CountdownToGamePlay()
{
	this.secondsLeft = 3;

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
	}

	this.decreaseSecondsLeft = function()
	{
		if (window.countdownToGamePlayTimer)
		{
			window.countdownToGamePlayTimer.secondsLeft--;
			if (window.countdownToGamePlayTimer.secondsLeft > 0)
			{
				countdownSecondSFX.play();
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
