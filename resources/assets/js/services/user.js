angular.module('codeProject.services')
    .service('User', ['$resource', 'codeProjectConfig',
    function($resource, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/user', {},{
            authenticated: {
                url: codeProjectConfig.baseUrl + '/user/authenticated',
                method: 'GET'
            },
        });
    }]);
