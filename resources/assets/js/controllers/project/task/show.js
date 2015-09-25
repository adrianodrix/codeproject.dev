angular.module('codeProject.controllers')
    .controller('ProjectNoteShowController', ['$scope', '$routeParams', 'Project', 'ProjectNote',
        function($scope, $routeParams, Project, ProjectNote){
            $scope.project = Project.get({id: $routeParams.id});
            $scope.note    = ProjectNote.get({id: $routeParams.id, noteId: $routeParams.noteId});
        }]);
