BASE.require([
  "BASE.util.Observable"
], function(){

  BASE.namespace("app");

  app.Game = function(){
    var self = this;
    BASE.util.Observable.call(self);

    self.start = function(){
      self.notify({type:"notice", message:"Started!"});
    };
  };

});
