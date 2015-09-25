angular.module('codeProject.services')
    .service('ProjectTask', ['$resource', 'codeProjectConfig',
    function($resource, codeProjectConfig){
        return $resource(codeProjectConfig.baseUrl + '/project/:id/task/:taskId', {id: '@id', taskId: '@taskId'},{
            get: {
                method: 'GET',
                transformResponse: function(data, headers){
                    var o = codeProjectConfig.utils.transformReponse(data, headers);
                    if (o.hasOwnProperty('start_date') && o.start_date){
                        var arrayDate = o.start_date.split('-'),
                            month = parseInt(arrayDate[1] - 1);
                        o.start_date = new Date(arrayDate[0], month, arrayDate[2]);
                    }
                    if (o.hasOwnProperty('due_date') && o.due_date){
                        var arrayDate = o.due_date.split('-'),
                            month = parseInt(arrayDate[1] - 1);
                        o.due_date = new Date(arrayDate[0], month, arrayDate[2]);
                    }
                    return o;
                }
            },
            update: {
                method: 'PUT'
            }
        });
    }]);
