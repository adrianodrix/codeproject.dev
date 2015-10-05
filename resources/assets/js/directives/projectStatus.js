angular.module('codeProject.directives')
    .directive('projectStatus', [function(){
            return {
                restrict: 'E',
                scope: {
                    value : '@'
                },
                link: function(scope, element, attrs){
                    scope.$watch('value', function(value){
                        if(value){
                            switch(Number(value)) {
                                case 0:
                                    element.html('<span class="label label-danger">Pendente</span>');
                                    break;
                                case 1:
                                    element.html('<span class="label label-warning">Em Andamento</span>');
                                    break;
                                case 2:
                                    element.html('<span class="label label-success">Concluido</span>');
                            };
                        }
                    });
                }
            };
        }]);
