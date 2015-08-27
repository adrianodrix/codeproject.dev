angular.module('codeProject.controllers')
    .controller('ProjectNewController', ['$scope', '$location', 'Client', 'Project',
        function($scope, $location, Client, Project){
            $scope.title   = 'Novo Projeto';

            $scope.project = new Project();
            $scope.clients = Client.query();
            $scope.statusList  = [
                {'value': 0, 'description': 'Pendente'},
                {'value': 1, 'description': 'Em Andamento'},
                {'value': 2, 'description': 'Concluido'},
            ];

            $scope.save = function(){
                if ($scope.form.$valid) {
                    $scope.project.$save()
                        .then(function () {
                            $location.path('/projects');
                        });
                };
            };

        }]);