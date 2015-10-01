angular.module('codeProject.controllers')
    .controller('ProjectEditController', ['$scope', '$location', '$routeParams', 'Project', 'Client', 'codeProjectConfig',
        function($scope, $location, $routeParams, Project, Client, codeProjectConfig){
            $scope.title   = 'Edição do Projeto';
            $scope.statusList  = codeProjectConfig.project.status;
            $scope.due_date = {
                status: {
                    opened: false,
                },
            };

            $scope.open = function($event) {
                $scope.due_date.status.opened = true;
            };

            Project.get({id: $routeParams.id}, function(data){
                $scope.project = data;
                $scope.client  = data.client.data;
            });

            var getClient = function (i) {
                Client.query({}, function(){
                    console.log('sucess of the client: '.concat(i));
                })
            }

            for (var i = 0; i < 10; i++) {
                getClient(i);
            }

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

