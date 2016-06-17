(function(){
    'use strict';
    angular.module('myApp')
        .controller('foodCtrl', foodCtrl);
    foodCtrl.$inject = ['$scope', '$http', '$location'];
    function foodCtrl($scope, $http, $location){
        $scope.food = {};
        $scope.addFood = function(){
            $http.post('/food', $scope.food).then(function(data){
                if(data && !data.message){
                    $location.path('/dashboard');
                }
            });
        }
    }
}());