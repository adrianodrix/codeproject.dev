angular.module('codeProject.services')
    .service('Project', ['$resource', 'codeProjectConfig',
    function($resource, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/project/:id', {id: '@id'},{
            update: {
                method: 'PUT'
            }
        });
    }]);
