//Declare the service

app.factory('IceAndFireService',function allData($http){

  var iceAndFireApi={};

  var baseUrl="https://www.anapioficeandfire.com/api/";

  //Get all books
  iceAndFireApi.getBooks = function(){
        return $http({

          method : 'GET',
          url : baseUrl + 'books'
        });

        };

  //Get all Characters
  iceAndFireApi.getChar = function(index,s){
        return $http({

          method : 'GET',
          url : baseUrl + 'characters'+'?page='+index+s
        });

        };

  //Get all Houses
  iceAndFireApi.getHouse = function(index,s){
        return $http({

          method : 'GET',
          url : baseUrl + 'houses'+'?page='+index+s
        });

        };

  //Set active url
  iceAndFireApi.setUrl = function(url){
    iceAndFireApi.activeUrl=url;

  };

  //Get details of clicked item
  iceAndFireApi.getDetail = function(){
        return $http({

          method : 'GET',
          url : iceAndFireApi.activeUrl
        });

  };


  return iceAndFireApi;



});
