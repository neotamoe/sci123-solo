myApp.controller('UserController', ['$http', '$location', 'questionsService', '$scope', function($http, $location, questionsService, $scope) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

  console.log('checking user');

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



  vm.getQuestions = function(chapter){
    questionsService.getQuestions(chapter).then(function(data){
      console.log('back from server with five random questions/data-->', data);
      vm.fiveData = data;
      console.log('vm.fiveData:', vm.fiveData);
      // $scope.$apply()
    });
  };

//stackoverflow.com/questions/30562262/angularjs-display-one-specific-object-in-an-array-at-a-time
  // vm.setSelectedItem = function (item) {
  //   vm.selectedItem = item;
  // };





}]);  // end UserController
