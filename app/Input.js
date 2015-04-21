BASE.require([], function(){
  BASE.namespace("app");

  app.Input = function(elem, tags, scope) {
    var self = this;
    var $response = $(tags['response']);

    var inputHandler = function(e){
      if (e.clear) {
        $response.text("");
      } else {
        $response.text($response.text() + e.value);
      }
    };


    $(elem).on("enteredView", function(){
      var game = scope.get("game");
      game.observeType("input", inputHandler);
    });


  }

});
