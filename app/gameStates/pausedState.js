BASE.namespace("app.gameStates");

app.gameStates.pausedState = function(){
  var self = this;

  var fn = {};

  fn.start = function(){

  };

  fn.pause = function(){};

  fn.input = function(){};

  fn.reset = function(){};

  self.states["defaultState"] = fn;

};
