//A color structure
let Colors={gold:'#cdc29e', black: '#000000'};

function drawRect(atX,atY, rectWidth,rectHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(atX,atY, rectWidth*PIXEL_SCALE_UP, rectHeight*PIXEL_SCALE_UP);
}

 function colorTextShadow(showWords, textX, textY, fillColor="white", font = "Press Start 2P", align="left") {
    textX = Math.round(textX); // snap to integer coords for clearer text
    textY = Math.round(textY);
    canvasContext.textAlign = align;
    canvasContext.font = font;
    canvasContext.fillStyle = "black";
    canvasContext.fillText(showWords, textX+1, textY+1);
    canvasContext.strokeText(showWords, textX, textY);
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}

function cls(){
	//WARM UP: We could change this to using a variable instead of hard coding it
	//setting a default value of '#cdc29e' for the variable would preserve current behavior
	canvasContext.fillStyle = Colors.gold;
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, 10*PIXEL_SCALE_UP);
}

function animate(toAnimate,loop){
	//WARM UP: use each entity's "flipped" property to render them reversed. Trello card - https://trello.com/c/hMlK5Dfh
	if (!gameIsPaused)
	{
		toAnimate.currentAnimationFrameDelay--;
		if(toAnimate.currentAnimationFrameDelay <= 0){
		//console.log(toAnimate.currentFrame);
		toAnimate.currentFrame++;
		toAnimate.currentAnimationFrameDelay = toAnimate.animationFrameDelay;
		}

		var maxFrame = toAnimate.animColumns * toAnimate.animRows - 1;
		if(toAnimate.currentFrame > maxFrame){
			if(loop){
				toAnimate.currentFrame = 0;
			} else{
				toAnimate.currentFrame = maxFrame;
			}
			
		}
	}
		var column = toAnimate.currentFrame % toAnimate.animColumns;
		var row = Math.floor(toAnimate.currentFrame / toAnimate.animColumns);

	

	canvasContext.imageSmoothingEnabled = false;

	
    if (!toAnimate.sprite.loaded) {
		// we are still downloading the image!
		console.log(`Still loading the image?`)
        return;
	}
	
    canvasContext.drawImage(toAnimate.sprite,
							column*toAnimate.frameWidth,row*toAnimate.frameHeight,
							toAnimate.frameWidth,toAnimate.frameHeight,
							toAnimate.x,toAnimate.y,
							toAnimate.frameWidth*PIXEL_SCALE_UP,toAnimate.frameHeight*PIXEL_SCALE_UP);
}

function animateFrameToFrame(toAnimate,loop,frameStart,frameEnd){
	if (!gameIsPaused)
	{
		toAnimate.currentAnimationFrameDelay--;
		if(toAnimate.currentAnimationFrameDelay <= 0){
		//console.log(toAnimate.currentFrame);
		toAnimate.currentFrame++;
		toAnimate.currentAnimationFrameDelay = toAnimate.animationFrameDelay;
		}

		var maxFrame = frameEnd-1;
		if(toAnimate.currentFrame > maxFrame){
			if(loop){
				toAnimate.currentFrame = frameStart-1;
			} else{
				toAnimate.currentFrame = maxFrame;
			}
			
		}
	}
		var column = toAnimate.currentFrame % toAnimate.animColumns;
		var row = Math.floor(toAnimate.currentFrame / toAnimate.animColumns);

	

	canvasContext.imageSmoothingEnabled = false;

	
    if (!toAnimate.sprite.loaded) {
		// we are still downloading the image!
		console.log(`Still loading the image?`)
        return;
	}
	
    canvasContext.drawImage(toAnimate.sprite,
							column*toAnimate.frameWidth,row*toAnimate.frameHeight,
							toAnimate.frameWidth,toAnimate.frameHeight,
							toAnimate.x,toAnimate.y,
							toAnimate.frameWidth*PIXEL_SCALE_UP,toAnimate.frameHeight*PIXEL_SCALE_UP);
}

function DrawOverlay(img,pos_x,pos_y,dimen_x,dimen_y)
{
	canvasContext.save();
	canvasContext.globalAlpha=0.4;
    canvasContext.drawImage(img,pos_x,pos_y,dimen_x*PIXEL_SCALE_UP,dimen_y*PIXEL_SCALE_UP);
	canvasContext.restore();
}
