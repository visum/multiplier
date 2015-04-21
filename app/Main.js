BASE.require([
  "app.Game"
], function(){
  BASE.namespace("app");

  app.Main = function(elem, tags, scope) {
    var self = this;
    var game = new app.Game();
    var $title = $(tags['title']);

    var gameObserver = game.observe();

    gameObserver.onEach(function(e){
      $title.text(e.message);
    });

    scope.set("game", game);

    game.start();
  }

});
