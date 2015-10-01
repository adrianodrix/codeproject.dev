angular.module('codeProject.directives')
    .directive('loginForm',
    ['codeProjectConfig',
        function(codeProjectConfig){
            return {
                restrict: 'E',
                templateUrl: codeProjectConfig.baseUrl + '/build/html/templates/form-login.html',
                scope: false,
            };
        }]);