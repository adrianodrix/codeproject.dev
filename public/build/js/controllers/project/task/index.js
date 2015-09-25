angular.module('codeProject.controllers')
    .controller('ProjectTaskListController',
    ['$scope', '$routeParams', 'Project', 'ProjectTask', 'codeProjectConfig',
        function($scope, $routeParams, Project, ProjectTask, codeProjectConfig){
            $scope.project = Project.get({id: $routeParams.id});
            $scope.task = new ProjectTask();

            $scope.save = function(){
                if($scope.form.$valid){
                    $scope.task.status = codeProjectConfig.projectTask.status[0].value;
                    $scope.task.$save({id: $routeParams.id}).then(function(){
                        $scope.task = new ProjectTask();
                        $scope.loadTasks();
                    });
                }
            };

            $scope.loadTasks = function(){
                $scope.tasks = ProjectTask.query({
                    id: $routeParams.id,
                    orderBy: 'id',
                    sortedBy: 'desc',
                });
            };

            $scope.loadTasks();
        }]);