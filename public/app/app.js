var app = angular.module("myApp", [
    'ui.router',
    'ui.bootstrap'
]);

app.controller('appCtrl', appCtrl);
appCtrl.$inject = ['$scope', '$state'];
function appCtrl($scope, $state){
    $scope.today = new Date();
    $scope.state = $state;
}

app.config(config);
config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "/app/views/_home.html"
    }).state('post', {
        url: "/post",
        templateUrl: "/app/views/_post.html"
    }).state('about', {
        url: "/about",
        templateUrl: "/app/views/_about.html"
    }).state('newsletters', {
        url: "/newsletters",
        templateUrl: "/app/views/_newsletter.html"
    }).state('contact', {
        url: "/contact",
        templateUrl: "/app/views/_contact.html"
    });
    $locationProvider.html5Mode(true);
}
