angular.module('codeProject.controllers')
    .controller('ProjectTaskRemoveController', ['$scope', '$location', '$routeParams', 'Project', 'ProjectTask',
        function($scope, $location, $routeParams, Project, ProjectTask){
            $scope.project = Project.get({id: $routeParams.id});
            $scope.task    = ProjectTask.get({id: $routeParams.id, taskId: $routeParams.taskId});

            $scope.remove = function(){
                $scope.task.$delete({id: $routeParams.id, taskId: $routeParams.taskId})
                    .then(function(){
                        $location.path('/project/'+ $routeParams.id +'/tasks' );
                    });
            };
        }]);

