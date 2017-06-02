myApp.service('questionsService', function($http){

  var self = this;

  self.getQuestions = function(chapter){
    console.log('getQuestions from chapter-->', chapter);
    return $http({
      method: 'GET',
      url: '/questions/' + chapter,
    }).then(function(response){
      return response.data;
    });
  };
});  // end questionService
