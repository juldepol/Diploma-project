var myApp = angular.module('myApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {templateUrl:'/static/partials/news.html', controller: 'newsController'});
        $routeProvider.when('/games', {templateUrl:'/static/partials/games.html', controller: 'gamesController'});
        $routeProvider.when('/about', {templateUrl:'/static/partials/about.html', controller: 'aboutController'});
        $routeProvider.when('/logout', {templateUrl:'/static/login.html'});
        $routeProvider.otherwise({redirectTo: '/'});
        
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]);