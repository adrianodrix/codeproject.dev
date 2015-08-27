angular.module('codeProject.controllers')
    .controller('ProjectShowController', ['$scope', '$routeParams', 'Project',
        function($scope, $routeParams, Project){
            $scope.project = Project.get({id: $routeParams.id});
        }]);