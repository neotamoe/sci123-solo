myApp.service('ReviewSubmitService', function($http,$routeParams,$route){
  // globals
  var self = this;
  // gets all questions from database with display: 'false' for review by admin
  self.getPendingQuestions = function(){
    return $http({
      method: 'GET',
      url: '/pending/'
    }).then(function(response){
      return response.data;
    });
  };
  // approves question for use in quiz by updating display field from 'true' to 'false'
  self.approvePending = function(id){
    return $http({
      method:'PUT',
      url:'/pending/' + id,
    }).then(function(response){
      return response;
    });
  };
  // deletes question from quiz database
  self.deletePending = function(id){
    return $http({
      method:'DELETE',
      url:'/pending/' + id,
    }).then(function(response){
      return response;
    });
  };
  // updates/saves question after editing by admin into database
  self.savePending = function(pending){
    return $http({
      method:'PUT',
      url:'/pending',
      data: pending
    }).then(function(response){
      return response;
    });
  };
  // sends user question data to database for future review by admin
  self.studentSubmit = function(question){
    return $http({
      method: 'POST',
      url: '/submit',
      data: question
    }).then(function(response){
      return response;
    });
  };
});  // end questionService
