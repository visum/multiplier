BASE.require([], function(){
  BASE.namespace("app");

  app.Feedback = function(elem, tags, scope) {
    var self = this;
    var $output = $(tags["output"]);
    var messageFuture = BASE.async.Future.fromResult(null);

    var feedbackHandler = function(e){
      $output.text(e.value);
      messageFuture.cancel();
      messageFuture = new BASE.async.Future(function(setValue, setError){
        setTimeout(2000, setValue);
      }).then(function(){
        $output.text("");
      });
    };

    $(elem).on("enteredView", function(){
      var game = scope.get("game");
      game.observeType("feedback", feedbackHandler);
    });

  }
});
