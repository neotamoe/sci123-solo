myApp.controller('ReviewController', ['$http', '$location', 'questionsService', '$scope', 'ReviewSubmitService', function($http, $location, questionsService, $scope, ReviewSubmitService) {
  // globals
  var vm = this;
  vm.toReview = [];
  vm.toReview_index = 0;
  vm.show = true;
  vm.hide = true;
  vm.approveStatus = false;
  vm.deleteStatus = false;
  vm.approveMessage = "Question approved and saved in database.";
  vm.deleteMessage = "Question deleted from database.";
  vm.nothingtoreview = "No new questions to review.";
  vm.clicked = false;
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
  // gets questions pending review based on display: 'false'
  vm.getPendingQuestions = function(){
    ReviewSubmitService.getPendingQuestions().then(function(data){
      vm.toReview=data;
    });
  };
  // runs this function on page load
  vm.getPendingQuestions();
  // used by admin to change question display status to 'true'
  vm.approve = function(){
    ReviewSubmitService.approvePending(vm.toReview[vm.toReview_index]._id).then(function(response){
      if(response.status===200){
        // displays relevant message confirming status change
        vm.approveStatus = true;
        vm.clicked = true;
      }
    });
  };
  // used by admin to delete question from database
  vm.delete = function(){
    ReviewSubmitService.deletePending(vm.toReview[vm.toReview_index]._id).then(function(data){
      if(data.status===200){
        // displays relevant message
        vm.deleteStatus = true;
        vm.clicked = true;
      }
    });
  };
  // takes admin to next question
  vm.next = function () {
    // takes admin to /user if no more questions to review
    if (vm.toReview_index >= vm.toReview.length - 1) {
      $location.path('/user');
    } else {
      // resets messages and increases vm.toReview_index by 1
      vm.approveStatus = false;
      vm.deleteStatus = false;
      vm.clicked = false;
      vm.toReview_index++;
    }
  };
  // allows admin to edit database questions
  vm.edit = function(){
    // toggles divs to display question in inputs rather than static text display/review
    vm.hide=false;
    vm.show=false;
    vm.clicked=false;
    vm.approveStatus = false;
  };
  // allows admin to save question to database after editing and before approval
  vm.save = function(){
    ReviewSubmitService.savePending(vm.toReview[vm.toReview_index]).then(function(data){
      if (data.status===200){
        // after question is saved in database, toggles divs back to static text display/review
        vm.hide = true;
        vm.show = true;
      }
    });
  };
  // allows admin to cancel editing and return to static text display/review
  vm.cancel = function(){
    vm.hide = true;
    vm.show = true;
  };
}]);  // end ReviewController
