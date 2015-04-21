BASE.require([
  "app.Game"
], function(){
  BASE.namespace("app");

  app.Main = function(elem, tags, scope) {
    var self = this;
    var game = new app.Game();
    var $title = $(tags['title']);
    var $input = $(tags['input']);

    var noticeObserver = game.observeType("notice", function(e){
      console.log(e.message);
    });

    scope.set("game", game);

    // This is cheating. I shouldn't be reaching outside the component
    // to listen for events.
    $(document).keypress(function(e){
      var key = event.keyCode || event.which;
      if (key >= 48 && key <= 57) {
        var keychar = String.fromCharCode(key);
        game.input(keychar);
      }
    });

    $(elem).on("enteredView", game.start);

  }

});
