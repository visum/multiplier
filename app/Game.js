BASE.require([
  "BASE.util.Observable",
  "app.gameStates.defaultState",
  "app.gameStates.runningState",
  "app.gameStates.pausedState"
], function(){

  BASE.namespace("app");

  app.Game = function(){
    var self = this;

    self.state = "defaultState";
    self.states = {};
    BASE.util.Observable.call(self);
    app.gameStates.defaultState.call(self);
    app.gameStates.runningState.call(self);
    app.gameStates.pausedState.call(self);

    self.start = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      self.states[self.state].start.apply(self, args);
    };

    self.pause = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      self.states[self.state].pause.apply(self, args);
    };

    self.restart = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      self.states[self.state].restart.apply(self, args);
    };

    self.input = function(char) {
      var args = Array.prototype.slice.call(arguments, 0);
      self.states[self.state].input.apply(self, args);
    };


  };

});
