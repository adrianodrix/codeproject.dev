angular.module('codeProject.services')
    .service('ProjectMember', ['$resource', 'codeProjectConfig',
    function($resource, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/project/:id/member/:memberId', {id: '@id', memberId: '@memberId'},{
            update: {
                method: 'PUT'
            }
        });
    }]);
