(function(){
    'use strict';
    angular.module('myApp')
        .controller('dashCtrl', dashCtrl);
    dashCtrl.$inject = ['$scope', 'foods', 'meals'];
    function dashCtrl($scope, foods, meals){
        $scope.clients = [
            {
                name: 'Regina George'
            },
            {
                name: 'Samantha Jones'
            },
            {
                name: 'Donny Walhberg'
            }
        ];

        $scope.foods = foods;
        $scope.meals = meals;
        $scope.filterFood = 'name';
        $scope.toggle = function(){
            $scope.control = !$scope.control;
        }
    }
}());