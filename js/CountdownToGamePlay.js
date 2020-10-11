function CountdownToGamePlay()
{
	this.secondsLeft = 3;

	this.init = function()
	{
		window.countdownToGamePlayInterval = setInterval(window.countdownToGamePlayTimer.decreaseSecondsLeft,1000);
	}

	this.draw = function()
	{
		canvasContext.fillStyle = 'black';
		canvasContext.font = '30px Helvetica';
		canvasContext.textAlign = 'center';
		canvasContext.fillText(this.secondsLeft, canvas.width/2,canvas.height/3);

		canvasContext.textAlign = 'start';
	}

	this.decreaseSecondsLeft = function()
	{
		if (window.countdownToGamePlayTimer)
		{
			window.countdownToGamePlayTimer.secondsLeft--;
			console.log('countdownToGamePlayTimer.secondsLeft: ' + window.countdownToGamePlayTimer.secondsLeft);
			if (window.countdownToGamePlayTimer.secondsLeft === 0)
			{
				window.countdownToGamePlayTimer = null;		
			}
		}
	}
}