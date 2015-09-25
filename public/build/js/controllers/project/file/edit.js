angular.module('codeProject.controllers')
    .controller('ProjectFileEditController', ['$scope', '$location', '$routeParams', 'ProjectFile',
        function($scope, $location, $routeParams, ProjectFile){
            $scope.file    = ProjectFile.get({id: $routeParams.id, fileId: $routeParams.fileId});
            console.log($scope.file);

            $scope.save = function(){
                if ($scope.form.$valid) {
                    ProjectFile.update({id: $routeParams.id, fileId: $routeParams.fileId}, $scope.file, function(){
                        $location.path('/project/'+ $routeParams.id +'/files' );
                    });
                };
            };
        }]);