BASE.namespace("app.gameStates");

app.gameStates.defaultState = function(){
  var self = this;

  var fn = {};

  fn.start = function(){
    self.notify({type:"notice", message:"Started!"});
    self.state = "runningState";
    // The kick-off!
    self.states[self.state].newProblem();
  };

  fn.pause = function(){};

  fn.input = function(){};

  fn.reset = function(){};
  fn.newProblem = function(){};

  self.states["defaultState"] = fn;

};
