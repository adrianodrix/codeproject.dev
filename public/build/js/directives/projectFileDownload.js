angular.module('codeProject.directives')
    .directive('projectFileDownload',
    ['$timeout', 'codeProjectConfig', 'ProjectFile',
        function($timeout, codeProjectConfig, ProjectFile){
            return {
                restrict: 'E',
                templateUrl: codeProjectConfig.baseUrl + '/build/html/templates/projectFileDownload.html',
                link: function(scope, element){
                    var anchor = element.children()[0];
                    scope.$on('save-file', function(event, data){
                        $(anchor).removeClass('disabled');
                        $(anchor).text('');
                        $(anchor).append($('<i class="glyphicon glyphicon-floppy-save"></i>'));
                        $(anchor).attr({
                            href: 'data:application-octet-stream;base64,'+ data.file,
                            download: data.name +'.'+ data.extension,
                        });

                        $timeout(function(){
                            scope.downloadFile = function(){};
                            $(anchor)[0].click();
                        });
                    });
                },
                controller: ['$scope', '$attrs', '$element',
                    function($scope, $attrs, $element){
                    $scope.downloadFile = function(){
                        var anchor = $element.children()[0];

                        $(anchor).addClass('disabled');
                        $(anchor).text('Carregando...');

                        ProjectFile.download({
                            id: $attrs.projectId,
                            fileId: $attrs.fileId,
                        }, function(data){
                            $scope.$emit('save-file', data);
                        });
                    };
                }],
            };
        }]);