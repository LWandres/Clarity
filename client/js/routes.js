var myApp = angular.module('myApp',['ngRoute','angularjs-gauge']);
//routes for partials
myApp.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/static/partials/home.html'
        })
        .when('/scan', {
            templateUrl: '/static/partials/scan.html',
            controller: "scancontroller"
        })
        .when('/results', {
            templateUrl: '/static/partials/results.html',
            controller: "resultscontroller"
        })
        .when('/resources', {
            templateUrl: '/static/partials/resources.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
