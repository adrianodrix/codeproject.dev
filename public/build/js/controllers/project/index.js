angular.module('codeProject.controllers')
    .controller('ProjectListController', ['$scope', 'Project',
        function($scope, Project){
            $scope.projects = [];
            $scope.totalProjects = 0;
            $scope.projectsPerPage = 5; // this should match however many results your API puts on one page


            $scope.pagination = {
                current: 1
            };

            function getResultsPage(pageNumber) {
                Project.query({
                    page: pageNumber,
                    limit: $scope.projectsPerPage,
                }, function(result){
                    $scope.projects = result.data;
                    $scope.totalProjects = result.meta.pagination.total;
                });

                //// this is just an example, in reality this stuff should be in a service
                //$http.get('path/to/api/users?page=' + pageNumber)
                //    .then(function(result) {
                //        $scope.users = result.data.Items;
                //        $scope.totalUsers = result.data.Count
                //    });
            }

            $scope.pageChanged = function(newPage) {
                getResultsPage(newPage);
            };

            getResultsPage(1);
        }]);