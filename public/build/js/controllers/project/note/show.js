angular.module('codeProject.controllers')
    .controller('ProjectNoteShowController', [
        '$scope', '$routeParams', '$http', '$compile', '$timeout', '$window', 'Project', 'ProjectNote',
        function($scope, $routeParams, $http, $compile, $timeout, $window, Project, ProjectNote){
            $scope.project = Project.get({id: $routeParams.id});
            $scope.note    = ProjectNote.get({id: $routeParams.id, noteId: $routeParams.noteId});

            $scope.print = function(note){
                $http.get('/build/views/project/note/print.html').then(function(response){
                    var div = $('<div/>');
                    $scope.note = note;
                    div.html($compile(response.data)($scope));
                    $timeout(function(){
                        var frame = $window.open('', '_blank', 'width=500, height=500');
                        frame.document.open();
                        frame.document.write(div.html());
                        frame.document.close;
                    });
                });
            };
        }]);