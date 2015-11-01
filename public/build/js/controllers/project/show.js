angular.module('codeProject.controllers')
    .controller('ProjectShowController', ['$scope', '$routeParams', '$location', 'Project', 'ProjectMember', 'User',
        function($scope, $routeParams, $location, Project, ProjectMember, User){
            $scope.member = {};
            $scope.projectMember = new ProjectMember();

            Project.get({
                    id: $routeParams.id
                }, function(result){

                if (result.name != null) {
                    $scope.project = result;
                }

                if (result.error != null) {
                    alert(result.error);
                    $location.path('home');
                }
            });

            $scope.getUsers = function (name){
                return User.query({
                    search: name,
                    searchFields: 'name:like',
                }).$promise;
            };

            $scope.save = function(){
                if ($scope.form.$valid) {
                    $scope.projectMember.$save({id: $routeParams.id})
                        .then(function () {
                            $scope.member = {};
                            $scope.project = Project.get({id: $routeParams.id});
                        });
                };
            };

            $scope.remove = function(member) {
                if (confirm("Deseja realmente remover este membro do Projeto?")){
                    var memberService = ProjectMember.get({
                        'id': $scope.project.id,
                        'memberId': member.id,
                    });

                    memberService.$delete({
                        'id': $scope.project.id,
                        'memberId': member.id,
                    })
                        .then(function(){
                            $scope.project = Project.get({id: $routeParams.id});
                        });
                }
            }

            $scope.selectMember = function(member){
                $scope.projectMember.member_id = member.id;
            };

            $scope.formatName = function(model){
                if (model){
                    return model.name;
                }
                return '';
            };
        }]);