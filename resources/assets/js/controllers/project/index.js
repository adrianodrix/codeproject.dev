angular.module('codeProject.controllers')
    .controller('ProjectListController', ['$scope', 'Project',
        function($scope, Project){
            $scope.projects = Project.query();
        }]);
