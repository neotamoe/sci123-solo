myApp.controller('UserController', ['$http', '$location', 'questionsService', '$scope', function($http, $location, questionsService, $scope) {
  // globals
  var vm = this;
  vm.items = [];
  vm.selected=[];
  vm.limit = 3;

  // when controller loads, check user's session on the server
  $http.get('/user').then(function(response) {
    // user email is required to be unique so this is what is checked
    if(response.data.email) {
      // user has current session on server
      vm.userName = response.data.firstName;
      vm.userEmail = response.data.email;
      vm.adminStatus = response.data.admin;
      console.log('User Data: ', vm.userEmail + 'user firstName:', vm.userName);
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
  // gets tags/keywords from database for use in student question submission
  vm.getTags = function(){
    questionsService.getTags().then(function(data){
      vm.items = data;
      return vm.items;
    });
  };
  // runs this function on page load
  vm.getTags();
  // gets user stored points from database
  vm.counter = function(){
    questionsService.getCount(vm.userEmail).then(function(data){
      vm.points=data;
    });
  };
  // runs this function on page load
  vm.counter();
  // when checkbox is clicked, adds or removes tag/keyword from vm.selected array
  vm.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };
  // checks to see if new checked tag/keyword is in vm.selected
  vm.exists = function (item, list) {
    // evaluates to true or false for each ng-repeated checkbox item
    return list.indexOf(item) > -1;
  };
}]);  // end UserController
