window.isDefined = angular.isDefined;

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}


_.mixin({
  'capitalize': function(string) {
    return string.charAt(0)
      .toUpperCase() + string.slice(1)
      .toLowerCase();
  }
});


// We're using jQuery.transit for animation (which uses CSS3).
// If the browser supports it, make sure to use it (otherwise
// use jQuery's standard .animate)
if (!$.support.transition) {
  $.fn.transition = $.fn.animate;
}

function valueFn(value) {
  return function() {
    return value;
  };
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}


(function($) {
  $.fn.wysiwygEvt = function() {
    return this.each(function() {
      var $this = $(this);
      var htmlold = $this.html();
      $this.bind('keyup', function() {
        var htmlnew = $this.html();
        if (htmlold !== htmlnew) {
          $this.trigger('change');
        }
      })
    })
  }
})(jQuery);