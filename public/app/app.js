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
    }).state('createMeal', {
        url: "/create",
        templateUrl: "app/views/_meal.html",
        controller: 'mealCtrl',
        resolve: {
            meal: [function(){
                return null;
            }],
            foods: ['foodSrv', function(foodSrv){
                return foodSrv.getFoods();
            }],
            print: [function(){
                return false;
            }]
        }
    }).state('editMeal', {
        url: "/edit/:id",
        templateUrl: "app/views/_meal.html",
        controller: 'mealCtrl',
        resolve: {
            meal: ['mealSrv', '$stateParams', function(mealSrv, $stateParams){
                return mealSrv.getMeal($stateParams.id);
            }],
            foods: ['foodSrv', function(foodSrv){
                return foodSrv.getFoods();
            }],
            print: [function(){
                return false;
            }]
        }
    }).state('printMeal', {
        url: "/print/:id",
        templateUrl: "app/views/_meal.html",
        controller: 'mealCtrl',
        resolve: {
            meal: ['mealSrv', '$stateParams', function(mealSrv, $stateParams){
                return mealSrv.getMeal($stateParams.id);
            }],
            foods: ['foodSrv', function(foodSrv){
                return foodSrv.getFoods();
            }],
            print: [function(){
                return true;
            }]
        }
    });
    $locationProvider.html5Mode(true);
}
