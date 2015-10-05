angular.module('codeProject.controllers')
    .controller('ProjectDashboardController', ['$scope', '$location', '$routeParams', 'Project', 'ProjectTask',
        function($scope, $location, $routeParams, Project, ProjectTask){
            $scope.projectActivated = {};

            var getProjects = function(){
                Project.query({
                    limit: 5,
                    orderBy: 'created_at',
                    sortedBy: 'desc',
                    include: 'notes,tasks,files',
                }, function(response){
                    $scope.projects = response.data;
                });
            }

            $scope.showProject = function(project){
                $scope.projectActivated = project;
            }

            $scope.changeStatus = function(task){
                task.status = task.status ? 0 : 1;
                ProjectTask.update({
                    id: task.project_id,
                    taskId: task.id
                }, task, function(){
                    Project.get({
                        id: task.project_id,
                        include: 'notes,tasks,files',
                    }, function(response){
                        $scope.projectActivated = response;
                        getProjects();
                    });
                });
            }

            getProjects();
        }]);

