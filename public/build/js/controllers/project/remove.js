angular.module('codeProject.controllers')
    .controller('ProjectRemoveController', ['$scope', '$location', '$routeParams', 'Project',
        function($scope, $location, $routeParams, Project){
            $scope.project = Project.get({id: $routeParams.id});

            $scope.remove = function(){
                $scope.project.$delete()
                    .then(function(){
                        $location.path('/projects');
                    });
            };
        }]);

