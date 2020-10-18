function LoadingAndInputToLaunchScreen()
{
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;

	this.drawLoading = function()
	{
		canvasContext.fillStyle = '#CDC29E';
		canvasContext.fillRect(this.x,this.y, this.width,this.height);

		canvasContext.fillStyle = '#FE4101';
		let loadingText = 'Loading...';
		canvasContext.font = '25px "Press Start 2P"';
		let loadingTextWidth = canvasContext.measureText(loadingText).width;
		canvasContext.fillText(loadingText, canvas.width/2 - loadingTextWidth/2,canvas.height/2 - 50);
	}

	this.drawInputToLaunch = function()
	{
		canvasContext.fillStyle = '#CDC29E';
		canvasContext.fillRect(this.x,this.y, this.width,this.height);

		canvasContext.fillStyle = '#FE4101';
		let inputToLaunchText = 'Click or Press Enter to Start';
		canvasContext.font = '25px "Press Start 2P"';
		let inputToLaunchTextWidth = canvasContext.measureText(inputToLaunchText).width;
		canvasContext.fillText(inputToLaunchText, canvas.width/2 - inputToLaunchTextWidth/2,canvas.height/2 - 50);
	}
}