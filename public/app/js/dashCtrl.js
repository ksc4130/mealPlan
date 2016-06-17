(function(){
    'use strict';
    angular.module('myApp')
        .controller('dashCtrl', dashCtrl);
    dashCtrl.$inject = ['$scope', 'foods'];
    function dashCtrl($scope, foods){
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
        $scope.filterFood = 'name';
        $scope.toggle = function(){
            $scope.control = !$scope.control;
        }
    }
}());