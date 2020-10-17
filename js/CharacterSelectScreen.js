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

	this.arrayOfBoxPositions = [this.position1XCoordinate,this.position2XCoordinate,this.position3XCoordinate,this.position4XCoordinate];

	this.player1SelectBox =
	{
		boxPositionArrayIndex: 0,
		positionY: canvas.height/2 - this.characterImageHeight/2,
		width: this.characterImageWidth,
		height: this.characterImageHeight,
		draw: function()
		{
			canvasContext.fillStyle = 'white';
			canvasContext.fillRect(characterSelectScreen.arrayOfBoxPositions[this.boxPositionArrayIndex],this.positionY, this.width,this.height);
			canvasContext.font = '30px Helvetica';
			let textWidth = canvasContext.measureText('Player 1').width;
			canvasContext.fillText('Player 1', characterSelectScreen.arrayOfBoxPositions[this.boxPositionArrayIndex] + this.width/2 - textWidth/2,
								   this.positionY + this.height + 30);
		},

		player1BoxMovesRight: function()
		{
			characterSelectScreen.player1SelectBox.boxPositionArrayIndex++;
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex > 3 )
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex = 0;
			}
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex === characterSelectScreen.player2SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex++;
			}
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex > 3 )
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex = 0;
			}
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex === characterSelectScreen.player2SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex++;
			}
		},
		player1BoxMovesLeft: function()
		{
			characterSelectScreen.player1SelectBox.boxPositionArrayIndex--;
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex < 0)
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex = 3;
			}
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex === characterSelectScreen.player2SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex--;
			}
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex < 0)
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex = 3;
			}
			if (characterSelectScreen.player1SelectBox.boxPositionArrayIndex === characterSelectScreen.player2SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player1SelectBox.boxPositionArrayIndex--;
			}
		}
	}

	this.player2SelectBox = 
	{
		boxPositionArrayIndex: 3,
		positionY: canvas.height/2 - this.characterImageHeight/2,
		width: this.characterImageWidth,
		height: this.characterImageHeight,
		draw: function()
		{
			canvasContext.fillStyle = 'white';
			canvasContext.fillRect(characterSelectScreen.arrayOfBoxPositions[this.boxPositionArrayIndex],this.positionY, this.width,this.height);
			canvasContext.font = '30px Helvetica';
			let textWidth = canvasContext.measureText('Player 2').width;
			canvasContext.fillText('Player 2', characterSelectScreen.arrayOfBoxPositions[this.boxPositionArrayIndex] + this.width/2 - textWidth/2,
								   this.positionY + this.height + 30);
		},

		player2BoxMovesRight: function()
		{
			characterSelectScreen.player2SelectBox.boxPositionArrayIndex++;
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex > 3 )
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex = 0;
			}
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex === characterSelectScreen.player1SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex++;
			}
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex > 3 )
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex = 0;
			}
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex === characterSelectScreen.player1SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex++;
			}
		},
		player2BoxMovesLeft: function()
		{
			characterSelectScreen.player2SelectBox.boxPositionArrayIndex--;
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex < 0)
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex = 3;
			}
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex === characterSelectScreen.player1SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex--;
			}
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex < 0)
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex = 3;
			}
			if (characterSelectScreen.player2SelectBox.boxPositionArrayIndex === characterSelectScreen.player1SelectBox.boxPositionArrayIndex)
			{
				characterSelectScreen.player2SelectBox.boxPositionArrayIndex--;
			}
		}
	}


	this.update = function()
	{

	}

	this.draw = function()
	{
		animate(this,true);
		//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		this.player1SelectBox.draw();
		this.player2SelectBox.draw();

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

		canvasContext.font = '100px Helvetica';
		let pressEnterText = 'Press Enter to Start';
		let pressEnterTextWidth = canvasContext.measureText(this.pressEnterText).width;
		canvasContext.fillText(pressEnterText, canvas.width/2 - pressEnterTextWidth,canvas.height/2 - this.characterImageHeight/2 + this.characterImageHeight + 150);
	}

	this.assignSpriteSheets = function()
	{
		if (this.player1SelectBox.boxPositionArrayIndex === 0)
		{
			player.leftSprite = images.green_player_idle_facing_left;
			player.rightSprite = images.green_player_idle_facing_right;
		}
		else if (this.player1SelectBox.boxPositionArrayIndex === 1)
		{
			player.leftSprite = images.blue_player_idle_facing_left;
			player.rightSprite = images.blue_player_idle_facing_right;
		}
		else if (this.player1SelectBox.boxPositionArrayIndex === 2)
		{
			player.leftSprite = images.pink_player_idle_facing_left;
			player.rightSprite = images.pink_player_idle_facing_right;
		}
		else if (this.player1SelectBox.boxPositionArrayIndex === 3)
		{
			player.leftSprite = images.yellow_player_idle_facing_left;
			player.rightSprite = images.yellow_player_idle_facing_right;
		}



		if (this.player2SelectBox.boxPositionArrayIndex === 0)
		{
			player2.leftSprite = images.green_player_idle_facing_left;
			player2.rightSprite = images.green_player_idle_facing_right;
		}
		else if (this.player2SelectBox.boxPositionArrayIndex === 1)
		{
			player2.leftSprite = images.blue_player_idle_facing_left;
			player2.rightSprite = images.blue_player_idle_facing_right;
		}
		else if (this.player2SelectBox.boxPositionArrayIndex === 2)
		{
			player2.leftSprite = images.pink_player_idle_facing_left;
			player2.rightSprite = images.pink_player_idle_facing_right;
		}
		else if (this.player2SelectBox.boxPositionArrayIndex === 3)
		{
			player2.leftSprite = images.yellow_player_idle_facing_left;
			player2.rightSprite = images.yellow_player_idle_facing_right;
		}
	}
}