let timePassed = 0.0;
let hasBeenPressed = false;
let timeLimit = 200;

function menuUpdate(time){
    var gamepads = navigator.getGamepads();
    // make sure we have at least one controller

    if(gamepads.length < 1) {
        return;
    }
    else
    {
        //gamepad for player one exists
        let p1_Gamepad=gamepads[0];

        if(hasBeenPressed === true && timePassed <= timeLimit){
            timePassed += time;
            return;
        } else if (hasBeenPressed === true && timePassed > timeLimit) {
            hasBeenPressed = false;
        }
        if(p1_Gamepad!=null)
        {
            if(gamepads[0].axes[1] < -0.5 || gamepads[0].axes[1] != null) {
                hasBeenPressed = true;
                let evt = {
                    code: KEY_UP
                }
                detectKeyPresses(evt);
            } 
            else if(gamepads[0].axes[1] > 0.5) {
                hasBeenPressed = true;
                let evt = {
                    code: KEY_DOWN
                }
                detectKeyPresses(evt);
            }
            if(gamepads[0].buttons[0].pressed){
                let evt = {
                    code:  ENTER
                }
                keyPressed(evt);
            }
        }
        timePassed = 0.0;    
    }
}