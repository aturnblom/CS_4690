angular.module('app').factory('studentSvc', function($http) {
    studentService = {
        getStudents: function() {
            return $http.get('/api/v1/students.json');
        },
        addStudent: function(student) {
            return $http.post('/api/v1/students.json', student);
        },
        deleteStudent: function(studentId) {
            return $http.delete(`/api/v1/students/${studentId}.json`);
        },
        updateStudent: function(updateStudent) {
            return $http.put(`/api/v1/students/${updateStudent.id}.json`, updateStudent);
        }
    };
    return studentService;
});