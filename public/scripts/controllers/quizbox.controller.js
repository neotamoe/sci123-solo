myApp.controller('QuizBoxController', ['$scope', '$http', '$location', 'questionsService', '$route','$routeParams', function($scope, $http, $location, questionsService, $route, $routeParams) {
  var vm = this;
  console.log('QuizBoxController loaded');
  console.log('checking user');

// this works, but trying to do without using $scope
  // $scope.$on('$routeChangeSuccess', function() {
  //   vm.selected = $routeParams.selected;
  //   console.log('inside $routeChangeSuccess--> vm.selected:', vm.selected);
  //   vm.getTagsQuestions = function(){
  //     console.log('in getTagsQuestions: vm.selected:', vm.selected);
  //     questionsService.getTagsQuestions(vm.selected).then(function(data){
  //       console.log('back from server with TAGS five random questions/data-->', data);
  //       vm.fiveData = data;
  //       console.log('vm.fiveData:', vm.fiveData);
  //       return vm.fiveData;
  //     });
  //   }();
  //   });

  console.log('$route.current.params-->', $route.current.params);
  vm.selected = $route.current.params.selected;
  console.log('outside $routeChangeSuccess--> vm.selected:', vm.selected);

  vm.getTagsQuestions = function(){
    console.log('in getTagsQuestions: vm.selected:', vm.selected);
    questionsService.getTagsQuestions(vm.selected).then(function(data){
      console.log('back from server with TAGS five random questions/data-->', data);
      vm.fiveData = data;
      console.log('vm.fiveData:', vm.fiveData);
      return vm.fiveData;
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
    if (vm.fiveData_index >= vm.fiveData.length - 1) {
      vm.fiveData_index = 0;
    } else {
      vm.fiveData_index++;
    }
    console.log('index' + vm.fiveData_index + '/' + 'length' + vm.fiveData.length);
  };

  vm.check = function(answer){
    console.log('you clicked:', answer);
    if (answer==vm.fiveData[vm.fiveData_index].answer) {
      vm.showMessage = true;
      vm.buttonDisabled=true;
      vm.message = 'Correct!';
    } else{
      vm.showMessage = true;
      vm.buttonDisabled=true;
      vm.message = 'Incorrect.  The correct answer is ' + vm.fiveData[vm.fiveData_index].answer + '.';
    }
  };


}]);  // end QuizBoxController
