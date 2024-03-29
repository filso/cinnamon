angular.module('ngAnimate-animate.css', ['ngAnimate'])
  .factory('animateCSSBuild', ['$timeout', function($timeout) {
    return function(baseClass, classNames) {
      if(arguments.length == 3) {
        var a = classNames;
        var b = arguments[2];
        classNames = {
          enter : a,
          move : a,
          leave : b,
          show : a,
          hide : b,
          addClass : a,
          removeClass : b
        };
      }
      var timeoutKey = '$$animate.css-timer';
      var animateCSSStart = function(element, className, delay, done) {
        if (className == 'fadeOut') {
          done();
          return;
          // TODO that's just a hack for now... not sure why it doesn't work, somehow adding 'animated' class makes angularjs
          // not finish transition.. there's no literal 'animated' in ngAnimate though, so I might want to inspect it later 
        }
        element.addClass(className);
        element.addClass('animated');
        var timer = $timeout(done, delay || 2000, false);
        element.data(timeoutKey, timer);
      };
      var animateCSSEnd = function(element, className) {
        return function(cancelled) {
          var timer = element.data(timeoutKey);
          if(timer) {
            $timeout.cancel(timer);
            element.removeData(timeoutKey);
          }
          element.removeClass(className);
          element.removeClass('animated');
        };
      };
      return {
        enter : function(element, done) {
          animateCSSStart(element, classNames.enter, classNames.delay, done);
          return animateCSSEnd(element, classNames.enter);
        },
        leave : function(element, done) {
          if (classNames.leave == "none") {
            $(element).hide();
            done();
            return function(cancelled) {

            };
          }
          // done();
          animateCSSStart(element, classNames.leave, classNames.delay, done);
          return animateCSSEnd(element, classNames.leave);
        },
        move : function(element, done) {
          animateCSSStart(element, classNames.move, classNames.delay, done);
          return animateCSSEnd(element, classNames.move);
        },
        beforeAddClass : function(element, className, done) {
          var klass = className == 'hide' && classNames.hide ?
            classNames.hide :
            angular.isFunction(classNames.addClass) ?
              (angular.noop || classNames.addClass(className)) :
              classNames.addClass;
          if(className == baseClass) {
            animateCSSStart(element, klass, classNames.delay, done);
            return animateCSSEnd(element, klass);
          }
          else {
            done();
          }
        },
        removeClass : function(element, className, done) {
          if(className == 'hide') {
            var klass = classNames.show;
            animateCSSStart(element, klass, classNames.delay, done);
            return animateCSSEnd(element, klass);
          }
          else {
            done();
          }
        },
        beforeRemoveClass : function(element, className, done) {
          if(className != 'hide') {
            var klass = angular.isFunction(classNames.removeClass) ?
                          (angular.noop || classNames.removeClass(className)) :
                          classNames.removeClass;
            if(className == baseClass) {
              animateCSSStart(element, klass, classNames.delay, done);
              return animateCSSEnd(element, klass);
            }
          }
          else {
            done();
          }
        }
      }
    };
  }])


  //
  // Flip Animations
  //
  .animation('.dn-flip-x', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-flip-x','flipInX','flipOutX');
  }])

  .animation('.dn-flip-y', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-flip-y','flipInY','flipOutY');
  }])

  //
  // Fade Animations
  //
  .animation('.dn-fade', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade','fadeIn','fadeOut');
  }])

  .animation('.dn-fade-up', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-up','fadeInUp','fadeOutUp');
  }])

  .animation('.dn-fade-down', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-down','fadeInDown','fadeOutDown');
  }])

  .animation('.dn-fade-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-left','fadeInLeft','fadeOutRight');
  }])

  .animation('.dn-fade-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-right','fadeInRight','fadeOutLeft');
  }])
  .animation('.dn-fade-right-only', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-right','fadeInRight','none');
  }])

  .animation('.dn-fade-up-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-up-big','fadeInUpBig','fadeOutUpBig');
  }])
  .animation('.dn-fade-down-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-down-big','fadeInDownBig','fadeOutDownBig');
  }])
  .animation('.dn-fade-left-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-left-big','fadeInLeftBig','fadeOutLeftBig');
  }])
  .animation('.dn-fade-right-big', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-fade-right-big','fadeInRightBig','fadeOutRightBig');
  }])
  .animation('.dn-bounce', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce','bounceIn','bounceOut');
  }])
  .animation('.dn-bounce-up', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-up','bounceInUp','bounceOutUp');
  }])
  .animation('.dn-bounce-down', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-down','bounceInDown','bounceOutDown');
  }])
  .animation('.dn-bounce-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-left','bounceInLeft','bounceOutLeft');
  }])
  .animation('.dn-bounce-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-bounce-right','bounceInRight','bounceOutRight');
  }])
  .animation('.dn-rotate', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate','rotateIn','rotateOut');
  }])
  .animation('.dn-rotate-up-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-up-left','rotateInUpLeft','rotateOutUpLeft');
  }])
  .animation('.dn-rotate-down-left', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-down-left','rotateInDownLeft','rotateOutDownLeft');
  }])
  .animation('.dn-rotate-up-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-up-right','rotateInUpRight','rotateOutUpRight');
  }])
  .animation('.dn-rotate-down-right', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-rotate-down-right','rotateInDownRight','rotateOutDownRight');
  }])
  .animation('.dn-lightspeed', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-lightspeed','lightSpeedIn','lightSpeedOut');
  }])
  .animation('.dn-roll', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-roll','rollIn','rollOut');
  }])
  .animation('.dn-hinge', ['animateCSSBuild', function(animateCSSBuild) {
    return animateCSSBuild('dn-hinge','fadeIn','hinge');
  }]);