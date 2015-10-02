'use strict';

angular.module('codeProject.controllers')
    .controller('HomeController', ['$scope', '$cookies', 'Project',
        function($scope, $cookies, Project){
            $scope.projects = [];
            Project.query({
                orderBy: 'created_at',
                sortedBy: 'desc',
            }, function(result){
               $scope.projects = result.data;
            });
    }]);