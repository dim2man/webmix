//MenuView
//========

define(["backbone", "main", "menu/model", "jquery", "pure", "update"], function(Backbone, main, menuModel, $) {

  // Extends Backbone.View
  var MenuView = Backbone.View.extend({

    // The View Constructor
    initialize: function() {
      this.editItemBound = this.editItem.bind(this);
      this.deleteItemBound = this.deleteItem.bind(this);
      this.$editButton = $('[data-role="header"] a', this.$el);
      this.$footer = $('[data-role="footer"]', this.$el);
      this.$editButton.on("tap", this.edit.bind(this));
      this.$listview = $('ul[data-role="listview"]', this.$el);
      this.collection.on("add remove change", this.render, this); //binds render function when model changed
      this.render();
    },

    // Renders all of the Category models on the UI
    render: function() {
      console.log('in MenuView.render');

      var menuItems = this.collection.toJSON();
      // pure requires not-null parent for a node to be updated, 
      // therefore update parent node of the ul
      this.$listview.parent().update(function(){
        //remove all children except the first one
        this.$listview.children().not(':first-child').remove();
        //render new menu based on the first li node as template
        //this.$listview is set to the updated ul element
        this.$listview = this.$listview.render({
          menuItems: menuItems
        }, {
          'li':{
            'menuItem<-menuItems': {
              'a':'menuItem.text',
              'a@href':'menuItem.href',
            }
          }
        });
        this.updateClickHandlers();
      }, this);
      
      // Maintains chainability
      return this;
    },
    
    edit: function(e) {
      e.preventDefault();
      this.$editButton.toggleClass('ui-btn-active');
      this.$footer.toggleClass('ui-screen-hidden');
      this.$listview.update(function(){
        this.updateClickHandlers();
      }, this);
    },
    
    updateClickHandlers: function() {
      var $listItemActions = $('a', this.$listview); 
      var $listItemIcons = $('.ui-icon', this.$listview); 
      if(this.$editButton.hasClass('ui-btn-active')) {
        $listItemActions.on('tap', this.editItemBound);
        $listItemIcons.removeClass('ui-icon-arrow-r')
          .addClass('ui-icon-minus')
          .addClass('ui-icon-red')
          .css('z-index', 2)
          .on('tap', this.deleteItemBound);
      }
      else {
        $listItemActions.off('tap', this.editItemBound);
        $listItemIcons.removeClass('ui-icon-minus')
          .removeClass('ui-icon-red')
          .addClass('ui-icon-arrow-r')
          .css('z-index', 0)
          .off('tap', this.deleteItemBound);
      }
    },
    
    editItem: function(e) {
      e.preventDefault();
      var modelIndex = this.getModelIndexByElement(e.currentTarget);
      main.router.navigate('menuitem/'+modelIndex, {trigger: true});
    },
    
    deleteItem: function(e) {
      e.preventDefault();
      var modelIndex = this.getModelIndexByElement(e.currentTarget);
      this.collection.remove(this.collection.at(modelIndex));
    },
    
    getModelIndexByElement: function(el) {
      while(el !== null && el.nodeName != 'LI') {
        el = el.parentNode;
      }
      var index = 0;
      while(el !== null && el.previousElementSibling !== null) {
        el = el.previousElementSibling;
        index++;
      }
      return index;
    }

  });
  

  // Returns the View class
  return MenuView;

});