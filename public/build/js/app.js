'use strict';

angular.module('codeProject.controllers', ['ngMessages', 'angular-oauth2']);
angular.module('codeProject', ['ngRoute', 'angular-oauth2', 'codeProject.controllers']);

angular.module('codeProject')
    .config(['$routeProvider', 'OAuthProvider',
        function($routeProvider, OAuthProvider){
            $routeProvider
                .when('/login', {
                    templateUrl: 'build/html/login.html',
                    controller: 'LoginController',
                })
                .when('/home',{
                    templateUrl: 'build/html/home.html',
                    controller: 'HomeController',
                })
                .otherwise({
                    redirectTo: '/login',
                });

            OAuthProvider.configure({
                baseUrl: 'http://codeproject.dev',
                clientId: 'appid1',
                clientSecret: 'secret',
                grantPath: '/oauth/access_token',
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
            return $window.location.href = '/login?error_reason=' + rejection.data.error;
        });
    }]);