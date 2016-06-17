(function(){
    'use strict';
    angular.module('myApp')
        .factory('foodSrv', foodSrv);
    foodSrv.$inject = ['$q', '$http'];
    function foodSrv($q, $http){

        function getFoods(){
            var df = $q.defer();
            $http.get('/food').then(function(resp){
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

        function addFood(x){
            var df = $q.defer();
            $http.post('/food', x).then(function(resp){
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
            addFood: addFood,
            getFoods: getFoods
        }
    }
}());