BASE.namespace("app.gameStates");

app.gameStates.defaultState = function(){
  var self = this;

  var fn = {};

  fn.start = function(){
    self.notify({type:"notice", message:"Started!"});
    self.state = "runningState";
  };

  fn.pause = function(){};

  fn.input = function(){};

  fn.reset = function(){};

  self.states["defaultState"] = fn;

};
