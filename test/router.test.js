require(['main', 'router', 'jquerymobile'], function(mainModule, Router) {

  test("Backbone router", function() {
    ok(mainModule.router !== undefined, "Router object is defined");
    ok(mainModule.router instanceof Router, "Router object is of type Router");
  });

});
