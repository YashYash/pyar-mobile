'use strict';
var pyar = angular.module('pyar', ['ionic', 'ngSanitize', 'angular-gestures', 'ngStorage']);

pyar.factory('socket', function() {
  var socket = io.connect('http://localhost:3000');
  return socket;
});

pyar.run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});



pyar.config(function(
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  $compileProvider,
  $sceDelegateProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|http|chrome-extension):/);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|http|ftp|i|file|blob|cdvfile):|data:image\//);
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '*://www.youtube.com/**',
    '*://http://i.ebayimg.com/**'
  ]);

  $stateProvider

  // Landing
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingController'
  })

  // Tabs Main
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
  })

  // Stream
  .state('tab.browse', {
    url: '/browse',
    views: {
      'tab-browse': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowseController'
      }
    }
  })

  // Cateogries
  .state('tab.chat', {
    url: '/chat',
    views: {
      'tab-chat': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatController'
      }
    }
  })


  // Post
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountController'
      }
    }
  })



  // Write you 404 here
  $urlRouterProvider.otherwise('/');
});
