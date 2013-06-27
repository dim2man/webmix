require.config({
  baseUrl: "../js"
});
require(['main', '../test/router.test'], function(mainModule) {

  test("Main module export", function() {
    ok(typeof mainModule == 'object', "Main module exports an object");
  });

  QUnit.start();
});
