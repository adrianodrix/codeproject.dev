'use strict';

angular.module('codeProject.controllers', ['ngMessages', 'angular-oauth2']);
angular.module('codeProject.services', ['ngResource']);

angular.module('codeProject', [
    'ngRoute',
    'angular-oauth2',
    'codeProject.controllers',
    'codeProject.services'
]);

angular.module('codeProject')
    .provider('codeProjectConfig', function(){
        var config = {
            baseUrl: 'http://codeproject.dev',
        };

        return {
            config: config,
            $get: function(){
                return config;
            }
        }
});

angular.module('codeProject')
    .config(['$routeProvider', 'OAuthProvider', 'OAuthTokenProvider', 'codeProjectConfigProvider',
        function($routeProvider, OAuthProvider, OAuthTokenProvider, codeProjectConfigProvider){
            $routeProvider
                .when('/login', {
                    templateUrl: 'build/html/login.html',
                    controller: 'LoginController',
                })
                .when('/home',{
                    templateUrl: 'build/html/home.html',
                    controller: 'HomeController',
                })
                .when('/clientes',{
                    templateUrl: 'build/html/client/list.html',
                    controller: 'ClientListController',
                })
                .when('/clientes/novo',{
                    templateUrl: 'build/html/client/new.html',
                    controller: 'ClientNewController',
                })
                .when('/clientes/:id/editar',{
                    templateUrl: 'build/html/client/edit.html',
                    controller: 'ClientEditController',
                })
                .when('/clientes/:id/remover',{
                    templateUrl: 'build/html/client/remove.html',
                    controller: 'ClientRemoveController',
                })
                .otherwise({
                    redirectTo: '/login',
                });

            OAuthProvider.configure({
                baseUrl: codeProjectConfigProvider.config.baseUrl,
                clientId: 'appid1',
                clientSecret: 'secret',
                grantPath: '/oauth/access_token',
            });

            OAuthTokenProvider.configure({
                name: 'token',
                options: {
                    secure: false
                }
            });
    }]);

angular.module('codeProject')
    .run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
        $rootScope.$on('oauth:error', function(event, rejection) {
            // Ignore `invalid_grant` error - should be catched on `LoginController`.
            if ('invalid_grant' === rejection.data.error) {
                return;
            }

            // Refresh token when a `invalid_token` error occurs.
            if ('invalid_token' === rejection.data.error) {
                return OAuth.getRefreshToken();
            }

            // Redirect to `/login` with the `error_reason`.
            return $window.location.href = '#/login?error_reason=' + rejection.data.error;
        });
    }]);