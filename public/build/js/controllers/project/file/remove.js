angular.module('codeProject.controllers')
    .controller('ProjectNoteRemoveController', ['$scope', '$location', '$routeParams', 'Project', 'ProjectNote',
        function($scope, $location, $routeParams, Project, ProjectNote){
            $scope.project = Project.get({id: $routeParams.id});
            $scope.note    = ProjectNote.get({id: $routeParams.id, noteId: $routeParams.noteId});

            $scope.remove = function(){
                $scope.note.$delete({id: $routeParams.id, noteId: $routeParams.noteId})
                    .then(function(){
                        $location.path('/project/'+ $routeParams.id +'/notes' );
                    });
            };
        }]);

