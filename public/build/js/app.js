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
                .when('/clients',{
                    templateUrl: 'build/html/client/list.html',
                    controller: 'ClientListController',
                })
                .when('/clients/new',{
                    templateUrl: 'build/html/client/new.html',
                    controller: 'ClientNewController',
                })
                .when('/clients/:id/edit',{
                    templateUrl: 'build/html/client/edit.html',
                    controller: 'ClientEditController',
                })
                .when('/clients/:id/remove',{
                    templateUrl: 'build/html/client/remove.html',
                    controller: 'ClientRemoveController',
                })
                .when('/project/:id/notes',{
                    templateUrl: 'build/html/project/note/list.html',
                    controller: 'ProjectNoteListController',
                })
                .when('/project/:id/notes/:noteId',{
                    templateUrl: 'build/html/project/note/show.html',
                    controller: 'ProjectNoteShowController',
                })
                .when('/project/:id/notes/:noteId/new',{
                    templateUrl: 'build/html/project/note/new.html',
                    controller: 'ProjectNoteNewController',
                })
                .when('/project/:id/notes/:noteId/edit',{
                    templateUrl: 'build/html/project/note/edit.html',
                    controller: 'ProjectNoteEditController',
                })
                .when('/project/:id/notes/:noteId/remove',{
                    templateUrl: 'build/html/project/note/remove.html',
                    controller: 'ProjectNoteRemoveController',
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