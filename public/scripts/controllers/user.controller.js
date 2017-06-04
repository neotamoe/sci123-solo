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

  vm.getTags = function(){
    questionsService.getTags().then(function(data){
      console.log('back from server with tags-->', data);
      vm.items = data;
      console.log('vm.items:', vm.items);
      return vm.items;
    });
  };

  vm.getTags();

  vm.counter = function(){
    return questionsService.getCount();
  };

  vm.items = [];
  vm.selected=[];

  vm.limit = 3;
  vm.checked = 0;

  vm.checkChanged = function(item){
    if ('ng-model="checkmark"' && vm.checked<3) {
      vm.checked++;
      console.log('vm.checked:', vm.checked);
    } else {
      vm.checked--;
      console.log('vm.checked:', vm.checked);
    }
  };

  vm.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  vm.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

}]);  // end UserController
