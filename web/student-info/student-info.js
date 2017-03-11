angular.module('app').directive('studentInfo', function() {
    return {
        templateUrl: '/student-info/student-info.html',
        restrict: 'E',
        scope: {
            student: '='
        },
        link: function(scope, elem, attrs) {
            console.log(scope.student);
        }
    }
});