angular.module('codeProject.directives')
    .directive('projectFileDownload', ['codeProjectConfig', 'ProjectFile',
        function(codeProjectConfig, ProjectFile){
            return {
                restrict: 'E',
                templateUrl: codeProjectConfig.baseUrl + '/build/html/templates/projectFileDownload.html',
                link: function(scope, element, attr){},
                controller: ['$scope', '$attrs', '$element', '$timeout',
                    function($scope, $attrs, $element, $timeout){
                    $scope.downloadFile = function(){
                        var anchor = $element.children()[0];

                        $(anchor).addClass('disabled');
                        $(anchor).text('Carregando...');

                        ProjectFile.download({
                            id: $attrs.projectId,
                            fileId: $attrs.fileId,
                        }, function(data){
                            $(anchor).removeClass('disabled');
                            $(anchor).text('');
                            $(anchor).append($('<i class="glyphicon glyphicon-floppy-save"></i>'));
                            $(anchor).attr({
                                href: 'data:application-octet-stream;base64,'+ data.file,
                                download: data.name +'.'+ data.extension,
                            });

                            $timeout(function(){
                                $scope.downloadFile = function(){

                                };
                                $(anchor)[0].click();
                            });
                        });
                    };
                }],
            };
        }]);