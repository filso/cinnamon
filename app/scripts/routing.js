angular.module('cinnamon').config(function($stateProvider, $urlRouterProvider) {
  'use strict';

  $stateProvider.state('edit', {
    url: '/edit',
    templateUrl: 'template/editor.html',
    controller: 'EditorCtrl'
  });

  $stateProvider.state('browse', {
    url: '/browse',
    templateUrl: 'template/browser.html',
    controller: 'BrowseCtrl'
  });


  $urlRouterProvider.when('', '/edit');

});