require.config({
  paths: {
    // Core Libraries
    "jquery": "lib/jquery-2.0.0.min",
    "jquerymobile": "lib/jquery.mobile-1.3.1.min",
    "underscore": "lib/underscore-min",
    "backbone": "lib/backbone-min",
    "pure": "lib/pure",
    "update": "plugins/jquery.update"
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    "backbone": {
      "deps": ["underscore", "jquery"],
      "exports": "Backbone" // attaches "Backbone" to the window object
    },
    "pure": {
      "deps": ["jquery"],
      "exports": "$p" // attaches "$p" to the window object
    }
  }
});

// Includes File Dependencies
require(["jquery", "backbone", "router"], function($, Backbone, Router) {

  $(document).on("mobileinit", function() {
    // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
    
    document.body.style.visibility = "visible";
    console.log("Logo display time: "+(new Date()).valueOf());
  });

  require(["jquerymobile"], function() {
    // Instantiates a new Backbone.js Mobile Router
    this.router = new Router();
  });
});