angular.module('codeProject.filters').filter('projectStatus', [function(){
    return function(input){
        switch(input) {
            case 0:
                return 'Pendente';
                break;
            case 1:
                return 'Em Andamento';
                break;
            case 2:
                return 'Concluído';
            default:
                return input;
        };
        return input;
    };
}]);