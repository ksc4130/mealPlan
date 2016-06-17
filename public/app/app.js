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
        templateUrl: "app/views/_home.html"
    }).state('dashboard', {
        url: "/dashboard",
        templateUrl: "app/views/_dash.html",
        controller: 'dashCtrl',
        resolve: {
            foods: [function(){
                return [];
            }]
        }
    }).state('addFood', {
        url: "/add",
        templateUrl: "app/views/_addFood.html",
        controller: 'foodCtrl'
    });
    $locationProvider.html5Mode(true);
}
