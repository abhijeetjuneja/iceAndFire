//Declare the controller

app.controller('detailController',['$http','IceAndFireService',function($http,IceAndFireService){

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
    this.loading=true;


   

    this.goBack =function() {
    window.history.back();
    };

    //Get list of list of characters appeared in a book
    this.getCharacters = function(chars,l){
      var baseUrl="https://anapioficeandfire.com/api/characters/";
      var addon=chars[main.charIndex].split("/");
      console.log(addon);
      addon=addon[addon.length-1];
      console.log(addon);
      baseUrl=baseUrl+addon;
      console.log(baseUrl);
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
          else {
            main.charSet=main.charList.join();
            console.log(main.charSet); 
            setTimeout(function(){
              main.loading=false;
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
            },3000);
           
          }
          }, function errorCallback(response,type){
            console.log(baseUrl);
            console.log(response);
            console.log(type)
            if(main.charIndex<l)
            {
              main.charIndex++;
              main.getCharacters(chars,l);
            }
            else {
              console.log(main.charSet);
                setTimeout(function(){
              main.loading=false;
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
            },3000);
           
            

            }
          }
          );
        }

    //Get list of list of books appeared the character has appeared in
    this.getBooks = function(chars,l){
      var baseUrl="https://anapioficeandfire.com/api/books/";

      var addon=chars[main.bookIndex].split("/");
      console.log(addon);
      addon=addon[addon.length-1];
      console.log(addon);
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
          else {

            main.bookSet=main.bookList.join();
          
            main.bookIndex=0;
             setTimeout(function(){
              main.loading=false;
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
            },3000);
           
          }
          }, function errorCallback(response,type){
            console.log(baseUrl);
            console.log(response);
            console.log(type)
            if(main.bookIndex<l-1)
            {
              main.bookIndex++;
              main.getBooks(chars,l);
            }
            else {
               setTimeout(function(){
              main.loading=false;
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
            },3000);
           
            }
          }
          );
        }

    //Get list of list of books appeared the character has appeared in
    this.getHouses = function(chars,l){
      var baseUrl="https://anapioficeandfire.com/api/houses/";
      console.log(chars);
      console.log(l);
      console.log(main.houseIndex);
      var addon=chars[main.houseIndex].split("/");
      console.log(addon);
      addon=addon[addon.length-1];
      console.log(addon);
      baseUrl=baseUrl+addon;
      console.log(baseUrl);
      IceAndFireService.setUrl(baseUrl);
      IceAndFireService.getDetail()
        .then(function successCallback(response){
          if(response.data.name!=""&&response.data.name!=undefined)
          {
          main.houseList.push(response.data.name);
          console.log(response.data.name);
          console.log(main.houseList);
          }

          if(main.houseIndex<chars.length-1)
          {
            main.houseIndex++;
            main.getHouses(chars,l);
          }
          else {
            console.log(main.houseList);
            main.houseSet=main.houseList.join();
            console.log(main.houseSet);
            main.houseIndex=0;
             setTimeout(function(){
              main.loading=false;
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
            },3000);
           
            
          }
          }, function errorCallback(response,type){
            console.log(baseUrl);
            console.log(response);
            console.log(type)
            if(main.houseIndex<l-1)
            {
              main.houseIndex++;
              main.getHouses(chars,l);
            }
            else {
              console.log(main.houseSet);
               setTimeout(function(){
              main.loading=false;
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
            },3000);
           
            }
          }
          );
        }


    //Load detail from service
    this.loadDetail = function(){

      IceAndFireService.getDetail()
        .then(function successCallback(response){


          main.loadList=response.data;
          main.loading=true;

          if(main.loadList.hasOwnProperty('povCharacters'))
          {
            

            main.getCharacters(main.loadList.povCharacters,main.loadList.povCharacters.length);
          }
          else
          if(main.loadList.hasOwnProperty('books'))
          {
            console.log("called");
            console.log(main.loadList);
            if(main.loadList.books.length!=0)
            {
            main.getBooks(main.loadList.books,main.loadList.books.length);
          }
            if(main.loadList.povBooks.length!=0)
            main.getBooks(main.loadList.povBooks,main.loadList.povBooks.length);
            if(main.loadList.allegiances.length!=0)
            {
              console.log(main.loadList.allegiances);
            main.getHouses(main.loadList.allegiances,main.loadList.allegiances.length);
          }
          }
          if(main.loadList.hasOwnProperty('region'))
          {
            if(main.loadList.swornMembers.length!=0)
            main.getCharacters(main.loadList.swornMembers,main.loadList.swornMembers.length);
            if(main.loadList.cadetBranches.length!=0)
            main.getHouses(main.loadList.cadetBranches,main.loadList.cadetBranches.length);
          }
          console.log(main.loadList);
          

        }, function errorCallback(response,type){

          console.log(response);
          console.log(type);

        }
      );

    }


    this.loadDetail();


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
