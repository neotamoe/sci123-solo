myApp.controller('QuizController', ['$http', '$location', 'questionsService', '$routeParams', function($http, $location, questionsService, $routeParams) {
  // globals
  var vm = this;
  vm.chapter = $routeParams.chapterid;
  vm.fiveData_index = 0;
  vm.showMessage = false;
  vm.buttonDisabled = false;
  vm.flagIn = false;
  // when controller loads, check user's session on the server
  $http.get('/user').then(function(response) {
    // user email is required to be unique so this is what is checked
    if(response.data.email) {
      // user has current session on server
      vm.userName = response.data.firstName;
      vm.userEmail = response.data.email;
    } else {
      // user has no session, bounce them back to the login page
      $location.path('/home');
    }
  });
  // logs out user from session on server
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      $location.path('/home');
    });
  };
  // gets questions from database based on selected chapter
  vm.getQuestions = function(){
    questionsService.getQuestions(vm.chapter).then(function(data){
      vm.fiveData = data;
      return vm.fiveData;
    });
  };
  // runs this function on page load
  vm.getQuestions();
  // gets user stored points from database
  vm.counter = function(){
    questionsService.getCount(vm.userEmail).then(function(data){
      vm.points=data;
    });
  };
  // runs this function on page load
  vm.counter();
  // takes user to next question
  vm.next = function () {
    // resets messages
    vm.showMessage = false;
    vm.buttonDisabled = false;
    vm.flagIn = false;
    // takes user to /endquiz if no more questions
    if (vm.fiveData_index >= vm.fiveData.length - 1) {
      $location.path('/endquiz');
    } else {
      // increases index
      vm.fiveData_index++;
    }
  };
  // checks user answer against correct answer in database
  vm.check = function(answer){
    // displays relevant message and disables buttons for remaining answers
    vm.showMessage = true;
    vm.buttonDisabled=true;
    if (answer==vm.fiveData[vm.fiveData_index].answer) {
      // displays correct message and increases user points by 1
      vm.message = 'CORRECT!';
      questionsService.setCount(vm.userEmail).then(function(){
        vm.counter();
      });
    } else{
      // displays incorrect message
      vm.message = 'INCORRECT.  The correct answer is ' + vm.fiveData[vm.fiveData_index].answer + '.';
    }
  };
  // flags a question in database as needing admin review
  vm.flag = function(){
    questionsService.flag(vm.fiveData[vm.fiveData_index]._id).then(function(){
      // displays relevant message to user
      vm.flagIn = true;
      vm.flagMessage = "Thanks!  Question flagged and submitted to database for review.";
    });
  };
}]);  // end QuizController
