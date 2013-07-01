//MenuModel
//==============

// Includes file dependencies
define(["backbone"], function(Backbone) {
  // Menu item model constructor
  var STORAGE_KEY = "WEBMIX-MENU-MODEL";
  
  var MenuItem = Backbone.Model.extend({});

  // Menu item collection constructor
  var MenuItemCollection = Backbone.Collection.extend({
    initialize: function() {
      var menuData = this.defaultMenu;
      try {
        if(window.localStorage) {
          // read from persistent storage
          var storageData = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
          if(storageData instanceof Array) {
            menuData = storageData;
          }
          else {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(menuData));
          }
        }
      }
      catch(e) {
        //ignore
      }
      this.add(menuData);
      this.on("add remove change", function() {
        // write to persistent storage
        try {
          if(window.localStorage) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.toJSON()));
          }
        }
        catch(e) {
          //ignore
        }
      }, this);
    },
    model: MenuItem,
    defaultMenu: [{
      text: 'home',
      href: '#'
    }, {
      text: 'menu',
      href: '#menu'
    }],
    
  });
  
  // Creates menu collection object
  var menu = new MenuItemCollection();

  // Return the menu collection
  return menu;
});