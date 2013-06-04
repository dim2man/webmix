//MenuView
//========

define(["backbone", "menu/menuModel", "jquery", "pure", "update"], function(Backbone, menuModel, $) {

  // Extends Backbone.View
  var MenuView = Backbone.View.extend({

    // The View Constructor
    initialize: function() {

      console.log('in MenuView.initialize');
      this.$listview = null;
      // The render method is called when Category Models are added to the Collection
      //this.collection.on("added", this.render, this);

    },

    // Renders all of the Category models on the UI
    render: function() {
      console.log('in MenuView.render');

      var $listview = $('ul[data-role="listview"]', this.$el);
      // pure requires not-null parent for a node to be updated, 
      // therefore update parent node of the ul
      $listview.parent().update(function(){
        //remove all children except the first one
        $listview.children().not(':first-child').remove();
        //render new menu based on the first li node as template
        $listview.render({
          menuItems: [{
            text: 'home',
            href: '#'
          }, {
            text: 'menu',
            href: '#menu'
          }]
        }, {
          'li':{
            'menuItem<-menuItems': {
              'a':'menuItem.text',
              'a@href':'menuItem.href',
            }
          }
        });
      });

      // Maintains chainability
      return this;
    }

  });

  // Returns the View class
  return MenuView;

});