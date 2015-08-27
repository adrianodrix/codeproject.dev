'use strict';

angular.module('codeProject.controllers')
    .controller('HomeController', ['$scope', '$cookies', function($scope, $cookies){
        console.log($cookies.getObject('user'));
    }]);