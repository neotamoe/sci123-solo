myApp.controller('QuizBoxController', ['$scope', '$http', '$location', 'questionsService', '$route','$routeParams', function($scope, $http, $location, questionsService, $route, $routeParams) {
  // globals
  var vm = this;
  vm.error = false;
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
    } else {
      // user has no session, bounce them back to the login page
      $location.path('/home');
    }
  });
  // logs out user from session on server
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      $location.path("/home");
    });
  };
  // gets questions from database based on selected tag/keyword
  vm.getTagsQuestions = function(){
    questionsService.getTagsQuestions($route.current.params).then(function(data){
      vm.fiveData = data;
      if (vm.fiveData.length===0) {
        // displays relevant message if user does not select any tag/keyword
        vm.error = true;
        vm.errorMessage="You didn\'t select a topic!  Click the 'Main' button and try again.";
      } else{
        return vm.fiveData;
      }
    });
  };
  // runs this function on page load
  vm.getTagsQuestions();
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
    console.log('in flag message function');
    questionsService.flag(vm.fiveData[vm.fiveData_index]._id).then(function(){
      // displays relevant message to user
      vm.flagIn = true;
      vm.flagMessage = "Thanks!  Question flagged and submitted to database for review.";
    });
  };

}]);  // end QuizBoxController
