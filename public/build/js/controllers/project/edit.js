angular.module('codeProject.controllers')
    .controller('ProjectEditController', ['$scope', '$location', '$routeParams', 'Project', 'Client',
        function($scope, $location, $routeParams, Project, Client){
            $scope.title   = 'Edição do Projeto';
            $scope.project = Project.get({id: $routeParams.id});
            $scope.clients = Client.query();
            $scope.statusList  = [
                {'value': 0, 'description': 'Pendente'},
                {'value': 1, 'description': 'Em Andamento'},
                {'value': 2, 'description': 'Concluido'},
            ];

            $scope.save = function(){
                if ($scope.form.$valid) {
                    Project.update({id: $scope.project.id}, $scope.project, function(){
                        $location.path('/projects');
                    });
                };
            };
        }]);

