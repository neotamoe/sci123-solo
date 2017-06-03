myApp.service('questionsService', function($http,$routeParams){

  var self = this;

  self.getTagsQuestions = function(tag){
    console.log('getQuestions from selected tags-->', $routeParams.selected);
    tag=$routeParams.selected;
    console.log('tag:', $routeParams.selected);
    return $http({
      method: 'GET',
      url: '/box/'+$routeParams.selected,
      // params: {
      //   tag: $routeParams.selected,
      //   display: true,
      // }
    }).then(function(response){
      return response.data;
    });
  };

  self.getQuestions = function(chapter){
    console.log('getQuestions from chapter-->', chapter);
    return $http({
      method: 'GET',
      url: '/questions/' + chapter,
    }).then(function(response){
      return response.data;
    });
  };



  self.getTags = function(){
    console.log('get tags from all questions');
    return $http({
      method: 'GET',
      url: '/questions',
    }).then(function(response){
      return response.data;
    });
  };
});  // end questionService
