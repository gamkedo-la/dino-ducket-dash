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

    const SKULL_DECAL_NUM = 1;
    const BONE_DECAL_NUM = 2;
    const CRACK_DECAL_NUM = 10;

    const decalsize = 10; // pixels per sprite on a horizontal spritesheet
    const drawSize = decalsize * PIXEL_SCALE_UP;
    const centerOffset = Math.round(-drawSize/2);

    var decalCount = 0;
    var decalCanvas = document.createElement("canvas");
    var decalContext = decalCanvas.getContext("2d"); 

    // ensure crisp pixels:
    // note: this is ignored! the following lines do nothing
    // fixed by setting these prior to drawing below
    // why? these appear to be reset if you resize the canvas
    decalCanvas.style.imageRendering="pixelated";
    decalContext.imageSmoothingEnabled = false;
	decalContext.msImageSmoothingEnabled = false;

    var decalSpritesheet = images.decals;
    decalSpritesheet.loaded = true;

	this.add = function(x,y,rot=0,alpha=0.025,spritenum=0) {
        if (!decalSpritesheet.loaded) return;
        decalCount++;
        
        // why are these still blurry?
        x = Math.round(x);
        y = Math.round(y);
        
        // debug spam to determine why the sprites are blurry
        // hmm all the coords and sizes are integers
       // console.log('decal '+decalCount+':'+x+','+y+','+rot+' alpha:'+alpha+' decalsize:'+decalsize+' centerOffset:'+centerOffset+' drawSize:'+drawSize);
        
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
        
        // this proves the coords are "crisp"
        //decalContext.fillStyle = "blue";
        //decalContext.fillRect(x+centerOffset,y+centerOffset,drawSize,drawSize,"BLUE");

        // ensure they are crisp (these settings are reset on a resize event!!!)
        decalContext.imageSmoothingEnabled = false;
        decalContext.msImageSmoothingEnabled = false;

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
        // FIXME: why is this blurry?
        canvasContext.drawImage(decalCanvas, 0, 0);
	};

	this.resize = function() {
        decalCanvas.width = canvas.width;
        decalCanvas.height = canvas.height;
        console.log("decalCanvas size: "+decalCanvas.width+"x"+decalCanvas.height);
	};

	this.clear = function() {
        this.resize();
        decalContext.clearRect(0, 0, decalCanvas.width, decalCanvas.height);
	};

    this.scatterDecorations = function() {
        this.clear(); // FORCES A RESIZE, TOO
        //console.log("Scattering decoration decals");
        var x,y,sprnum;
        for (var i=0; i<150; i++) {
            x = randomIntFromInterval(0,decalCanvas.width);
            y = randomIntFromInterval(0,decalCanvas.height);
            
            sprnum = randomIntFromInterval(3,9); // skip footsteps and bones
            
            // avoid center on either axis for a nice + shaped path
            if ((x<decalCanvas.width/2-80 || x>decalCanvas.width/2+80) &&
                (y<decalCanvas.height/2-80 || y>decalCanvas.height/2+80))
                this.add(x,y,0,1,sprnum);
        }
    }

    this.deathSplatter = function(x,y) {
        console.log("deathSplatter at "+x+","+y);
        this.add(x,y,0,1,SKULL_DECAL_NUM);
        for (var i=0; i<4; i++) {
            this.add(x+randomIntFromInterval(-50,50),
            y+randomIntFromInterval(-50,50),Math.random(Math.PI*2),
            1,BONE_DECAL_NUM);
        }
    }
    
    this.cracks = function(x,y) {
        x+=10; y+=10; // center
        console.log("cracks at "+x+","+y);
        this.add(x,y,Math.random(Math.PI*2),
        0.25,CRACK_DECAL_NUM);
    }

    this.resize(); // fun the first time right away

};
