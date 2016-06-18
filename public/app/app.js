var app = angular.module("myApp", [
    'ui.router',
    'ui.bootstrap'
]);

app.controller('appCtrl', appCtrl);
appCtrl.$inject = ['$scope', '$state', '$location'];
function appCtrl($scope, $state, $location){
    $scope.today = new Date();
    $scope.state = $state;
    $scope.go = function(){
        $location.path('/dashboard');
    }
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
            foods: ['foodSrv', function(foodSrv){
                return foodSrv.getFoods();
            }],
            meals: ['mealSrv', function(mealSrv){
                return mealSrv.getMeals();
            }]
        }
    }).state('addFood', {
        url: "/add",
        templateUrl: "app/views/_addFood.html",
        controller: 'foodCtrl'
    }).state('meal', {
        url: "/create",
        templateUrl: "app/views/_meal.html",
        controller: 'mealCtrl',
        resolve: {
            foods: ['foodSrv', function(foodSrv){
                return foodSrv.getFoods();
            }]
        }
    });
    $locationProvider.html5Mode(true);
}
