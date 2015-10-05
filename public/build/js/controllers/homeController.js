'use strict';

angular.module('codeProject.controllers')
    .controller('HomeController', ['$scope', '$cookies', '$location', 'Project',
        function($scope, $cookies, $location, Project){
            $scope.projects = [];
            Project.query({
                orderBy: 'created_at',
                sortedBy: 'desc',
            }, function(result){
               $scope.projects = result.data;
            });

            $scope.selectProject = function(project){
                $location.path('/projects/'+ project.id);
            }
    }]);