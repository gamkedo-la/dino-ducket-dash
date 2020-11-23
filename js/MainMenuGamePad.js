let timePassed = 0.0;
let hasBeenPressed = false;
let timeLimit = 200;

function menuUpdate(time){
    var gamepads = navigator.getGamepads();

    // make sure we have at least one controller
    // the extra null checks avoid an error below due to chrome permissions
    if(gamepads.length < 1 || !gamepads[0] || !gamepads[0].axes) { 
        return;
    }
    else
    {
        if(hasBeenPressed === true && timePassed <= timeLimit){
            timePassed += time;
            return;
        } else if (hasBeenPressed === true && timePassed > timeLimit) {
            hasBeenPressed = false;


        }
    // note: gamepads.length can be >0 but gamepads[0] can be undefined!!!
        if(gamepads[0].axes[1] < -0.5 || gamepads[0].axes[1] != null) {
            hasBeenPressed = true;
            let evt = {
                code: KEY_UP
            }
            detectKeyPresses(evt);
        } 
        else if(gamepads[0].axes[1]> 0.5) {
            hasBeenPressed = true;
            let evt = {
                code: KEY_DOWN
            }
            detectKeyPresses(evt);
        } 
        if(gamepads[0].buttons[0] || buttons[1] || buttons[2] || buttons[3].pressed){
            let evt = {
                code:  ENTER
            }
            keyPressed(evt);
        }

        if(gamepads.length > 0 && gamepads[this.gamepadID] && gamepads[this.gamepadID].buttons!=undefined){
            if(gamepads[0].buttons[9].pressed){
                let evt = {
                    code:  KEY_P
                }
                keyPressed(evt);
            }
            
            if(gamepads[0].buttons[7].pressed) {
                hasBeenPressed = true;
                let evt = {
                    code: KEY_P
                }
                detectKeyPresses(evt);
            } 
            if(gamepads[0].buttons[5].pressed){
                let evt = {
                    code:  KEY_UP
                }
                keyPressed(evt);
            }
            if(gamepads[0].buttons[6].pressed){
                let evt = {
                    code:  KEY_DOWN
                }
                keyPressed(evt);
            }
            if(gamepads[0].buttons[7].pressed){
                let evt = {
                    code:  KEY_LEFT
                }
                keyPressed(evt);
            }
            if(gamepads[0].buttons[8].pressed){
                let evt = {
                    code:  KEY_RIGHT
                }
                keyPressed(evt);
            }
        }
        
        timePassed = 0.0;    
    }
}