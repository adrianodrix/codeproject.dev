angular.module('codeProject.controllers')
    .controller('ClientListController', ['$scope', 'Client',
        function($scope, Client){
            $scope.clients = [];
            $scope.totalClients = 0;
            $scope.clientsPerPage = 5;

            $scope.pagination = {
                current: 1
            };

            function getResultsPage(pageNumber) {
                Client.query({
                    page: pageNumber,
                    limit: $scope.clientsPerPage,
                }, function(result){
                    $scope.clients = result.data;
                    $scope.totalClients = result.meta.pagination.total;
                });
            }

            $scope.pageChanged = function(newPage) {
                getResultsPage(newPage);
            };

            getResultsPage(1);
        }]);
