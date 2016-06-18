(function(){
    'use strict';
    angular.module('myApp')
        .factory('mealSrv', mealSrv);
    mealSrv.$inject = ['$http', '$q'];
    function mealSrv($http, $q){

        function saveMeal(x){
            var df = $q.defer();
            $http.post('/meal', x).then(function(resp){
                if(resp.status === 200){
                    df.resolve(resp.data);
                } else {
                    df.reject(resp);
                }
            }, function(resp){
                df.reject(resp);
            });
            return df.promise;
        }

        function getMeals(){
            var df = $q.defer();
            $http.get('/meal').then(function(resp){
                if(resp.status === 200){
                    df.resolve(resp.data);
                } else {
                    df.reject(resp);
                }
            }, function(resp){
                df.reject(resp);
            });
            return df.promise;
        }

        return {
            saveMeal: saveMeal,
            getMeals: getMeals
        }
    }
}());