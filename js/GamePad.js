var gamepadAPI = {
  controller: {},
  connect: function(evt){
    console.log("CONTROLLER CONNECTED!");
  },
  disconnect: function(evt){
    console.log("CONTROLLER DISCONNECTED!");
  },
  update: function(){},
  buttonPressed: function(){},
  buttons:[],
}
