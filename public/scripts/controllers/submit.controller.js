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

}]);  // end SubmitController
