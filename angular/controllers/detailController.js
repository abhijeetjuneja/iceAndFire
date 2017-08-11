//Declare the controller

app.controller('detailController',['$http','IceAndFireService','$scope',function($http,IceAndFireService,$scope){

    var main=this;
    this.bcount=0;
    this.ccount=0;
    this.hcount=0;
    this.loadList={};
    this.charList=[];
    this.charSet="";
    this.charIndex=0;
    this.bookIndex=0;
    this.bookSet="";
    this.bookList=[];
    this.houseIndex=0;
    this.houseSet="";
    this.houseList=[];
    this.housewatch=0;
    this.bookwatch=0;
    this.charwatch=0;
    this.charcode=0;
    this.housecode=0;
    this.signalchar=0;
    this.loading1=true;
    this.charbcount=0;
    $scope.loading=true;


    //Back button
    this.goBack =function() {
      window.history.back();
    };

    //Get list of list of characters appeared in a book
    this.getCharacters = function(chars,l){
      var baseUrl="https://anapioficeandfire.com/api/characters/";
      var addon=chars[main.charIndex].split("/");
      addon=addon[addon.length-1];
      baseUrl=baseUrl+addon;
      IceAndFireService.setUrl(baseUrl);
      IceAndFireService.getDetail()
        .then(function successCallback(response){
          if(response.data.name!=""&&response.data.name!=undefined)
          {
            main.charList.push(response.data.name);
          }
          else
            if(response.data.aliases[0]!=undefined)
            {
              main.charList.push(response.data.aliases[0]);
            }
            if(main.charIndex<chars.length-1)
            {
              main.charIndex++;
              main.getCharacters(chars,l);
            }
            else 
            {
              //Join all characters in a single string
              main.charIndex=0;
              main.charSet=main.charList.join();
              if(main.housewatch==1&&main.loadList.swornMembers.length!=0)
              {
                setTimeout(function(){
                $scope.$apply(function() {
                  $scope.loading=false;
                 setTimeout(function(){
                  $(".spinner").css('display','none');
                  $(".detailBook").show();
                  var h1;
                  var h2=$("#wrapper").height();
                  if(h2<window.innerHeight)
                  {
                    var h3=$("body").height();
                    h1=h3-h2;
                    $("#myFooter").css('margin-top',h1);
                  }
                  },1000);
                  });
                },1000);
              }
              if(main.bookwatch==1)
              {
                setTimeout(function(){
                $scope.$apply(function() {
                  main.loading1=false;
                  $scope.loading=false;
                 setTimeout(function(){
                  $(".spinner").css('display','none');
                  $(".detailBook").show();
                  var h1;
                  var h2=$("#wrapper").height();
                  if(h2<window.innerHeight)
                  {
                    var h3=$("body").height();
                    h1=h3-h2;
                    $("#myFooter").css('margin-top',h1);
                  }
                  },1000);
                  });
                },1000);
               
              }
              if(main.housewatch==1&&main.loadList.swornMembers.length!=0)
              {
                setTimeout(function(){
                $scope.$apply(function() {
                  $scope.loading=false;
                  setTimeout(function(){
                  $(".spinner").css('display','none');
                  $(".detailBook").show();
                    var h1;
                  var h2=$("#wrapper").height();
                  if(h2<window.innerHeight)
                  {
                    var h3=$("body").height();
                    h1=h3-h2;
                    $("#myFooter").css('margin-top',h1);
                  }
                  },1000);
                  });
                },1000);
              }
             
            }
          }, function errorCallback(response,type){
            console.log(baseUrl);
            console.log(response);
            console.log(type);
            if(main.charIndex<l)
            {
              main.charIndex++;
              main.getCharacters(chars,l);
            }
            else 
            {
              main.charIndex=0;
              if(main.housewatch==1&&main.loadList.swornMembers.length!=0)
              {
                setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
              if(main.bookwatch==1)
              {
               setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
              if(main.housewatch==1&&main.loadList.swornMembers.length!=0)
              {
                setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                  });
                },1000);
              }
             
            }
          }
          );
        };

    //Get list of list of books appeared the character has appeared in
    this.getBooks = function(chars,l){
      var baseUrl="https://anapioficeandfire.com/api/books/";
      var addon=chars[main.bookIndex].split("/");
      addon=addon[addon.length-1];
      baseUrl=baseUrl+addon;
      IceAndFireService.setUrl(baseUrl);
      IceAndFireService.getDetail()
        .then(function successCallback(response){
          if(response.data.name!=""&&response.data.name!=undefined)
          {
            main.bookList.push(response.data.name);
          }
          if(main.bookIndex<chars.length-1)
          {
            main.bookIndex++;
            main.getBooks(chars,l);
          }
          else 
          {
            main.charbcount++;
            main.bookSet=main.bookList.join();
            main.bookIndex=0;
              if(main.charwatch==1&&main.charcode==0&&main.charbcount==2&&(main.loadList.books.length!=0||main.loadList.povBooks.length!=0))
              {
                setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
            
          }
          }, function errorCallback(response,type){
            console.log(baseUrl);
            console.log(response);
            console.log(type);
            if(main.bookIndex<l-1)
            {
              main.bookIndex++;
              main.getBooks(chars,l);
            }
            else 
            {
              main.bookIndex=0;
              if(main.charwatch==1&&(main.loadList.books.length!=0||main.loadList.povBooks.length!=0))
              {
                setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
            
            }
          }
          );
        };

    //Get list of list of books appeared the character has appeared in
    this.getHouses = function(chars,l){
      var baseUrl="https://anapioficeandfire.com/api/houses/";
      var addon=chars[main.houseIndex].split("/");
      addon=addon[addon.length-1];
      baseUrl=baseUrl+addon;
      IceAndFireService.setUrl(baseUrl);
      IceAndFireService.getDetail()
        .then(function successCallback(response){
          if(response.data.name!=""&&response.data.name!=undefined)
          {
            main.houseList.push(response.data.name);
          }

          if(main.houseIndex<chars.length-1)
          {
            main.houseIndex++;
            main.getHouses(chars,l);
          }
          else 
          {
            main.houseSet=main.houseList.join();
            main.houseIndex=0;
            if(main.housewatch==1&&main.loadList.cadetBranches.length!=0&&main.housecode==0)
            {
               setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
            }
            if(main.charwatch==1&&main.loadList.allegiances.length!=0&&main.charcode==1)
            {
              setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
            }
          }
          }, function errorCallback(response,type){
            console.log(baseUrl);
            console.log(response);
            console.log(type);
            if(main.houseIndex<l-1)
            {
              main.houseIndex++;
              main.getHouses(chars,l);
            }
            else 
            {
              main.houseIndex=0;
              if(main.housewatch==1&&main.loadList.cadetBranches.length!=0)
              {
                 setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
              if(main.charwatch==1&&main.loadList.allegiances.length!=0)
              {
                setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
            }
          }
          );
        };


    //Load detail from service
    this.loadDetail = function(){

      IceAndFireService.getDetail()
        .then(function successCallback(response){
          main.loadList=response.data;
          main.loading=true;
          if(main.loadList.hasOwnProperty('povCharacters'))
          {
            main.getCharacters(main.loadList.povCharacters,main.loadList.povCharacters.length);
            main.bookwatch=1;
          }
          else
            if(main.loadList.hasOwnProperty('books'))
            {
              main.charwatch=1;
              if(main.loadList.books.length!=0)
              {
                main.getBooks(main.loadList.books,main.loadList.books.length);
              }
              else
                main.charbcount++;
              if(main.loadList.povBooks.length!=0)
                main.getBooks(main.loadList.povBooks,main.loadList.povBooks.length);
              else
                main.charbcount++;
              if(main.loadList.allegiances.length!=0)
              {
                main.getHouses(main.loadList.allegiances,main.loadList.allegiances.length);
                if(((main.loadList.books.length+main.loadList.povBooks.length)-main.loadList.allegiances.length)<2)
                main.charcode=1;
              }
              if(main.loadList.books.length==0&&main.loadList.povBooks.length==0&&main.loadList.allegiances.length==0)
              {
                setTimeout(function(){
                  $scope.$apply(function() {
                    $scope.loading=false;
                    setTimeout(function(){
                    $(".spinner").css('display','none');
                    $(".detailBook").show();
                    var h1;
                    var h2=$("#wrapper").height();
                    if(h2<window.innerHeight)
                    {
                      var h3=$("body").height();
                      h1=h3-h2;
                      $("#myFooter").css('margin-top',h1);
                    }
                    },1000);
                    });
                },1000);
              }
            } 
          if(main.loadList.hasOwnProperty('region'))
          {
            main.housewatch=1;
            
            if(main.loadList.cadetBranches.length!=0)
              main.getHouses(main.loadList.cadetBranches,main.loadList.cadetBranches.length);
            if(main.loadList.swornMembers.length!=0)
            {
              main.housecode=1;
              main.getCharacters(main.loadList.swornMembers,main.loadList.swornMembers.length);
            }
            if(main.loadList.swornMembers.length==0&&main.loadList.cadetBranches.length==0)
            {
               setTimeout(function(){
                $scope.$apply(function() {
                  $scope.loading=false;
                  setTimeout(function(){
                  $(".spinner").css('display','none');
                  $(".detailBook").show();
                  var h1;
                  var h2=$("#wrapper").height();
                  if(h2<window.innerHeight)
                  {
                    var h3=$("body").height();
                    h1=h3-h2;
                    $("#myFooter").css('margin-top',h1);
                  }
                  },1000);
                  });
                },1000);
            }
          }
        }, function errorCallback(response,type){

          console.log(response);
          console.log(type);
        }
      );

    };

    //Get details
    this.loadDetail();

    //Adjust on orientation change
    $(window).on("orientationchange",function(){
     var h1;
     var h2=$("#wrapper").height();
     if(h2<window.innerHeight)
     {
      var h3=$("body").height();
      h1=h3-h2;
      $("#myFooter").css('margin-top',h1);
     }
    });



}]);
