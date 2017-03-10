angular.module('app').factory('studentSvc', function($http) {
    studentService = {
        getStudents: function() {
            return $http.get('/api/v1/students.json');
        },
    };
    return studentService;
});