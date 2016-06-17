(function(){
    'use strict';
    angular.module('myApp')
        .controller('foodCtrl', foodCtrl);
    foodCtrl.$inject = ['$scope'];
    function foodCtrl($scope){
        $scope.food = {};
        $scope.addFood = function(){

        }
    }
}());