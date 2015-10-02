angular.module('codeProject.controllers')
    .controller('ClientDashboardController', ['$scope', '$location', '$routeParams', 'Client',
        function($scope, $location, $routeParams, Client){
            $scope.clientActivated = {};

            Client.query({
                limit: 8,
                orderBy: 'created_at',
                sortedBy: 'desc',
            }, function(response){
                $scope.clients = response.data;
                $scope.showClient($scope.clients[0]);
            });

            $scope.showClient = function(client){
                $scope.clientActivated = client;
            };
        }]);

