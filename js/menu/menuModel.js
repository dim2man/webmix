//MenuModel
//==============

// Includes file dependencies
define(["backbone"], function(Backbone) {
  // Menu item model constructor
  var MenuItem = Backbone.Model.extend({});

  // Menu item collection constructor
  var MenuItemCollection = Backbone.Collection.extend({
    model: MenuItem
  });

  // Creates menu collection object
  var menu = new MenuItemCollection([{
    text: 'home',
    href: '#'
  }, {
    text: 'menu',
    href: '#menu'
  }]);

  // Return the menu collection
  return menu;
});