function drawRect(atX,atY, rectWidth,rectHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(atX,atY, rectWidth*PIXEL_SCALE_UP, rectHeight*PIXEL_SCALE_UP);
}

function cls(){
	canvasContext.fillStyle = '#cdc29e';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
}

function animate(toAnimate){
	toAnimate.animationFrameDelay--
	if(toAnimate.animationFrameDelay <= 0){
		//console.log(toAnimate.currentFrame);
		toAnimate.currentFrame++;
		toAnimate.animationFrameDelay = ANIMATION_DELAY;
	}

	var maxFrame = toAnimate.animColumns * toAnimate.animRows - 1;
	if(toAnimate.currentFrame > maxFrame){
		toAnimate.currentFrame = 0;
	}

	var column = toAnimate.currentFrame % toAnimate.animColumns;
	var row = Math.floor(toAnimate.currentFrame / toAnimate.animColumns);

	canvasContext.imageSmoothingEnabled = false;
	canvasContext.drawImage(toAnimate.sprite,
							column*toAnimate.frameWidth,row*toAnimate.frameHeight,
							toAnimate.frameWidth,toAnimate.frameHeight,
							toAnimate.x,toAnimate.y,
							toAnimate.frameWidth*PIXEL_SCALE_UP,toAnimate.frameHeight*PIXEL_SCALE_UP);
}
