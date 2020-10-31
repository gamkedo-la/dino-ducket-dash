function LoadingAndInputToLaunchScreen()
{
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;
	this.frame=0;
	this.loopTimer=0;
	this.opacity=0.1;
	this.splashSprtie;

	
	this.drawLoading = function()
	{
		cls();
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
		//canvasContext.fillStyle = '#CDC29E';
		canvasContext.fillStyle = 'rgb(254,60,1.0,'+this.opacity%1.0+')';
		let inputToLaunchText = 'Click or Press Enter to Start';
		canvasContext.font = '25px "Press Start 2P"';
		let inputToLaunchTextWidth = canvasContext.measureText(inputToLaunchText).width;
		canvasContext.fillText(inputToLaunchText, canvas.width/2 - inputToLaunchTextWidth/2,canvas.height - 50);		
	}

	this.drawAnimatedSplash=function()
	{
		cls();
		
		//Internal :Sugggesting reducing this by -1 on release
		if (this.frame>19)
		{
			this.frame=19;
		}

		if(this.loopTimer>60)
		{
			this.frame=0;
			this.loopTimer=0;
		}
		
		canvasContext.drawImage(images.animated_splash,this.frame*320,0,this.width,this.height,0,0,this.width*PIXEL_SCALE_UP,this.height*PIXEL_SCALE_UP);
		this.frame+=1;
		this.loopTimer+=1;
		this.opacity+=0.08;
		this.drawInputToLaunch();
	}

}