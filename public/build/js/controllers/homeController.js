'use strict';

angular.module('codeProject.controllers')
    .controller('HomeController', ['$scope', '$cookies', '$location', '$pusher', '$timeout', 'Project',
        function($scope, $cookies, $location, $pusher, $timeout, Project){
            $scope.projects = [];
            $scope.tasks    = [];


            Project.query({
                orderBy: 'created_at',
                sortedBy: 'desc',
            }, function(result){
               $scope.projects = result.data;
            });

            $scope.selectProject = function(project){
                $location.path('/projects/'+ project.id);
            }

            var pusher = $pusher(window.client);
            var channel = pusher.subscribe('user.'+ $cookies.getObject('user').id);
            channel.bind('CodeProject\\Events\\TaskWasIncluded',
                function(data) {
                    if ($scope.tasks.length == 6){
                        $scope.tasks.splice($scope.tasks.length - 1, 1);
                    }
                    $timeout(function(){
                        $scope.tasks.unshift(data.task);
                    }, 300);
                }
            );
    }]);