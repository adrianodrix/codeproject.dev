angular.module('codeProject.services')
    .service('Client', ['$resource', 'codeProjectConfig',
    function($resource, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/client/:id', {id: '@id'},{
            query: {
                isArray: false,
            },
            update: {
                method: 'PUT'
            },
        });
    }]);
