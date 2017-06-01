myApp.service('questionsService', function($http){

  var self = this;

  self.getQuestions = function(chapter){
    console.log('getQuestions from chapter-->', chapter);
    return $http({
      method: 'GET',
      url: '/questions/' + chapter,
    }).then(function(response){
      // return console.log('chapter woof');
      return response.data;
    });
  };
});  // end questionService

  // self.getFaves = function(){
  //   return $http({
  //     method: 'GET',
  //     url: '/savefaves/'
  //   }).then(function(response){
  //     return response.data;
  //   });
  // };  // end getFaves
  //
  // self.addFavorite = function(objectToSend){
  //   return $http({
  //     method: 'POST',
  //     url: '/savemovie/',
  //     data: objectToSend
  //   }).then(function(response){
  //       console.log('response-->', response);
  //       return response.data;
  //     });  // end then
  //   };  // end addFavorite
  //
  // self.deleteFave = function(id){
  //   console.log('deleteFave id to remove-->', id);
  //   return $http({
  //     method: 'DELETE',
  //     url: '/deleteFave/' + id,
  //   }).then(function(response){
  //     return response.status;
  //   });
  // };
// });  // end questionService
