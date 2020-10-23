function CharacterSelectScreen()
{
	this.x = 0;
	this.y = 0;
	this.width = 320;
	this.height = 240;

	this.sprite = images.menu_title;
	this.speed = 5;
	this.animColumns = 4;
	this.animRows = 1;
	this.currentFrame = 0;
	this.animationFrameDelay = 5;
	this.currentAnimationFrameDelay = 5;
	this.flipped = true;
	this.frameWidth = this.sprite.width / this.animColumns;
	this.frameHeight = this.sprite.height / this.animRows;
	this.sprite.loaded = true;

	this.greenDinoImage = images.green_player_idle_facing_right;
	this.blueDinoImage = images.blue_player_idle_facing_right;
	this.pinkDinoImage = images.pink_player_idle_facing_right;
	this.yellowDinoImage = images.yellow_player_idle_facing_right;

	this.characterImageWidth = canvas.width/5;
	this.characterImageHeight = canvas.height/4;

	this.position1XCoordinate = 0+(canvas.width*0.025);
	this.position2XCoordinate = canvas.width/4+(canvas.width*0.025);
	this.position3XCoordinate = canvas.width/2+(canvas.width*0.025);
	this.position4XCoordinate = canvas.width*0.75+(canvas.width*0.025);
	this.cachePlayMode = 10; //10 to let it run on as INIT
	this.playerID;

	this.arrayOfBoxPositions = [this.position1XCoordinate,this.position2XCoordinate,this.position3XCoordinate,this.position4XCoordinate];
	this.playerSelectBox = []

	this.init = function(){
		for(let i = 0; i <= playMode; i++)
		{
			this.playerSelectBox[i] =
			{
				boxPositionArrayIndex: i,
				playerID: i,
				positionY: canvas.height/2 - this.characterImageHeight/2,
				width: this.characterImageWidth,
				height: this.characterImageHeight,
				draw: function()
				{
					canvasContext.fillStyle = 'white';
					canvasContext.fillRect(characterSelectScreen.arrayOfBoxPositions[this.boxPositionArrayIndex],this.positionY, this.width,this.height);
					canvasContext.font = '15px "Press Start P"';
					let textWidth = canvasContext.measureText('Player ' + (i + 1)).width;
					canvasContext.fillText('Player ' + (i + 1), characterSelectScreen.arrayOfBoxPositions[this.boxPositionArrayIndex] + this.width/2 - textWidth/2,
										this.positionY + this.height + 30);
				},

				playerBoxMovesRight: function()
				{
					let samePlace = false;
					this.boxPositionArrayIndex++;
					if (this.boxPositionArrayIndex > 3)
					{
						this.boxPositionArrayIndex = 0;
					}

					for(let j = 0; j <= playMode; j++)
					{
						if( j != this.playerID)
						{
							if (this.boxPositionArrayIndex == characterSelectScreen.playerSelectBox[j].boxPositionArrayIndex)
							{
								samePlace = true;
							}
						}
					}
					if(samePlace == true)
					{
						this.playerBoxMovesRight();
					}
				},

				playerBoxMovesLeft: function()
				{
					let samePlace = false;
					this.boxPositionArrayIndex--;
					if (this.boxPositionArrayIndex < 0)
					{
						this.boxPositionArrayIndex = 3;
					}

					for(let j = 0; j <= playMode; j++)
					{
						if( j != this.playerID)
						{
							if (this.boxPositionArrayIndex == characterSelectScreen.playerSelectBox[j].boxPositionArrayIndex)
							{
								samePlace = true;	
							}
						}
					}
					if(samePlace == true)
					{
						this.playerBoxMovesLeft();
					}
				}
			}
		}
	}
	this.update = function()
	{
		if(this.cachePlayMode != playMode)
		{
			this.cachePlayMode = playMode;
			this.init();
		}
	}

	this.draw = function()
	{
		// animate(this,true);
		//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		for(let i = 0; i <= playMode; i++){
			this.playerSelectBox[i].draw();
		}

		canvasContext.drawImage(this.greenDinoImage, 0,0, 11,16, 
								this.position1XCoordinate,canvas.height/2 - this.characterImageHeight/2, 
								this.characterImageWidth,this.characterImageHeight);
		canvasContext.drawImage(this.blueDinoImage, 0,0, 11,16,
								this.position2XCoordinate,canvas.height/2 - this.characterImageHeight/2, 
								this.characterImageWidth,this.characterImageHeight);
		canvasContext.drawImage(this.pinkDinoImage, 0,0, 11,16,
								this.position3XCoordinate,canvas.height/2 - this.characterImageHeight/2, 
								this.characterImageWidth,this.characterImageHeight);
		canvasContext.drawImage(this.yellowDinoImage, 0,0, 11,16,
								this.position4XCoordinate,canvas.height/2 - this.characterImageHeight/2, 
								this.characterImageWidth,this.characterImageHeight);

		canvasContext.font = '35px "Press Start 2P"';
		let playerCountText = 'Press 1, 2, 3, 4 Players'
		let playerCountTextWidth = canvasContext.measureText(playerCountText).width;
		let pressEnterText = 'Press Enter to Start';
		let pressEnterTextWidth = canvasContext.measureText(pressEnterText).width;
		canvasContext.fillText(playerCountText, canvas.width/2 - playerCountTextWidth/2,canvas.height/2 - this.characterImageHeight/2 + this.characterImageHeight + 100);
		canvasContext.fillText(pressEnterText, canvas.width/2 - pressEnterTextWidth/2,canvas.height/2 - this.characterImageHeight/2 + this.characterImageHeight + 150);
	}

	this.assignSpriteSheets = function(playerNumber)
	{

		if (characterSelectScreen.playerSelectBox[playerNumber].boxPositionArrayIndex == 0)
		{
			playerArray[playerNumber].leftSprite = images.green_player_idle_facing_left;
			playerArray[playerNumber].rightSprite = images.green_player_idle_facing_right;
		}
		else if (characterSelectScreen.playerSelectBox[playerNumber].boxPositionArrayIndex == 1)
		{
			playerArray[playerNumber].leftSprite = images.blue_player_idle_facing_left;
			playerArray[playerNumber].rightSprite = images.blue_player_idle_facing_right;
		}
		else if (characterSelectScreen.playerSelectBox[playerNumber].boxPositionArrayIndex == 2)
		{
			playerArray[playerNumber].leftSprite = images.pink_player_idle_facing_left;
			playerArray[playerNumber].rightSprite = images.pink_player_idle_facing_right;
		}
		else if (characterSelectScreen.playerSelectBox[playerNumber].boxPositionArrayIndex == 3)
		{
			playerArray[playerNumber].leftSprite = images.yellow_player_idle_facing_left;
			playerArray[playerNumber].rightSprite = images.yellow_player_idle_facing_right;
		}
	}
}
