(function(){
    'use strict';
    angular.module('myApp')
        .controller('mealCtrl', mealCtrl);
    mealCtrl.$inject = ['$scope', 'mealSrv', 'foods', 'meal', 'print', '$timeout'];
    function mealCtrl($scope, mealSrv, foods, meal, print, $timeout){

        $timeout(function(){
            if(print){
                window.print();
            }
        }, 500);

        $scope.meal = meal || {
            breakfast: {
                foods: []
            },
            lunch: {
                foods: []
            },
            dinner: {
                foods: []
            }
        };

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
        var count = 1;

        $scope.totalSum = function(array, prop){
            return array.reduce(function(a, b){
                return a + (b[prop] * b.quantity);
            }, 0);
        };

        $scope.add = function(obj, array){
            obj.quantity = 1;
            obj.index = angular.copy(count);
            array.push(angular.copy(obj));
            count+=1;
        };

        $scope.remove = function(array, obj){
            var found = array.filter(function(sItem){
                return sItem.index === obj.index;
            })[0];
            if(found){
                array.splice(array.indexOf(found), 1);
            }
        };

        $scope.runningTotals = function(){

            return {
                calories: $scope.totalSum($scope.meal.breakfast.foods, 'calories') + $scope.totalSum($scope.meal.lunch.foods, 'calories') + $scope.totalSum($scope.meal.dinner.foods, 'calories'),
                protein: $scope.totalSum($scope.meal.breakfast.foods, 'protein') + $scope.totalSum($scope.meal.lunch.foods, 'protein') + $scope.totalSum($scope.meal.dinner.foods, 'protein'),
                fat: $scope.totalSum($scope.meal.breakfast.foods, 'fat') + $scope.totalSum($scope.meal.lunch.foods, 'fat') + $scope.totalSum($scope.meal.dinner.foods, 'fat'),
                fiber: $scope.totalSum($scope.meal.breakfast.foods, 'fiber') + $scope.totalSum($scope.meal.lunch.foods, 'fiber') + $scope.totalSum($scope.meal.dinner.foods, 'fiber'),
                carbs: $scope.totalSum($scope.meal.breakfast.foods, 'carbs') + $scope.totalSum($scope.meal.lunch.foods, 'carbs') + $scope.totalSum($scope.meal.dinner.foods, 'carbs')
            }
        };

        $scope.save = function(){
            $scope.meal.totals = $scope.runningTotals();
            $scope.meal.date = new Date();
            if($scope.meal.id){
                mealSrv.updateMeal($scope.meal).then(function(){
                    $scope.finished = true;
                }, function(resp){
                    console.log(resp);
                });
            } else {
                mealSrv.saveMeal($scope.meal).then(function(){
                    $scope.finished = true;
                }, function(resp){
                    console.log(resp);
                });
            }
        }
    }
}());