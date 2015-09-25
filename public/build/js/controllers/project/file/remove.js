angular.module('codeProject.controllers')
    .controller('ProjectFileRemoveController', ['$scope', '$location', '$routeParams', 'Project', 'ProjectFile',
        function($scope, $location, $routeParams, Project, ProjectFile){
            $scope.project = Project.get({id: $routeParams.id});
            $scope.file    = ProjectFile.get({id: $routeParams.id, fileId: $routeParams.fileId});

            $scope.remove = function(){
                $scope.file.$delete({id: $routeParams.id, fileId: $routeParams.fileId})
                    .then(function(){
                        $location.path('/project/'+ $routeParams.id +'/files' );
                    });
            };
        }]);

