(function(module) {
try {
  module = angular.module('cinnamon.templates');
} catch (e) {
  module = angular.module('cinnamon.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/index.html',
    '<!doctype html>\n' +
    '<html ng-app="cinnamon">\n' +
    '<head>\n' +
    '\n' +
    '\n' +
    '  <meta charset="utf-8">\n' +
    '  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n' +
    '  <title>Cinnamon - synonyms-aware editor</title>\n' +
    '  <meta name="description" content="">\n' +
    '  <meta name="viewport" content="width=device-width">\n' +
    '\n' +
    '  <link rel="stylesheet" href="styles/main.css">\n' +
    '  <link rel="stylesheet" href="styles/lib/animate.min.css">\n' +
    '\n' +
    '  <link rel="stylesheet" href="http://static1.busuu.com/misc/jquery.keypad-1.4.2.css">\n' +
    '  <!-- Latest compiled and minified CSS -->\n' +
    '  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">\n' +
    '  <!-- Optional theme -->\n' +
    '  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">\n' +
    '\n' +
    '\n' +
    '  <style type="text/css">\n' +
    '  [ng\\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {\n' +
    '    display: none !important;\n' +
    '  }\n' +
    '  </style>\n' +
    '\n' +
    '</head>\n' +
    '\n' +
    '<body>\n' +
    '  <div class="table-wrapper">\n' +
    '    \n' +
    '    <ng-include src="\'template/sidepanel.html\'" ng-controller="SidepanelCtrl" class="sidepanel"></ng-include>\n' +
    '\n' +
    '    <!-- Add your site or application content here -->\n' +
    '    <div class="dn-fade" ui-view></div>\n' +
    '\n' +
    '  </div>\n' +
    '\n' +
    '  <!-- Latest compiled and minified JavaScript -->\n' +
    '\n' +
    '  <script src="bower_components/jquery/jquery.min.js"></script>\n' +
    '\n' +
    '  <script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>\n' +
    '  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>\n' +
    '  \n' +
    '  <link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>\n' +
    '  <script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>\n' +
    '\n' +
    '  <script src="bower_components/jquery.easing/js/jquery.easing.js"></script>\n' +
    '  <script src="bower_components/jquery.transit/jquery.transit.js"></script>\n' +
    '\n' +
    '  <script src="bower_components/lodash/dist/lodash.js"></script>\n' +
    '\n' +
    '  <script src="bower_components/angular/angular.js"></script>\n' +
    '  <script src="bower_components/angular-cookies/angular-cookies.js"></script>\n' +
    '  <script src="bower_components/angular-route/angular-route.js"></script>\n' +
    '  <script src="bower_components/angular-animate/angular-animate.js"></script>\n' +
    '  <script src="bower_components/angular-bindonce/bindonce.min.js"></script>\n' +
    '  <script src="bower_components/ngstorage/ngStorage.js"></script>\n' +
    '\n' +
    '  <script src="lib/angular-ui-router.min.js"></script>\n' +
    '\n' +
    '  <script src="bower_components/eventie/eventie.js"></script>\n' +
    '  <script src="bower_components/eventEmitter/EventEmitter.js"></script>\n' +
    '\n' +
    '  <script src="lib/jquery-ui-1.10.4.custom.js"></script>\n' +
    '  \n' +
    '  <script src="scripts/app.js"></script>\n' +
    '\n' +
    '  <!--SCRIPTS-->\n' +
    '  <script src="scripts/controllers/EditorCtrl.js"></script>\n' +
    '  <script src="scripts/controllers/SidepanelCtrl.js"></script>\n' +
    '  <script src="scripts/filters.js"></script>\n' +
    '  <script src="scripts/globals.js"></script>\n' +
    '  <script src="scripts/polyfills.js"></script>\n' +
    '  <script src="scripts/routing.js"></script>\n' +
    '  <script src="scripts/services/thesaurus.js"></script>\n' +
    '  <script src="scripts/templates.js"></script>\n' +
    '  <!--SCRIPTS END-->\n' +
    '\n' +
    '</body>\n' +
    '\n' +
    '</html>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('cinnamon.templates');
} catch (e) {
  module = angular.module('cinnamon.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/editor.html',
    '\n' +
    '<div class="editor container">\n' +
    '  <div class="editor__title page-header">\n' +
    '    <h1 contenteditable="true">{{ post.title }}</h1>\n' +
    '  </div>\n' +
    '  <div contenteditable="true" class="editor__editable lead">{{ post.content }}</div>\n' +
    '  <div class="btn pull-right btn-default btn-lg"><span class="glyphicon glyphicon-ok"></span>&nbsp; Save</div>\n' +
    '  <div class="btn pull-left btn-default"><span ng-click="triggerSynonyms()" class="glyphicon"></span>&nbsp; Show synonyms</div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('cinnamon.templates');
} catch (e) {
  module = angular.module('cinnamon.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/sidepanel.html',
    '\n' +
    '<div class="sidepanel__navigation"><a ng-href="#/edit" class="item"><span class="glyphicon glyphicon-pencil"></span>Write</a><a ng-href="#/browse" class="item"><span class="glyphicon glyphicon-list"></span>Browse</a></div>');
}]);
})();
