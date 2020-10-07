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
    var decalContext = decalCanvas.getContext('2d'); 
    decalContext.imageSmoothingEnabled = false;
	decalContext.msImageSmoothingEnabled = false;

    var decalSpritesheet = new Image();
    decalSpritesheet.onload = function(e) { decalSpritesheet.loaded = true; }
    decalSpritesheet.src = "images/decals.png";

	this.add = function(x,y,rot=0,alpha=0.25,spritenum=0) {
        if (!decalSpritesheet.loaded) return;
        decalCount++;
		console.log('decal '+decalCount+':'+x+','+y+','+rot+' alpha:'+alpha);
		decalContext.save();
		decalContext.translate(x,y);
		decalContext.rotate(rot);
		decalContext.globalAlpha = alpha;
        decalContext.drawImage(
            decalSpritesheet, 
            spritenum * decalsize, 0, 
            decalsize, decalsize, 
            centerOffset, centerOffset,
            drawSize, drawSize);
		decalContext.restore()
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

    this.resize(); // fun the first time right away

};