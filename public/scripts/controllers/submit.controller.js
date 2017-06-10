myApp.controller('SubmitController', ['$http', '$location', 'questionsService', '$scope', 'ReviewSubmitService', function($http, $location, questionsService, $scope, ReviewSubmitService) {
  // globals
  var vm = this;
  vm.items = [];
  vm.selected=[];
  vm.limit = 3;
  // gets tags/keywords from database for use in student question submission
  vm.getTags = function(){
    questionsService.getTags().then(function(data){
      vm.items = data;
      return vm.items;
    });
  };
  // runs this function on page load
  vm.getTags();
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
  // submits data entered by student user along with display: 'false' and sends to database for admin review
  vm.studentSubmit = function(){
    vm.submit = {
      source: vm.submit.source,
      chapter: vm.submit.chapter,
      question: vm.submit.question,
      a: vm.submit.a,
      b: vm.submit.b,
      c: vm.submit.c,
      d: vm.submit.d,
      answer: vm.submit.answer,
      page: vm.submit.page,
      tags: vm.selected,
      display: 'false'
    };
    ReviewSubmitService.studentSubmit(vm.submit).then(function(data){
      if(data.status===200){
        // after saving in database, displays relevant message to user
        vm.thanks = 'Success!  Your question will be reviewed for inclusion in the quiz database.';
        vm.receivedStatus = true;
      }
    });
  };
  // clears form inputs and resets message
  vm.clearForm = function(){
    submitform.reset();
    vm.selected=[];
    vm.receivedStatus = false;
  };
}]);  // end SubmitController
