angular.module('codeProject.controllers')
    .controller('ProjectTaskEditController',
    ['$scope', '$location', '$routeParams', 'ProjectTask', 'codeProjectConfig',
        function($scope, $location, $routeParams, ProjectTask, codeProjectConfig){
            $scope.task = ProjectTask.get({
                id: $routeParams.id,
                taskId: $routeParams.taskId
            });

            $scope.project_id = $routeParams.id;
            $scope.statusList = codeProjectConfig.projectTask.status;

            $scope.start_date = {
                status: {
                    opened: false,
                },
            };

            $scope.due_date = {
                status: {
                    opened: false,
                },
            };

            $scope.openStartDatePicker = function($event) {
                $scope.start_date.status.opened = true;
            };

            $scope.openDueDatePicker = function($event) {
                $scope.due_date.status.opened = true;
            };

            $scope.save = function(){
                if ($scope.form.$valid) {
                    ProjectTask.update({id: $routeParams.id, taskId: $routeParams.taskId}, $scope.task, function(){
                        $location.path('/project/'+ $routeParams.id +'/tasks' );
                    });
                };
            };
        }]);