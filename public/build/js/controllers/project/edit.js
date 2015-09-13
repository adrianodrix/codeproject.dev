angular.module('codeProject.controllers')
    .controller('ProjectEditController', ['$scope', '$location', '$routeParams', 'Project', 'Client', 'codeProjectConfig',
        function($scope, $location, $routeParams, Project, Client, codeProjectConfig){
            $scope.title   = 'Edição do Projeto';
            $scope.statusList  = codeProjectConfig.project.status;

            Project.get({id: $routeParams.id}, function(data){
                $scope.project = data;
                $scope.client  = data.client.data;
            });

            $scope.save = function(){
                if ($scope.form.$valid) {
                    Project.update({id: $scope.project.id}, $scope.project, function(){
                        $location.path('/projects');
                    });
                };
            };

            $scope.formatName = function(model){
                if (model){
                    return model.name;
                }
                return '';
            };

            $scope.getClients = function (name){
                return Client.query({
                    search: name,
                    searchFields: 'name:like',
                }).$promise;
            };

            $scope.selectClient = function(client){
                $scope.project.client_id = client.id;
            };

        }]);

