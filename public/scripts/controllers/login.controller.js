myApp.controller('LoginController', ['$http', '$location', function($http, $location) {
  // globals
  var vm = this;
  vm.message = '';
  vm.user = {
    email: '',
    password: ''
  };
  // vm.login checks both fields are submitted and sends for verification
  vm.login = function() {
    if(vm.user.email == '' || vm.user.password == '') {
      vm.message = "Enter your email and password!";
    } else {
      $http.post('/', vm.user).then(function(response) {
        if(response.data.email) {
          $location.path('/user');
        } else {
          vm.message = "Incorrect email and/or password.  Try again.";
        }
      });
    }
  };
  // vm.registerUser takes in new user information and then redirects back to home page to login
  vm.registerUser = function() {
    if(vm.user.email == '' || vm.user.password == '' || vm.user.firstName=='') {
      vm.message = "Enter your email and first name and choose a password!";
    } else {
      $http.post('/register', vm.user).then(function(response) {
        $location.path('/home');
      },
      function(response) {
        vm.message = "Please try again.";
      });
    }
  };
}]);
