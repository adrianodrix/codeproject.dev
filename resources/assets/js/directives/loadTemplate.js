angular.module('codeProject.directives')
    .directive('loadTemplate',
    ['$http', '$compile', 'OAuth',
        function($http, $compile, OAuth){
            return {
                restrict: 'E',
                link: function(scope, element, attr){
                    scope.$on('$routeChangeStart', function(event, next, current){
                        if(OAuth.isAuthenticated()){
                            if(next.$$route.originalPath != '/login'
                                && next.$$route.originalPath != '/logout'){
                                if (!scope.isTemplateLoad){
                                    $http.get(attr.url).then(function(response){
                                        scope.isTemplateLoad = true;
                                        element.html(response.data);
                                        $compile(element.contents())(scope);
                                    });
                                }
                                return;
                            }
                        }
                        resetTemplate();

                        function resetTemplate(){
                            scope.isTemplateLoad = false;
                            element.html('');
                        }
                    });
                },
            };
        }]);
