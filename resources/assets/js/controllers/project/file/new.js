angular.module('codeProject.controllers')
    .controller('ProjectFileNewController', ['$scope', '$routeParams', '$location', 'Upload', 'Url', 'codeProjectConfig',
        function($scope, $routeParams, $location, Upload, Url, codeProjectConfig){

            $scope.project_id = $routeParams.id;

            $scope.save = function(){
                if ($scope.form.$valid) {
                    Upload.upload({
                        url: codeProjectConfig.baseUrl +
                                Url.getUrlFromUrlSymbol(codeProjectConfig.urls.projectFile, {
                                    id: $routeParams.id,
                                    fileId: null,
                                }),
                        fields: {
                            'project_id': $routeParams.id,
                            'name': $scope.file.name,
                            'description': $scope.file.description,
                        },
                        file: $scope.file.file
                    }).success(function (data, status, headers, config) {
                        $location.path('/project/'+ $scope.project_id  +'/files' );
                    });
                };
            };

        }]);
