angular.module('codeProject.controllers')
    .controller('ProjectEditController', ['$scope', '$location', '$routeParams', '$q', '$filter', 'Project', 'Client', 'codeProjectConfig',
        function($scope, $location, $routeParams, $q, $filter, Project, Client, codeProjectConfig){
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
                var deffered = $q.defer();
                Client.search({
                    search: name,
                    searchFields: 'name:like',
                },
                    function(data){
                        var result = $filter('limitTo')(data.data, 10);
                        deffered.resolve(result);
                    },
                    function(error){
                        deffered.reject(error);
                    }
                );

                return deffered.promise;
            };

            $scope.selectClient = function(client){
                $scope.project.client_id = client.id;
            };

        }]);

