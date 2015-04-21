BASE.namespace("app.gameStates");

app.gameStates.runningState = function(){
  var self = this;

  var fn = {};

  var currentInput = [];
  var currentAnswer = [];

  var firstFactorMin = 1;
  var firstFactorMax = 4;
  var secondFactorMin = 1;
  var secondFactorMax = 4;

  var unsolvedState = {};
  unsolvedState.input = function(number) {
    if (number > 0) {
      pushInput(number);
      state = solvingState;
    }
  }

  var solvingState = {};
  solvingState.input = function(number) {
    pushInput(number);
  }

  var state = unsolvedState;

  var pushInput = function(number) {
    var inputIndex = currentInput.length;
    if (number !== currentAnswer[inputIndex]) {
      wrong();
    } else {
      self.notify({type:"input", clear:false, value:number});
      if (inputIndex === currentAnswer.length -1) {
        solved();
      }
    }
  }

  var wrong = function(){
    self.notify({type:"feedback", value:"wrong"});
    clear();
    fn.newProblem();
  };

  var solved = function(){
    self.notify({type:"feedback", value:"solved"});
    clear();
    fn.newProblem();
  };

  var clear = function(){
    self.notify({type:"input", clear: true});
    currentInput = [];
    state = unsolvedState;
  };

  var randomIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  fn.newProblem = function(){
    var firstFactor = randomIntInRange(firstFactorMin, firstFactorMax);
    var secondFactor = randomIntInRange(secondFactorMin, secondFactorMax);
    var answer = firstFactor * secondFactor;
    var answerString = String(answer);
    currentAnswer = Array.prototype.slice.call(answerString, 0).map(function(n){return parseInt(n, 10)});
    self.notify({type:"problem", firstFactor:firstFactor, secondFactor:secondFactor});
  };

  fn.start = function(){};

  fn.pause = function(){
    self.state = "pausedState";
  };

  fn.input = function(char){
    var number = parseInt(char, 10);
    state.input(number);
  };

  fn.reset = function(){};

  self.states["runningState"] = fn;

};
