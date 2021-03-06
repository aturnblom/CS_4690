angular.module('app').controller('MainCtrl', function($scope, $mdDialog, studentSvc, $filter, $timeout) {

	//--------------- NEEDED VARIABLE/OBJ DEC --------------
	$scope.students = [];
	$scope.toggleTable = false;
	$scope.toggleTile = true;
	$scope.loading = false;
	var sortBy = {category: '', clicked: 0};
	var completed = 0;
	var deletedStudents = [];
	const FADE_TIME = 300;
	const MODAL_TIME = 500;
	const STUDENT_DISPLAY_NUM = 10;

	//--------------- AJAX GET JSON
	function init() {
		$scope.addStudent = {};
		$scope.updateStudent = {};
		$scope.deleteStudent = {};
        studentSvc.getStudents().then(function (result) {
            $scope.students = result.data;
            $scope.students.forEach(student => student.startDate = new Date(student.startDate));
        });
    }

	$scope.showAddStudent = function($event) {
		$mdDialog.show({
			contentElement: '#addModal',
			parent: angular.element(document.body),
			targetEvent: $event,
			clickOutsideToClose: true
		});
	};

	$scope.showDeleteStudent = function($event) {
		$mdDialog.show({
			contentElement: '#deleteModal',
			parent: angular.element(document.body),
			targetEvent: $event,
			clickOutsideToClose: true
		});
	};

	$scope.showUpdateStudent = function($event) {
		$mdDialog.show({
			contentElement: '#updateModal',
			parent: angular.element(document.body),
			targetEvent: $event,
			clickOutsideToClose: true
		});
	};

	$scope.close = function() { $mdDialog.cancel(); };

	//--------------- VIEW BUTTON FUNCTIONS AND COOKIES ----

	$scope.toggleTileButton = function() {
		if(!$scope.toggleTile) {
			$scope.toggleTable = $scope.toggleTile;
			$scope.toggleTile = !$scope.toggleTile;
			Cookies.set('view', 'tiles');
		}
	};

	$scope.toggleTableButton = function() {
		if(!$scope.toggleTable) {
			$scope.toggleTile = $scope.toggleTable;
			$scope.toggleTable = !$scope.toggleTable;
			Cookies.set('view', 'table');
		}
	};

	if (Cookies.get('view') == 'table') {
		$scope.toggleTableButton();
	}

	$scope.addStudentSubmit = function() {
		studentSvc.addStudent($scope.addStudent).then(function () {
            init();
        });
        $mdDialog.cancel();
	};

	$scope.deleteStudentSubmit = function() {
		studentSvc.deleteStudent($scope.studentToDeleteById);
        	$mdDialog.cancel();
            init();
	};

	$scope.loadStudent = function() {
		$scope.updateStudent = $scope.students.find(function(student) {
			return student.id === $scope.studentToUpdate;
		});
	};

	$scope.updateStudentSubmit = function() {
		studentSvc.updateStudent($scope.updateStudent).then(function () {
            init();
        });
        $mdDialog.cancel();
	};

	//----------------- SORTING FUNCTIONS ---------------

	function displayLoadingModal(field, order) {
		$scope.loading = true;
		$timeout(function() {
			$scope.students = $filter('orderBy')($scope.students, field, order);
			$scope.loading = false;
		}, MODAL_TIME);
	}

	$scope.sortByName = function() {
		displayLoadingModal(['lname', 'fname'], $scope.sortNameDesc);
		$scope.sortNameDesc = !$scope.sortNameDesc;
	};

	$scope.sortByStartDate = function() {
		displayLoadingModal('startDate', $scope.sortStartDateDesc);
		$scope.sortStartDateDesc = !$scope.sortStartDateDesc;
	};

	$scope.sortByStreet = function() {
		displayLoadingModal('street', $scope.sortStreetDesc);
		$scope.sortStreetDesc = !$scope.sortStreetDesc;
	};

	$scope.sortByCity = function() {
		displayLoadingModal('city', $scope.sortCityDesc);
		$scope.sortCityDesc = !$scope.sortCityDesc;
	};

	$scope.sortByState = function() {
		displayLoadingModal('state', $scope.sortStateDesc);
		$scope.sortStateDesc = !$scope.sortStateDesc;
	};

	$scope.sortByZip = function() {
		displayLoadingModal('zip', $scope.sortZipDesc);
		$scope.sortZipDesc = !$scope.sortZipDesc;
	};

	$scope.sortByPhone = function() {
		displayLoadingModal('phone', $scope.sortPhoneDesc);
		$scope.sortPhoneDesc = !$scope.sortPhoneDesc;
	};

	$scope.sortByYear = function() {
		displayLoadingModal('year', $scope.sortYearDesc);
		$scope.sortYearDesc = !$scope.sortYearDesc;
	};
    $scope.sortByID = function() {
        displayLoadingModal('id', $scope.sortIDDesc);
        $scope.sortIDDesc = !$scope.sortIDDesc;
    };

	// ------------------- YEAR REPLACER FUNCTION --------------
	function yearReplacer(name, value) {
		if (typeof value === 'number') {
			if (value === 1)
				return 'Freshman';
			else if (value === 2)
				return 'Sophomore';
			else if (value === 3)
				return 'Junior';
			else if (value === 4)
				return 'Senior';
		}
		return value;
	}
	init();
});