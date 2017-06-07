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

  self.deletePending = function(id){
    console.log('in DELETE deletePending');
    return $http({
      method:'DELETE',
      url:'/pending/' + id,
    }).then(function(response){
      console.log('delete pending service response:', response);
      return response;
    });
  };

  self.savePending = function(pending){
    console.log('in POST savePending: ', pending);
    return $http({
      method:'POST',
      url:'/pending',
      data: pending
    }).then(function(response){
      console.log('post SAVE pending service response:', response);
      return response;
    });
  };

  self.studentSubmit = function(question){
    console.log('in POST studentSubmit:', question);
    return $http({
      method: 'POST',
      url: '/submit',
      data: question
    }).then(function(response){
      console.log('POST studentSubmit question response:', response);
      return response;
    });
  };

  // self.sendEmail = function (){
  //   console.log('in sendEmail function in service');
  //   $http({
  //     method:
  //   })
  // }

});  // end questionService
