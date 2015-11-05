'use strict';

//teste
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
    'ui.bootstrap.modal',
    'ui.bootstrap.dropdown',
    'ngFileUpload',
    'http-auth-interceptor',
    'angularUtils.directives.dirPagination',
    'mgcrea.ngStrap.navbar',
    'pusher-angular',
    'ui-notification',
    'angularMoment',
    'angular-loading-bar',
    'codeProject.controllers',
    'codeProject.services',
    'codeProject.directives',
    'codeProject.filters',
]);


angular.module('codeProject')
    .provider('codeProjectConfig', ['$httpParamSerializerProvider', function($httpParamSerializerProvider){
        var config = {
            baseUrl: 'http://codeproject.dev',
            pusher: {
                key: 'f99de3d9c1975b022e81',
            },
            project: {
                status: [
                    {'value': 0, 'label': 'Pendente'},
                    {'value': 1, 'label': 'Em Andamento'},
                    {'value': 2, 'label': 'Concluido'},
                ],
            },
            projectTask: {
                status: [
                    {'value': 0, 'label': 'Incompleto'},
                    {'value': 1, 'label': 'Completo'},
                ],
            },
            urls: {
                projectFile : '/project/{{id}}/file/{{fileId}}',
            },
            utils: {
                transformRequest: function(data){
                    if(angular.isObject(data)){
                        return $httpParamSerializerProvider.$get()(data);
                    }
                    return data;
                },
                transformReponse: function(data, headers){
                    var headersGetter = headers();
                    if(headersGetter['content-type'] == 'application/json' ||
                        headersGetter['content-type'] == 'text/json'){
                        var dataJson = JSON.parse(data);
                        if(dataJson.hasOwnProperty('data')  && Object.keys(dataJson).length == 1){
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
}]);

angular.module('codeProject')
    .config(
    ['$routeProvider', '$httpProvider', 'OAuthProvider', 'OAuthTokenProvider', 'codeProjectConfigProvider',
        function($routeProvider, $httpProvider, OAuthProvider, OAuthTokenProvider, codeProjectConfigProvider){

            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

            $httpProvider.defaults.transformResponse = codeProjectConfigProvider.config.utils.transformReponse;
            $httpProvider.defaults.transformRequest = codeProjectConfigProvider.config.utils.transformRequest;

            $httpProvider.interceptors.splice(0,1);
            $httpProvider.interceptors.splice(0,1);
            $httpProvider.interceptors.push('OAuthFixInterceptor');

            $routeProvider
                .when('/login', {
                    templateUrl: 'build/html/login.html',
                    controller: 'LoginController',
                })
                .when('/logout',{
                    resolve: {
                        logout: ['$location', 'OAuthToken', function($location, OAuthToken){
                            OAuthToken.removeToken();
                            return $location.path('/login');
                        }],
                    }
                })
                .when('/home',{
                    templateUrl: 'build/html/home.html',
                    controller: 'HomeController',
                })
                //Clients ---------------------------------------
                .when('/clients',{
                    templateUrl: 'build/html/client/index.html',
                    controller: 'ClientListController',
                    title: 'Clientes'
                })
                .when('/clients/dashboard',{
                    templateUrl: 'build/html/client/dashboard.html',
                    controller: 'ClientDashboardController',
                    title: 'Clientes'
                })
                .when('/clients/new',{
                    templateUrl: 'build/html/client/new.html',
                    controller: 'ClientNewController',
                    title: 'Novo Cliente',
                })
                .when('/clients/:id/edit',{
                    templateUrl: 'build/html/client/edit.html',
                    controller: 'ClientEditController',
                    title: 'Alterar Cliente',
                })
                .when('/clients/:id/remove',{
                    templateUrl: 'build/html/client/remove.html',
                    controller: 'ClientRemoveController',
                    title: 'Remover Cliente',
                })
                //Projects ----------------------------------------------
                .when('/projects',{
                    templateUrl: 'build/html/project/index.html',
                    controller: 'ProjectListController',
                    title: 'Projetos',
                })
                .when('/projects/dashboard',{
                    templateUrl: 'build/html/project/dashboard.html',
                    controller: 'ProjectDashboardController',
                    title: 'Projetos',
                })
                .when('/projects/new',{
                    templateUrl: 'build/html/project/edit.html',
                    controller: 'ProjectNewController',
                    title: 'Novo Projeto',
                })
                .when('/projects/:id',{
                    templateUrl: 'build/html/project/show.html',
                    controller: 'ProjectShowController',
                    title: 'Projeto',
                })
                .when('/projects/:id/edit',{
                    templateUrl: 'build/html/project/edit.html',
                    controller: 'ProjectEditController',
                    title: 'Editar Projeto',
                })
                .when('/projects/:id/members',{
                    templateUrl: 'build/html/project/members.html',
                    controller: 'ProjectMembersController',
                    title: 'Membros do Projeto',
                })
                .when('/projects/:id/remove',{
                    templateUrl: 'build/html/project/remove.html',
                    controller: 'ProjectRemoveController',
                    title: 'Remover Projeto',
                })
                //Notes ------------------------------------------------
                .when('/project/:id/notes',{
                    templateUrl: 'build/html/project/note/index.html',
                    controller: 'ProjectNoteListController',
                    title: 'Notas do Projeto',
                })
                .when('/project/:id/notes/:noteId',{
                    templateUrl: 'build/html/project/note/show.html',
                    controller: 'ProjectNoteShowController',
                    title: 'Nota',
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
                //Taks ------------------------------------------------
                .when('/project/:id/tasks',{
                    templateUrl: 'build/html/project/task/index.html',
                    controller: 'ProjectTaskListController',
                    title: 'Tarefas do Projeto',
                })
                .when('/project/:id/tasks/:taskId',{
                    templateUrl: 'build/html/project/task/show.html',
                    controller: 'ProjectTaskShowController',
                })
                .when('/project/:id/tasks/:taskId/new',{
                    templateUrl: 'build/html/project/task/new.html',
                    controller: 'ProjectTaskNewController',
                })
                .when('/project/:id/tasks/:taskId/edit',{
                    templateUrl: 'build/html/project/task/edit.html',
                    controller: 'ProjectTaskEditController',
                })
                .when('/project/:id/tasks/:taskId/remove',{
                    templateUrl: 'build/html/project/task/remove.html',
                    controller: 'ProjectTaskRemoveController',
                })
                //Files ------------------------------------------------
                .when('/project/:id/files',{
                    templateUrl: 'build/html/project/file/index.html',
                    controller: 'ProjectFileListController',
                    title: 'Arquivos do Projeto',
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
                    redirectTo: '/login'
                });

            OAuthProvider.configure({
                baseUrl: codeProjectConfigProvider.config.baseUrl,
                clientId: 'appid1',
                //clientSecret: 'secret',
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
    .run(['$rootScope', '$location', '$http', '$modal', '$cookies', '$pusher',
        'httpBuffer', 'OAuth', 'codeProjectConfig', 'Notification', 'amMoment',
        function($rootScope, $location, $http, $modal, $cookies, $pusher,
                 httpBuffer, OAuth, codeProjectConfig, Notification, amMoment) {

            amMoment.changeLocale('pt-br');

        $rootScope.$on('pusher-build', function(event, data){
            if(data.next.$$route.originalPath != '/login'){
                if(OAuth.isAuthenticated){
                    if (!window.client){
                        window.client = new Pusher(codeProjectConfig.pusher.key);
                        var pusher = $pusher(window.client);
                        var channel = pusher.subscribe('user.'+ $cookies.getObject('user').id);
                        channel.bind('CodeProject\\Events\\TaskWasIncluded',
                            function(data) {
                                Notification.primary('Tarefa '+ data.task.name + ', foi incluída!');
                            }
                        );
                    }
                }
            }
        });

        $rootScope.$on('pusher-destroy', function(event, data){
            if(data.next.$$route.originalPath == '/login'){
                if (window.client) {
                    window.client.disconnect();
                    window.client = null;
                }
            }
        });

        $rootScope.$on('$routeChangeStart', function(event, next, current){
            if (undefined != next){
                if(next.$$route.originalPath != '/login'){
                    if(!OAuth.isAuthenticated()){
                        $location.path('login');
                    }
                }
            } else {
                $location.path('login');
            }

            $rootScope.$emit('pusher-build', {next: next});
            $rootScope.$emit('pusher-destroy', {next: next});
        });

        $rootScope.$on('$routeChangeSuccess', function(event, current, previous){
            $rootScope.pageTitle = current.$$route.title;
        });

        $rootScope.$on('oauth:error', function(event, data) {
            // Ignore `invalid_grant` error - should be catched on `LoginController`.
            if ('invalid_grant' === data.rejection.data.error) {
                return;
            }

            // Refresh token when a `access_denied` error occurs.
            if ('access_denied' === data.rejection.data.error) {

                httpBuffer.append(data.rejection.config, data.deferred);
                if(!$rootScope.loginModalOpened){
                    var modalInstance = $modal.open({
                        templateUrl: 'build/html/templates/refresh-modal.html',
                        controller: 'RefreshModalController',
                    });
                    $rootScope.loginModalOpened = true;
                }
                return;

                /******************************************************************
                httpBuffer.append(data.rejection.config, data.deferred);
                if(!$rootScope.loginModalOpened){
                    var modalInstance = $modal.open({
                        templateUrl: 'build/html/templates/login-modal.html',
                        controller: 'LoginModalController',
                    });
                    $rootScope.loginModalOpened = true;
                }
                return;


                if(!$rootScope.isRefreshingToken) {
                    $rootScope.isRefreshingToken = true;
                    return OAuth.getRefreshToken().then(function (response) {
                        $rootScope.isRefreshingToken = false;
                        return $http(data.rejection.config).then(function (response) {
                            return data.deferred.resolve(response);
                        });
                    });
                } else {
                    return $http(data.rejection.config).then(function (response) {
                        return data.deferred.resolve(response);
                    });
                }
                return;
                 *******************************************************************/
            }

            // Redirect to `/login` with the `error_reason`.
            return $location.path('login');
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
