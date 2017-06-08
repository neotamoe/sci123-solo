myApp.controller('QuizController', ['$http', '$location', 'questionsService', '$routeParams', function($http, $location, questionsService, $routeParams) {
  var vm = this;
  console.log('QuizController loaded');
  console.log('checking user');
  console.log('$routeParams: ', $routeParams);

  vm.chapter = $routeParams.chapterid;

  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
    if(response.data.email) {
      // user has a current session on the server
      vm.userName = response.data.firstName;
      vm.userEmail = response.data.email;
      console.log('from QuizController: still logged in as User Data: ', vm.userName);
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

  vm.getQuestions = function(){
    questionsService.getQuestions(vm.chapter).then(function(data){
      console.log('back from server with five random questions/data-->', data);
      vm.fiveData = data;
      console.log('vm.fiveData:', vm.fiveData);
      return vm.fiveData;
    });
  };

  vm.getQuestions();

  vm.counter = function(){
    questionsService.getCount(vm.userEmail).then(function(data){
      vm.points=data;
    });
  };

  vm.counter();

  vm.fiveData_index = 0;
  vm.showMessage = false;
  vm.buttonDisabled = false;

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
      // add message here saying question was flagged for review in database
      vm.flagIn = true;
      vm.flagMessage = "Thanks!  Question flagged and submitted to database for review.";
    });
  };

}]);  // end QuizController
