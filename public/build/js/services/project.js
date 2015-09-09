angular.module('codeProject.services')
    .service('Project', ['$resource', '$filter', '$httpParamSerializer', 'codeProjectConfig',
    function($resource, $filter, $httpParamSerializer, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/project/:id', {id: '@id'},{
            update: {
                method: 'PUT'
            }
        });
    }]);
