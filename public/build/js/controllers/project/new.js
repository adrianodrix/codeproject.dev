angular.module('codeProject.controllers')
    .controller('ProjectNewController', ['$scope', '$location', '$q', 'Client', 'Project', 'codeProjectConfig',
        function($scope, $location, $q, Client, Project, codeProjectConfig){
            $scope.title   = 'Novo Projeto';
            $scope.project = new Project();
            $scope.due_date = {
                status: {
                    opened: false,
                },
            };

            $scope.open = function($event) {
                $scope.due_date.status.opened = true;
            };

            $scope.statusList  = codeProjectConfig.project.status;

            $scope.save = function(){
                if ($scope.form.$valid) {
                    $scope.project.$save()
                        .then(function () {
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
                        limit:10,
                    },
                    function(data){
                        deffered.resolve(data.data);
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