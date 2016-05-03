var myApp = angular.module('myApp', ['ngRoute', 'ngResource'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {templateUrl:'/static/partials/news.ejs', controller: 'newsController'});
        $routeProvider.when('/games', {templateUrl:'/static/partials/games.ejs', controller: 'gamesController'});
        $routeProvider.when('/about', {templateUrl:'/static/partials/about.ejs', controller: 'aboutController'});
        $routeProvider.when('/logout', {templateUrl:'/static/partials/login.ejs'});
        //$routeProvider.when('/login', {templateUrl:'/static/partials/login.ejs'});
        //$routeProvider.otherwise({redirectTo: '/news'});
        
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]);