angular.module('codeProject.controllers')
    .controller('ProjectNewController', ['$scope', '$location', 'Client', 'Project', 'codeProjectConfig',
        function($scope, $location, Client, Project, codeProjectConfig){
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
                return Client.query({
                    search: name,
                    searchFields: 'name:like',
                }).$promise;
            };

            $scope.selectClient = function(client){
                $scope.project.client_id = client.id;
            };

        }]);