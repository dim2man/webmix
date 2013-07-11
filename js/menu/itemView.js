define(["backbone", "jquery", "pure", "update"], function(Backbone, $) {

  // Extends Backbone.View
  var MenuItemView = Backbone.View.extend({

    initialize: function() {
      this.$saveButton = $('[data-role="header"] a:eq(1)', this.$el);
      this.$saveButton.on('tap', this.save.bind(this));
    },

    render: function() {
      var data = this.model ? this.model.toJSON() : {
        text: '',
        href: ''
      };
      $('[data-role="content"]', this.$el).render(data, {
        '#menuItemText@value': 'text',
        '#menuItemHref@value': 'href'
      });
    },

    save: function(e) {
      console.log('Save action');
      var data = {
        text: $('#menuItemText', this.$el).val(),
        href: $('#menuItemHref', this.$el).val()
      };
      if(this.model) {
        this.model.set(data);
      }
      else {
        this.collection.add(data);
      }
    }

  });

  return MenuItemView;
});
