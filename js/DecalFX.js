// DecalFX by McFunky
// an overlay canvas that can be drawn onto
// for large numbers of scorchmarks, skidmarks, dents, mud, etc

// is renders mega fast - in a single draw call - should never affect fps

// how to use:
// var decals = new decalManager(); // only run this once
// decals.add(image,x,y,rot,alpha); // run as often as needed
// decals.draw(); // run this every frame
// decals.clear(); // if we need to erase everything

var decalManager = function() {

    console.log("Decal FX canvas initializing");

    const decalsize = 10; // pixels per sprite on a horizontal spritesheet
    const drawSize = decalsize * PIXEL_SCALE_UP;
    const centerOffset = Math.round(-drawSize/2);

    var decalCount = 0;
    var decalCanvas = document.createElement("canvas");
    var decalContext = decalCanvas.getContext("2d"); 

    // FIXME sadly this seems to not do anything
    decalCanvas.style.imageRendering="pixelated";
    decalContext.imageSmoothingEnabled = false;
	decalContext.msImageSmoothingEnabled = false;

    var decalSpritesheet = new Image();
    decalSpritesheet.onload = function(e) { decalSpritesheet.loaded = true; }
    decalSpritesheet.src = "images/decals.png";

	this.add = function(x,y,rot=0,alpha=0.025,spritenum=0) {
        if (!decalSpritesheet.loaded) return;
        decalCount++;
        x = Math.round(x);
        y = Math.round(y);
        
        // debug spam to determine why the sprites are blurry
        console.log('decal '+decalCount+':'+x+','+y+','+rot+' alpha:'+alpha+' decalsize:'+decalsize+' centerOffset:'+centerOffset+' drawSize:'+drawSize);
        
        // rotated and scaled - works great but seems blurry
        /*
        decalContext.save();
		decalContext.translate(x,y);
		if (rot) decalContext.rotate(rot);
		decalContext.globalAlpha = alpha;
        decalContext.drawImage(
            decalSpritesheet, 
            spritenum * decalsize, 0, 
            decalsize, decalsize, 
            centerOffset, centerOffset,
            drawSize, drawSize);
        decalContext.restore();
        */
        
        // no rotation but still scaled
        decalContext.globalAlpha = alpha;
        decalContext.drawImage(
            decalSpritesheet, 
            spritenum * decalsize, 0, 
            decalsize, decalsize, 
            x+centerOffset, y+centerOffset,
            drawSize, drawSize);

	};

    this.draw = function() {
		canvasContext.drawImage(decalCanvas, 0, 0);
	};

	this.resize = function() {
        decalCanvas.width = canvas.width;
        decalCanvas.height = canvas.height;
        console.log("decalCanvas resized to "+decalCanvas.width+"x"+decalCanvas.height);
	};

	this.clear = function() {
        this.resize();
        decalCanvas.clearRect(0, 0, decalCanvas.width, decalCanvas.height);
	};

    this.scatterDecorations = function() {
        //console.log("Scattering decoration decals");
        var x,y,sprnum;
        for (var x,y,sprnum,i=0; i<150; i++) {
            x = randomIntFromInterval(0,decalCanvas.width);
            y = randomIntFromInterval(0,decalCanvas.height);
            sprnum = randomIntFromInterval(3,9); // skip footsteps and bones
            // avoid center
            if ((x<decalCanvas.width/2-80 || x>decalCanvas.width/2+80) &&
                (y<decalCanvas.height/2-80 || y>decalCanvas.height/2+80))
                this.add(x,y,0,1,sprnum);
        }
    }

    this.deathSplatter = function(x,y) {
        console.log("deathSplatter");
        var x,y,sprnum;
        this.add(x,y,0,1,1); // skull
        for (var i=0; i<4; i++) {
            this.add(x+randomIntFromInterval(-50,50),
            y+randomIntFromInterval(-50,50),0,1,2); // bone
        }
    }

    this.resize(); // fun the first time right away

};
