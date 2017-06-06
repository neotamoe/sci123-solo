myApp.service('ReviewSubmitService', function($http,$routeParams,$route){

  var self = this;

  self.getPendingQuestions = function(){
    console.log('in get pending Questions');
    return $http({
      method: 'GET',
      url: '/pending'
    }).then(function(response){
      console.log('getPendingQuestions response:', response + 'response.data:', response.data);
      return response.data;
    });
  };

});  // end questionService
