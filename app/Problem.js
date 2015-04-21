BASE.require([], function(){
  BASE.namespace("app");

  app.Problem = function(elem, tags, scope) {
    var self = this;
    var $firstFactor = $(tags['firstFactor']);
    var $secondFactor = $(tags['secondFactor']);
    var $operator = $(tags['operator']);

    var problemHandler = function(e){
      $firstFactor.text(e.firstFactor);
      $secondFactor.text(e.secondFactor);
    };

    $(elem).on("enteredView", function(){
      var game = scope.get("game");
      game.observeType("problem", problemHandler);
    });
  }

});
