myApp.service('questionsService', function($http,$routeParams,$route){

  var self = this;

  var count;

  self.getCount = function(userEmail){
    return $http({
      method: 'GET',
      url: '/points',
      params: {
        email: userEmail,
      }
    }).then(function(response){
      console.log('getCount response.data = ', response);
      count = response.data[0].points;
      console.log('service count:',count);
      return count;
    });
  };  // end getCount

  // self.getCount = function(){
  //   return count;
  // };

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
