myApp.service('ReviewSubmitService', function($http,$routeParams,$route){

  var self = this;

  self.getPendingQuestions = function(){
    console.log('in get pending Questions');
    return $http({
      method: 'GET',
      url: '/pending/'
    }).then(function(response){
      console.log('getPendingQuestions response:', response + 'response.data:', response.data);
      return response.data;
    });
  };

  self.approvePending = function(id){
    console.log('in POST approvePending');
    return $http({
      method:'POST',
      url:'/pending/' + id,
    }).then(function(response){
      console.log('approve pending service response:', response);
      return response;
    });
  };

  // self.denyPending = function(){
  //   console.log('in POST denyPending');
  // };

});  // end questionService
