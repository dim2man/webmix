define(["backbone", "jquery", "main"], function(Backbone, $, main) {
  var defaults = {
    title: 'Input',
    label: 'Enter string',
    value: ''
  };
  
  var InputView = Backbone.View.extend({

    initialize: function() {
      this.$h1 = $('h1', this.$el);
      this.$label = $('label', this.$el);
      this.$input = $('input', this.$el);
      this.$saveButton = $('a:last', this.$el);
      this.$saveButton.on('tap', this.save.bind(this));
    },
    
    setup: function(title, label, value, callback) {
      this.model = $.extend({}, defaults);
      title && (this.model.title = title);
      label && (this.model.label = label);
      value && (this.model.value = value);
      this.model.callback = callback;
    },
    
    render: function() {
      this.$h1.text(this.model.title);
      this.$label.text(this.model.label);
      this.$input.val(this.model.value);
      return this;
    },
    
    save: function(e) {
      e.preventDefault();
      main.router.navigate(this.model.callback+encodeURIComponent(this.$input.val()), {trigger: true});
    },
  });

  return new InputView({
    el: '#input'
  });
});