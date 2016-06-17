(function(){
    'use strict';
    angular.module('myApp')
        .controller('foodCtrl', foodCtrl);
    foodCtrl.$inject = ['$scope', 'foodSrv', '$location'];
    function foodCtrl($scope, foodSrv, $location){
        $scope.food = {};
        $scope.addFood = function(){
            foodSrv.addFood($scope.food).then(function(data){
                if(data && !data.message){
                    $location.path('/dashboard');
                }
            });
        }
    }
}());