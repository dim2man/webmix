define(["jquery"], function($) {
  $.fn.update = function(updateFunc, context) {
    this.each(function(){
      var parent = this.parentNode;
      var next = this.nextSibling;
      parent.removeChild(this);
      try {
        updateFunc.call(context ? context : $(this));
      }
      finally {
        if(next !== null) {
          parent.insertBefore(this, next);
        }
        else {
          parent.appendChild(this);
        }
      }
    });
    return this;
  };
});