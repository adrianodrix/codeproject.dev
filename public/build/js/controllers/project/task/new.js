angular.module('codeProject.controllers')
    .controller('ProjectTaskNewController', ['$scope', '$routeParams', '$location', 'ProjectTask', 'codeProjectConfig',
        function($scope, $routeParams, $location, ProjectTask, codeProjectConfig){
            $scope.task = new ProjectTask();
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
                    $scope.task.$save({id: $routeParams.id})
                        .then(function () {
                            $location.path('/project/'+ $routeParams.id +'/tasks' );
                        });
                };
            };
        }]);

