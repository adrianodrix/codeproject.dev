angular.module('codeProject.services')
    .service('Project', ['$resource', '$filter', '$httpParamSerializer', 'codeProjectConfig',
    function($resource, $filter, $httpParamSerializer, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/project/:id', {id: '@id'},{
            get: {
                method: 'GET',
                transformResponse: function(data, headers){
                    var o = codeProjectConfig.utils.transformReponse(data, headers);
                    if (o.hasOwnProperty('due_date') && o.due_date){
                        var arrayDate = o.due_date.split('-'),
                            month = parseInt(arrayDate[1] - 1);
                        o.due_date = new Date(arrayDate[0], month, arrayDate[2]);
                    }
                    return o;
                }
            },
            query: {
                isArray: false,
            },
            update: {
                method: 'PUT'
            }
        });
    }]);
