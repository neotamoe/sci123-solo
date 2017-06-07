myApp.controller('ReviewController', ['$http', '$location', 'questionsService', '$scope', 'ReviewSubmitService', function($http, $location, questionsService, $scope, ReviewSubmitService) {
  var vm = this;

  console.log('ReviewController loaded');



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

  vm.toReview = [];

  vm.getPendingQuestions = function(){
    ReviewSubmitService.getPendingQuestions().then(function(data){
      vm.toReview=data;
      console.log('vm.toReview:', vm.toReview);
    });
  };

  vm.approve = function(){
    console.log('vm.toReview[i]._id:', vm.toReview[vm.toReview_index]._id);
    ReviewSubmitService.approvePending(vm.toReview[vm.toReview_index]._id).then(function(response){
      console.log('logging response to see if status code is here:', response +'or response.status:', response.status);
      if(response.status===200){
        vm.approveStatus = true;
      }
    });
  };

  vm.delete = function(){
    ReviewSubmitService.deletePending(vm.toReview[vm.toReview_index]._id).then(function(data){
      console.log('data:', data);
      if(data.status===200){
        vm.deleteStatus = true;
      }
    });
  };

  vm.getPendingQuestions();

  vm.toReview_index = 0;

  vm.next = function () {
    if (vm.toReview_index >= vm.toReview.length - 1) {
      $location.path("/user");
    } else {
      vm.approve = false;
      vm.toReview_index++;
    }
    console.log('index:' + vm.toReview_index + '/' + 'length-1:' + vm.toReview.length-1);
  };

  vm.edit = function(){
    vm.hide=false;
    vm.show=false;
  };

  vm.show = true;
  vm.hide = true;
  vm.approveStatus = false;
  vm.deleteStatus = false;
  vm.approveMessage = "Question approved and saved in database.";
  vm.deleteMessage = "Question deleted from database.";
  // vm.saveMessage = "Question saved in database for future review and approval.";
  vm.nothingtoreview = "No new questions to review.";

  vm.save = function(){
    ReviewSubmitService.savePending(vm.toReview[vm.toReview_index]).then(function(data){
      console.log('data-->', data);
      if (data.status===200){
        vm.hide = true;
        vm.show = true;
      }
    });
  };
}]);  // end ReviewController
