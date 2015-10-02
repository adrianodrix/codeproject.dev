'use strict';

angular.module('codeProject.controllers')
    .controller('MenuController',
    ['$scope', '$cookies', function($scope, $cookies){
        $scope.user = $cookies.getObject('user');
    }]);
