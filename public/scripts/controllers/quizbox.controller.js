myApp.controller('QuizBoxController', ['$scope', '$http', '$location', 'questionsService', '$route','$routeParams', function($scope, $http, $location, questionsService, $route, $routeParams) {
  var vm = this;
  console.log('QuizBoxController loaded');
  console.log('checking user');

  console.log('$route.current.params-->', $route.current.params);

  vm.counter = function(){
    questionsService.getCount(vm.userEmail).then(function(data){
      vm.points=data;
    });
  };

  vm.counter();

  vm.error = false;

  vm.getTagsQuestions = function(){
    questionsService.getTagsQuestions($route.current.params).then(function(data){
      console.log('back from server with TAGS five random questions/data-->', data);
      vm.fiveData = data;
      console.log('vm.fiveData:', vm.fiveData);
      if (vm.fiveData.length===0) {
        vm.error = true;
        vm.errorMessage="You didn\'t select a topic!  Click the 'Main' button and try again.";
      } else{
        return vm.fiveData;
      }
    });
  };

  vm.getTagsQuestions();

  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
    // username is actually email address
      if(response.data.email) {
        // user has a current session on the server
        vm.userName = response.data.firstName;
        console.log('User Data: ', vm.userName);
      } else {
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
  });

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

  vm.getTagsQuestions = function(){
    console.log('in getTagsQuestions: vm.selected:', vm.selected);
    questionsService.getTagsQuestions(vm.selected).then(function(data){
      console.log('back from server with TAGS five random questions/data-->', data);
      vm.fiveData = data;
      console.log('vm.fiveData:', vm.fiveData);
      return vm.fiveData;
    });
  };

  // vm.getTagsQuestions();

  vm.fiveData_index = 0;
  vm.showMessage = false;
  vm.buttonDisabled = false;
  // vm.quizQ = {};

  vm.next = function () {
    vm.showMessage = false;
    vm.buttonDisabled = false;
    vm.flagIn = false;
    if (vm.fiveData_index >= vm.fiveData.length - 1) {
      // vm.fiveData_index = 0;
      $location.path("/endquiz");
    } else {
      vm.fiveData_index++;
    }
    console.log('index' + vm.fiveData_index + '/' + 'length' + vm.fiveData.length);
  };

  vm.check = function(answer){
    vm.showMessage = true;
    vm.buttonDisabled=true;
    console.log('you clicked:', answer);
    if (answer==vm.fiveData[vm.fiveData_index].answer) {
      vm.message = 'CORRECT!';
      questionsService.setCount(vm.userEmail).then(function(){
        vm.counter();
      });
    } else{
      vm.message = 'INCORRECT.  The correct answer is ' + vm.fiveData[vm.fiveData_index].answer + '.';
    }
  };

  vm.flagIn = false;

  vm.flag = function(){
    console.log('in flag message function');
    questionsService.flag(vm.fiveData[vm.fiveData_index]._id).then(function(){
      vm.flagIn = true;
      vm.flagMessage = "Thanks!  Question flagged and submitted to database for review.";
    });
  };

}]);  // end QuizBoxController
