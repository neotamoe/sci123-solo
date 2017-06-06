myApp.controller('ReviewController', ['$http', '$location', 'questionsService', '$scope', 'ReviewSubmitService', function($http, $location, questionsService, $scope, ReviewSubmitService) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

  console.log('ReviewController loaded');

  vm.toReview = [];

  vm.getPendingQuestions = function(){
    ReviewSubmitService.getPendingQuestions().then(function(data){
      vm.toReview=data;
      console.log('vm.toReview:', vm.toReview);
    });
  };

  vm.getPendingQuestions();

}]);  // end ReviewController
