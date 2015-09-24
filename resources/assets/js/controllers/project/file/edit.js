angular.module('codeProject.controllers')
    .controller('ProjectNoteEditController', ['$scope', '$location', '$routeParams', 'ProjectNote',
        function($scope, $location, $routeParams, ProjectNote){
            $scope.note    = ProjectNote.get({id: $routeParams.id, noteId: $routeParams.noteId});

            $scope.save = function(){
                if ($scope.form.$valid) {
                    ProjectNote.update({id: $routeParams.id, noteId: $routeParams.noteId}, $scope.note, function(){
                        $location.path('/project/'+ $routeParams.id +'/notes' );
                    });
                };
            };
        }]);