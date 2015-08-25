angular.module('codeProject.services')
    .service('ProjectNote', ['$resource', 'codeProjectConfig',
    function($resource, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/project/:id/note/:noteId', {id: '@id', noteId: '@noteId'},{
            update: {
                method: 'PUT'
            }
        });
    }]);
