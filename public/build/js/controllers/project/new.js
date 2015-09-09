angular.module('codeProject.controllers')
    .controller('ProjectNewController', ['$scope', '$location', 'Client', 'Project', 'codeProjectConfig',
        function($scope, $location, Client, Project, codeProjectConfig){
            $scope.title   = 'Novo Projeto';

            $scope.project = new Project();
            $scope.clients = Client.query();

            $scope.statusList  = codeProjectConfig.project.status;

            $scope.save = function(){
                if ($scope.form.$valid) {
                    $scope.project.$save()
                        .then(function () {
                            $location.path('/projects');
                        });
                };
            };

        }]);