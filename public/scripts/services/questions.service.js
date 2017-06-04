myApp.service('questionsService', function($http,$routeParams,$route){

  var self = this;

  // self.getTagsQuestions = function(tag){
  //   console.log('getQuestions from selected tags-->', $routeParams.selected);
  //   tag=$routeParams.selected;
  //   console.log('tag:', $routeParams.selected);
  //   return $http({
  //     method: 'GET',
  //     url: '/box/'+$routeParams.selected,
  //   }).then(function(response){
  //     return response.data;
  //   });
  // };

  var count = 0;

  self.getCount = function(){
    return count;
  };  // end getCount

  self.setCount = function(){
    count++;
  };  // end setCount

  self.getTagsQuestions = function(tag,tag2,tag3){
    tag=$routeParams.selected;
    tag2=$routeParams.selected2;
    tag3=$routeParams.selected3;

    console.log('getQuestions with $routeParams-->', $routeParams);
    console.log('tags: 1:'+ tag + ' 2: '+ tag2 + ' 3: '+  tag3);
    return $http({
      method: 'GET',
      url: '/box/'+tag+'/'+tag2+'/'+tag3
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
