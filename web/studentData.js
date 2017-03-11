angular.module('app').controller('MainCtrl', function($scope, studentSvc) {
  /* global $ */
  /* global Cookies */

  //--------------- NEEDED VARIABLE/OBJ DEC --------------
		$scope.students = [];
		var sortBy = {category: '', clicked: 0};
		var completed = 0;
		var deletedStudents = [];
		const FADE_TIME = 300;
		const MODAL_TIME = 500;
		const STUDENT_DISPLAY_NUM = 10;

  //--------------- DOCUMENT READY FUNCTIONS -------------

  //--------------- AJAX GET JSON
	 // ../server/students.json
		studentSvc.getStudents().then(function(result) { 
				let students = result.data;
				displayTable(students.sort(idCompare));
				displayTiles(students);
		});


    //--------------- VIEW BUTTON FUNCTIONS AND COOKIES ----
    $('#toggleButton').click(function() {
      $('tbody').toggle(FADE_TIME);
      $('.panel-body').toggle(FADE_TIME);
      // Cookies.set('toggleData','hide');
    });
    $('#tileButton').click(function() {
      $('table').hide(FADE_TIME);
      $('#tiles').show(FADE_TIME);
      Cookies.set('view', 'tiles');
    });
    $('#tableButton').click(function() {
      $('table').show(FADE_TIME);
      $('#tiles').hide(FADE_TIME);
      Cookies.set('view', 'table');
    });

    if (Cookies.get('view') == 'tiles') {
      $('table').hide();
      $('#tiles').show();
    }
    // ---------------- ADD, DELETE, UPDATE BUTTONS -----

    $('#deleteStudent').click(function() {
      $('#deleteList').html('');
      $('#updateList').html('');
      for (let j = 0; j < students.length; j++) {
        $('#deleteList').append('<md-option>' + students[j].id + '</md-option>');
        $('#updateList').append('<md-option>' + students[j].id + '</option>');
      }
    });

    $('#updateStudent').click(function() {
      $('#deleteList').html('');
      $('#updateList').html('');
      for (let j = 0; j < students.length; j++) {
        $('#deleteList').append('<md-option>' + students[j].id + '</md-option>');
        $('#updateList').append('<md-option>' + students[j].id + '</md-option>');
      }

    });


    $('#addStudentSubmit').click(function() {

      let addStudent = {};
      addStudent.fname = $('#fnameForm').val();
      addStudent.lname = $('#lnameForm').val();
      addStudent.startDate = $('#startDateForm').val();
      addStudent.street = $('#streetForm').val();
      addStudent.city = $('#cityForm').val();
      addStudent.state = $('#stateForm').val();
      addStudent.zip = $('#zipForm').val();
      addStudent.phone = $('#phoneForm').val();
      addStudent.year = $('#yearForm').val();
      // addStudent.fname = $('#fnameForm').val();

      // alert(JSON.stringify(addStudent, null, 2));

			studentSvc.addStudent(addStudent);
      // $.ajax({url: '/api/v1/students.json', method: 'POST', data: addStudent});
    });
		//TODO: Turn this into an ng-click
    $('#deleteStudentSubmit').click(function() {
      let deleteId = $('#deleteList').val();

			studentSvc.deletedStudents(deleteId);
      // $.ajax({url: `/api/v1/students/${deleteId}.json`, method: 'DELETE'});
    });
    $('#updateStudentSubmit').click(function() {

      let updateId = $('#updateList').val();

      let updateStudent = {};
      updateStudent.fname = $('#fnameUpForm').val();
      updateStudent.lname = $('#lnameUpForm').val();
      updateStudent.startDate = $('#startDateUpForm').val();
      updateStudent.street = $('#streetUpForm').val();
      updateStudent.city = $('#cityUpForm').val();
      updateStudent.state = $('#stateUpForm').val();
      updateStudent.zip = $('#zipUpForm').val();
      updateStudent.phone = $('#phoneUpForm').val();
      updateStudent.year = $('#yearUpForm').val();
      updateStudent.id = updateId;

			studentSvc.updateStudent(updateId, updateStudent);
      // $.ajax({
      //   url: `/api/v1/students/${updateId}.json`,
      //   method: 'PUT',
      //   data: updateStudent
      // });
    });



    //----------------- SORTING FUNCTIONS ---------------

    $('#tableName').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'Name', nameCompare);
      }, MODAL_TIME);
    });
    $('#tableStart').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'Start', startDateCompare);
      }, MODAL_TIME);
    });
    $('#tableCity').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'City', cityCompare);
      }, MODAL_TIME);
    });
    $('#tableState').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'State', stateCompare);
      }, MODAL_TIME);
    });
    $('#tableZip').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'Zip', zipCompare);
      }, MODAL_TIME);
    });
    $('#tableYear').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'Year', yearCompare);
      }, MODAL_TIME);
    });
    $('#tableID').click(function() {
      $('#myModal').modal('show');
      setTimeout(function() {
        $('#myModal').modal('hide');
        tableSort(sortBy, 'ID', idCompare);
      }, MODAL_TIME);
    });


    if (Cookies.get('cat')) {
      $('#table' + Cookies.get('cat')).click();
    } else if (Cookies.get('revCat')) {
      let cat = Cookies.get('revCat');
      $('#table' + cat).click().click();
    }
    //---------------- END DOCUMENT READY ---------------
  // });



  //----------- COMPARE FUNCTIONS ---------------------

  // THESE COMPARATORS ARE FOUND IN sortComparators.js

  //----------- DISPLAY FUNCTIONS ---------------------

  function tableHeadReset() {
    $('#tableName').html('Name');
    $('#tableStart').html('Start');
    $('#tableCity').html('City');
    $('#tableState').html('State');
    $('#tableZip').html('Zip');
    $('#tableYear').html('Year');
    $('#tableID').html('ID');
  }


  function displayTable(studentsIn) {
    tableHeadReset();

    studentsIn = JSON.parse(JSON.stringify(studentsIn, yearReplacer));

    let studentsString = [];
    for (let student of studentsIn) {
      studentsString.push(
          `<tr id=${student.id}>` +
          '<td>' + student.lname + ', ' + student.fname + '</td>' +
          '<td>' + student.startDate + '</td>' +
          '<td>' + student.street + '</td>' +
          '<td>' + student.city + '</td>' +
          '<td>' + student.state + '</td>' +
          '<td>' + student.zip + '</td>' +
          '<td>' + student.phone + '</td>' +
          '<td>' + student.year + '</td>' +
          '<td>' + student.id + '</td>' +
          '</tr>');
    }
    studentsString.join(' ');
    $('tbody').html(studentsString);
  }

  function displayTiles(studentsIn) {
		$scope.students = studentsIn;
    // studentsIn = JSON.parse(JSON.stringify(studentsIn, yearReplacer));

    // let studentsString = [];
    // for (let student of studentsIn) {
    //   studentsString.push(
    //       '<md-grid-tile class="col-sm-4 col-md-3"><div class="panel panel-default"><div class="panel-heading">' +
    //       '<b>' + student.fname + ' ' + student.lname + '</b>' +
    //       '</div>' +
    //       '<div class="panel-body">' +
    //       'Start: ' + student.startDate + '<br>' +
    //       'Street: ' + student.street + '<br>' +
    //       'City: ' + student.city + '<br>' +
    //       'State: ' + student.state + '<br>' +
    //       'Zip: ' + student.zip + '<br>' +
    //       'Phone: ' + student.phone + '<br>' +
    //       'Year: ' + student.year + '</div></div></md-grid-tile>');
    // }
    // studentsString.join(' ');
    // $('#subTiles').html(studentsString);
  }

  //----------------- SORTING HELPER FUNCTIONS ---------------
  function tableSort(sortObj, category, sorter) {
    if (sortObj.category === category) {
      if (sortObj.clicked === 0) {
        displayTable(students.sort(sorter));
        $('#table' + category).html(category + ' &#x25b2');
        sortObj.clicked = 1;
        Cookies.set('cat', category);
        // Cookies.set('sortType', sorter);
        Cookies.remove('revCat');

      } else if (sortObj.clicked === 1) {
        displayTable(students.sort(sorter).reverse());
        $('#table' + category).html(category + ' &#x25bc');
        sortObj.clicked = 0;
        Cookies.set('revCat', category);
        // Cookies.set('sortType', sorter);
        Cookies.remove('cat');
      }
    } else {
      displayTable(students.sort(sorter));
      $('#table' + category).html(category + ' &#x25b2');
      sortObj.category = category;
      sortObj.clicked = 1;
      Cookies.set('cat', category);
      //.set('sortType', sorter);
      Cookies.remove('revCat');
    }
  }

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
});