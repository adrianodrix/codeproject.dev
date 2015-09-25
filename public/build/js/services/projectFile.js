angular.module('codeProject.services')
    .service('ProjectFile', ['$resource', 'codeProjectConfig', 'Url',
    function($resource, codeProjectConfig, Url){
        return $resource(codeProjectConfig.baseUrl + Url.getUrlResource(codeProjectConfig.urls.projectFile), {id: '@id', fileId: '@fileId'},{
            update: {
                method: 'PUT',
            },
            download: {
                method: 'GET',
                url: codeProjectConfig.baseUrl + Url.getUrlResource(codeProjectConfig.urls.projectFile) + '/download',
            }
        });
    }]);
