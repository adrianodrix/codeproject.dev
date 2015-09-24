'use strict';

angular.module('codeProject.controllers', ['ngMessages', 'angular-oauth2']);
angular.module('codeProject.services', ['ngResource']);
angular.module('codeProject.directives', []);
angular.module('codeProject.filters', []);


angular.module('codeProject', [
    'ngRoute',
    'angular-oauth2',
    'ui.bootstrap.typeahead',
    'ui.bootstrap.progressbar',
    'ui.bootstrap.tpls',
    'ui.bootstrap.datepicker',
    'ngFileUpload',
    'codeProject.controllers',
    'codeProject.services',
    'codeProject.directives',
    'codeProject.filters',
]);

angular.module('codeProject')
    .provider('codeProjectConfig', function(){
        var config = {
            baseUrl: 'http://codeproject.dev',
            project: {
                status: [
                    {'value': 0, 'label': 'Pendente'},
                    {'value': 1, 'label': 'Em Andamento'},
                    {'value': 2, 'label': 'Concluido'},
                ],
            },
            urls: {
                projectFile : '/project/{{id}}/file/{{fileId}}',
            },
            utils: {
                transformReponse: function(data, headers){
                    var headersGetter = headers();
                    if(headersGetter['content-type'] == 'application/json' ||
                        headersGetter['content-type'] == 'text/json'){
                        var dataJson = JSON.parse(data);
                        if(dataJson.hasOwnProperty('data')){
                            dataJson = dataJson.data;
                        }
                        return dataJson;
                    }
                    return data;
                }
            },
        };

        return {
            config: config,
            $get: function(){
                return config;
            }
        }
});

angular.module('codeProject')
    .config(['$routeProvider', '$httpProvider', 'OAuthProvider', 'OAuthTokenProvider', 'codeProjectConfigProvider',
        function($routeProvider, $httpProvider, OAuthProvider, OAuthTokenProvider, codeProjectConfigProvider){
            $httpProvider.defaults.transformResponse = codeProjectConfigProvider.config.utils.transformReponse;

            $routeProvider
                .when('/login', {
                    templateUrl: 'build/html/login.html',
                    controller: 'LoginController',
                })
                .when('/home',{
                    templateUrl: 'build/html/home.html',
                    controller: 'HomeController',
                })
                //Clients ---------------------------------------
                .when('/clients',{
                    templateUrl: 'build/html/client/index.html',
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
                //Projects ----------------------------------------------
                .when('/projects',{
                    templateUrl: 'build/html/project/index.html',
                    controller: 'ProjectListController',
                })
                .when('/projects/new',{
                    templateUrl: 'build/html/project/edit.html',
                    controller: 'ProjectNewController',
                })
                .when('/projects/:id',{
                    templateUrl: 'build/html/project/show.html',
                    controller: 'ProjectShowController',
                })
                .when('/projects/:id/edit',{
                    templateUrl: 'build/html/project/edit.html',
                    controller: 'ProjectEditController',
                })
                .when('/projects/:id/remove',{
                    templateUrl: 'build/html/project/remove.html',
                    controller: 'ProjectRemoveController',
                })
                //Notes ------------------------------------------------
                .when('/project/:id/notes',{
                    templateUrl: 'build/html/project/note/index.html',
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
                //Files ------------------------------------------------
                .when('/project/:id/files',{
                    templateUrl: 'build/html/project/file/index.html',
                    controller: 'ProjectFileListController',
                })
                .when('/project/:id/files/:fileId',{
                    templateUrl: 'build/html/project/file/show.html',
                    controller: 'ProjectFileShowController',
                })
                .when('/project/:id/files/:fileId/new',{
                    templateUrl: 'build/html/project/file/new.html',
                    controller: 'ProjectFileNewController',
                })
                .when('/project/:id/files/:fileId/edit',{
                    templateUrl: 'build/html/project/file/edit.html',
                    controller: 'ProjectFileEditController',
                })
                .when('/project/:id/files/:fileId/remove',{
                    templateUrl: 'build/html/project/file/remove.html',
                    controller: 'ProjectFileRemoveController',
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

angular.module('codeProject')
    .directive('formatDate', function(){
        return {
            require: 'ngModel',
            link: function(scope, elem, attr, modelCtrl) {
                modelCtrl.$formatters.push(function(modelValue){
                    var temp = new Date(modelValue)
                    temp.setDate(temp.getDate()+1);
                    return temp;
                })
            }
        }
    });