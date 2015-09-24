angular.module('codeProject.services')
    .service('Url', ['$interpolate',  function($interpolate){
        return {
            getUrlFromUrlSymbol: function(url, params){
                var urlMod = $interpolate(url)(params);

                return urlMod
                    .replace(/\/\//g,'/')
                    .replace(/\/$/,'/')
                    .replace(/\/$/, '');
            },
            getUrlResource: function(url){
            return url
                .replace(new RegExp('{{', 'g'), ':')
                .replace(new RegExp('}}', 'g'), '');
            },
        };
    }]);
