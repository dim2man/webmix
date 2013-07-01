// Includes file dependencies
define(["jquery", "backbone"], function($, Backbone) {

  // Extends Backbone.Router
  var Router = Backbone.Router.extend({

    // The Router constructor
    initialize: function() {
      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();
    },

    // Backbone.js Routes
    routes: {
      "": "home",
      "menu": "menu",
      "menuitem(/:index)": "menuitem"
    },

    // Home method
    home: function() {
      console.log("Home route started");
      $.mobile.changePage("#logo", {
        reverse: false,
        changeHash: false
      });
      
      //route to menu after some timeout
      //setTimeout(this.navigate.bind(this, "menu", {trigger: true}), 3000);
      this.navigate("menu", {trigger: true});
    },
    
    menu: function() {
      if(!this.menuView) {
        require(["menu/menuView", "menu/menuModel"], (function(MenuView, menuModel) {
          this.menuView = new MenuView({
            el: '#menu',
            collection: menuModel
          });
          this.menu();
        }).bind(this));
      }
      else {
        console.log("Menu route started");
        $.mobile.changePage("#menu", {
          reverse: false,
          changeHash: false
        });
      }
    },

    menuitem: function(index) {
      if(!this.menuItemView) {
        require(["menu/menuItemView"], (function(MenuItemView) {
          this.menuItemView = new MenuItemView({
            el: '#menuItem'
          });
          this.menuitem(index);
        }).bind(this));
      }
      else {
        console.log("Menu item route started, index: "+index);
        require(["menu/menuModel"], (function(menuModel) {
          if(index !== undefined) {
            index = parseInt(index, 10);
            this.menuItemView.model = index >= 0 ? menuModel.at(index) : null;
          }
          else {
            this.menuItemView.model = null;
          }
          this.menuItemView.collection = menuModel;
          this.menuItemView.render();
          $.mobile.changePage("#menuItem", {
            reverse: false,
            changeHash: false
          });
        }).bind(this));
      }
    },

  });

  // Returns the Router class
  return Router;

});