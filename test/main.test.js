require.config({
  baseUrl: "../js"
});
require([
  'main',
  //Place all your test modules below
  'router.test'
].map(function(item){
  //maps all modules finished by .test to be loaded from test directory
  return item.search(/\.test$/) >= 0 ? "../test/"+item : item;
}), function(mainModule) {

  test("Main module export", function() {
    ok(typeof mainModule == 'object', "Main module exports an object");
  });

  QUnit.start();
});
