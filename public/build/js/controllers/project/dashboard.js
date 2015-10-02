angular.module('codeProject.controllers')
    .controller('ProjectDashboardController', ['$scope', '$location', '$routeParams', 'Project',
        function($scope, $location, $routeParams, Project){
            $scope.projectActivated = {};

            Project.query({
                limit: 5,
                orderBy: 'created_at',
                sortedBy: 'desc',
                include: 'notes,tasks,files',
            }, function(response){
                $scope.projects = response.data;
                $scope.showProject($scope.projects[0]);
            });

            $scope.showProject = function(project){
                $scope.projectActivated = project;
            };
        }]);

