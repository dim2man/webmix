require(['main', 'router'], function(mainModule, Router) {

  test("Backbone router", function() {
    ok(mainModule.router != null, "Router object is not null");
    ok(mainModule.router instanceof Router, "Router object is of type Router");
  });

});
