function CountdownToGamePlay()
{
	this.isActive = false;
	this.secondsLeft = 3;

	this.init = function()
	{
		window.countdownToGamePlayTimer = setInterval(this.decreaseSecondsLeft,1000);
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
		this.secondsLeft--;
		if (this.secondsLeft === 0)
		{
			this.deactivate();
		}
	}

	this.deactivate = function()
	{
		this.isActive = false;
		clearInterval(window.countdownToGamePlayTimer);
	}
}