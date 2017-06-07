myApp.controller('SubmitController', ['$http', '$location', 'questionsService', '$scope', 'ReviewSubmitService', function($http, $location, questionsService, $scope, ReviewSubmitService) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

  console.log('SubmitController loaded');

  vm.getTags = function(){
    questionsService.getTags().then(function(data){
      console.log('back from server with tags-->', data);
      vm.items = data;
      console.log('vm.items:', vm.items);
      return vm.items;
    });
  };

  vm.getTags();

  vm.items = [];
  vm.selected=[];

  vm.limit = 3;

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
    };
    ReviewSubmitService.studentSubmit(vm.submit).then(function(data){
      console.log('data:', data);
      if(data.status===200){
        console.log('quesiton successfully submitted to database');
      }
    });
  };

}]);  // end SubmitController
