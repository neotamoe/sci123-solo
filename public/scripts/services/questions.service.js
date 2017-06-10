myApp.service('questionsService', function($http,$routeParams,$route){
  // globals
  var self = this;
  var count;
  // get to retrieve points for current logged in user
  self.getCount = function(userEmail){
    return $http({
      method: 'GET',
      url: '/points',
      params: {
        email: userEmail,
      }
    }).then(function(response){
      count = response.data[0].points;
      return count;
    });
  };  // end getCount
  // increases count and POSTS new points total to specific user document in user collection
  self.setCount = function(userEmail){
    count++;
    var objectToSend = {
      email: userEmail,
      points: count
    };
    return $http({
      method: 'POST',
      url: '/points',
      data: objectToSend
    }).then(function(response){
      count = response.data.points;
      return count;
    });
  };  // end setCount
  // gets questions utilizing $routeParams and based on selected tags/keywords chosen by user
  self.getTagsQuestions = function(tag,tag2,tag3){
    tag=$routeParams.selected;
    tag2=$routeParams.selected2;
    tag3=$routeParams.selected3;
    return $http({
      method: 'GET',
      url: '/box/'+tag+'/'+tag2+'/'+tag3
    }).then(function(response){
      return response.data;
    });
  };
  // gets questions based on chapter selected by user
  self.getQuestions = function(chapter){
    return $http({
      method: 'GET',
      url: '/questions/' + chapter,
    }).then(function(response){
      return response.data;
    });
  };
  // gets all tags/keywords from database
  self.getTags = function(){
    return $http({
      method: 'GET',
      url: '/questions',
    }).then(function(response){
      return response.data;
    });
  };
  // updates selected questions in database that are flagged by user
  self.flag = function(id){
    return $http({
      method:'PUT',
      url:'/submit/' + id,
    }).then(function(response){
      return response;
    });
  };
});  // end questionService
