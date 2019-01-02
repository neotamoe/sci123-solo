var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

// routes config
myApp.config(['$routeProvider', '$locationProvider','$mdThemingProvider', function($routeProvider, $locationProvider,$mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController as lc"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController as lc"
    })
    .when('/user', {
      templateUrl: '/views/user.html',
      controller: "UserController as uc"
    })
    .when('/tagsbox/:selected?/:selected2?/:selected3?', {
      // $routeParams
      templateUrl: '/views/tagsbox.html',
      controller: "QuizBoxController as qbc"
    })
    .when('/quiz/:chapterid', {
      // $routeParams
      templateUrl: '/views/quiz.html',
      controller: "QuizController as qc"
    })
    .when('/extension', {
      // not really necessary for views, but for app to not crash
      templateUrl: '/views/quiz.html',
      controller: "QuizController as qc"
    })
    .when('/endquiz', {
      templateUrl: '/views/endquiz.html',
      controller: "UserController as uc"
    })
    .when('/review', {
      templateUrl: '/views/review.html',
      controller: "ReviewController as rc"
    })
    .when('/submit', {
      templateUrl: '/views/submit.html',
      controller: "SubmitController as sc"
    })
    .otherwise({
      redirectTo: '/home'
    });
  $mdThemingProvider.theme('default')
    .primaryPalette('orange', {
      'default': '400', // by default use shade 400 from the orange palette for primary intentions
      'hue-1': '100', // use shade 100 for the md-hue-1 class
      'hue-2': '600', // use shade 600 for the md-hue-2 class
      'hue-3': 'A100' // use shade A100 for the md-hue-3 class
    })
    .accentPalette('deep-purple', {
      'default': '300' // use shade 300 for default and keeps all other shades the same
    })
    .backgroundPalette('orange', {
      'default': '200'
    });
}]);
