//Declare the controller

app.controller('detailController',['$http','IceAndFireService','$location','$scope','$q',function($http,IceAndFireService,$location,$scope,$q){

    var main=this;
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
    this.loading1=true;
    this.charbcount=0;
    $scope.loading=true;


    this.timeoutAndWatch=function(){
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
        },0);
        });
      },0);
    };

    //Back button
    this.goBack =function() {
      window.history.back();
    };

    //Get list of list of characters appeared in a book
    this.getCharacters = function(chars,l){
      var chararr=[];
      if(main.charIndex<l&&l!=0)
      {
        for(var charIndex=0;charIndex<chars.length;charIndex++)
        {
          var baseUrl="https://anapioficeandfire.com/api/characters/";
          var addon=chars[charIndex].split("/");
          addon=addon[addon.length-1];
          baseUrl=baseUrl+addon;
          IceAndFireService.setUrl(baseUrl);
          chararr[charIndex]=IceAndFireService.getDetail()
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
              }, function errorCallback(response,type){
                  console.log(baseUrl);
                  console.log(response);
                  console.log(type);
                  if(main.charIndex<l)
                  {
                  }
                  else 
                  {
                    main.charIndex=0;
                    //Set watch for swornmembers if it has elements
                    if(main.housewatch==1&&main.loadList.swornMembers.length!=0)
                    {
                      main.timeoutAndWatch();
                    }
                    //Set watch for books
                    if(main.bookwatch==1)
                    {
                      main.timeoutAndWatch();
                    }             
                }
              }
              );

          }
           $q.all(chararr).then(function(){
           //Join all characters in a single string
            main.charIndex=0;
            main.charSet=main.charList.join();
            //Set watch for swornmembers if it has elements
            if(main.housewatch==1&&main.loadList.swornMembers.length!=0)
            {
              main.timeoutAndWatch();
            }
            //Set watch for books
            if(main.bookwatch==1)
            {
              main.timeoutAndWatch();
            }  
          });
      }
    };

    //Get list of books appeared the character has appeared in
    this.getBooks = function(chars,l){
      var chararr=[];
      if(main.bookIndex<l&&l!=0)
      {
      for(var bookIndex=0;bookIndex<chars.length;bookIndex++)
      {
      var baseUrl="https://anapioficeandfire.com/api/books/";
      var addon=chars[bookIndex].split("/");
      addon=addon[addon.length-1];
      baseUrl=baseUrl+addon;
      IceAndFireService.setUrl(baseUrl);
      chararr[bookIndex]=IceAndFireService.getDetail()
        .then(function successCallback(response){
          if(response.data.name!=""&&response.data.name!=undefined)
          {
            main.bookList.push(response.data.name);
          }
          }, function errorCallback(response,type){
              console.log(baseUrl);
              console.log(response);
              console.log(type);
              if(main.bookIndex<l-1)
              {
              }
              else 
              {
                //Set watch for characters appeared in
                if(main.charwatch==1&&(main.loadList.books.length!=0||main.loadList.povBooks.length!=0))
                {
                  main.timeoutAndWatch();
                }
              
              }
          }
          );
        }
         $q.all(chararr).then(function(){
         main.charbcount++;
         main.bookSet=main.bookList.join();
         //Set watch for books character appeared in
          if(main.charwatch==1&&main.charcode==0&&main.charbcount==2&&(main.loadList.books.length!=0||main.loadList.povBooks.length!=0))
          {
            main.timeoutAndWatch();
          }  
          }); 
      }
        };

    //Get allegiances
    this.getHouses = function(chars,l){
      var chararr=[];
      if(main.houseIndex<l&&l!=0)
      {
        for(var houseIndex=0;houseIndex<chars.length;houseIndex++)
        {
          
          var baseUrl="https://anapioficeandfire.com/api/houses/";
          var addon=chars[houseIndex].split("/");
          addon=addon[addon.length-1];
          baseUrl=baseUrl+addon;
          IceAndFireService.setUrl(baseUrl);
          chararr[houseIndex]=IceAndFireService.getDetail()
            .then(function successCallback(response){
              if(response.data.name!=""&&response.data.name!=undefined)
              {
                main.houseList.push(response.data.name);
              }
              }, function errorCallback(response,type){
                  console.log(baseUrl);
                  console.log(response);
                  console.log(type);
                  if(main.houseIndex<l-1)
                  {
                  }
                  else 
                  {
                    main.houseIndex=0;
                     //Set watch for cadetBranches if it has elements more than sworn members
                    if(main.housewatch==1&&main.loadList.cadetBranches.length!=0&&main.housecode==0)
                    {
                      main.timeoutAndWatch();
                    }
                    //Set watch for allegiances of a character
                    if(main.charwatch==1&&main.loadList.allegiances.length!=0&&main.charcode==1)
                    {
                      main.timeoutAndWatch();
                    }
                  }
              }
              );
          }
          $q.all(chararr).then(function(){
            main.houseSet=main.houseList.join();  
            //Set watch for cadetBranches if it has elements more than sworn members
            if(main.housewatch==1&&main.loadList.cadetBranches.length!=0&&main.housecode==0)
            {
              main.timeoutAndWatch();
            }
            //Set watch for allegiances of a character
            if(main.charwatch==1&&main.loadList.allegiances.length!=0&&main.charcode==1)
            {
              main.timeoutAndWatch();
            }
          });

      }
        };


    //Load detail from service
    this.loadDetail = function(){

      IceAndFireService.getDetail()
        .then(function successCallback(response){
          main.loadList=response.data;
          main.loading=true;
          //Get all characters
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

              //Set watch for allegiances only if it has more elements than books and povBooks combined
              if(main.loadList.allegiances.length!=0)
              {
                main.getHouses(main.loadList.allegiances,main.loadList.allegiances.length);
                if(((main.loadList.books.length+main.loadList.povBooks.length)-main.loadList.allegiances.length)<2)
                main.charcode=1;
              }
              if(main.loadList.books.length==0&&main.loadList.povBooks.length==0&&main.loadList.allegiances.length==0)
              {
                main.timeoutAndWatch();
              }
            } 
          //Get Cadetbranches and sworn members
          if(main.loadList.hasOwnProperty('region'))
          {
            main.housewatch=1;            
            if(main.loadList.cadetBranches.length!=0)
              main.getHouses(main.loadList.cadetBranches,main.loadList.cadetBranches.length);
            //Call watch for swornmembers
            if(main.loadList.swornMembers.length!=0)
            {
              main.housecode=1;
              main.getCharacters(main.loadList.swornMembers,main.loadList.swornMembers.length);
            }
            //Set watch if both members and branches have zero elements
            if(main.loadList.swornMembers.length==0&&main.loadList.cadetBranches.length==0)
            {
              main.timeoutAndWatch();
            }
          }
        }, function errorCallback(response,type){
            console.log(response);
            console.log(type);
            $location.path("/error");
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


     $( document ).ready(function() {
    $('body').css('overflow-y','scroll');
  });



}]);
