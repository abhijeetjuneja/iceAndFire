//Declare the controller

app.controller('listController',['$http','IceAndFireService','$location','$scope','$q',function($http,IceAndFireService,$location,$scope,$q){

    var main=this;

    this.loadList=[];
    this.id1=0;
    this.id2=0;
    this.id3=0;
    this.filter_item={};
    this.second_click="None";
    this.first_click="";
    this.currentPage = 0;
    this.data = [];
    this.loading=true;
    this.value="";
    this.loading22=true;
    this.valarr=[];
    this.pageSize=12;
    this.count=0;
    this.seasarr=[];
    this.seasval="";
    this.lann=0;
    this.tv=0;
    this.housearray=[];
    this.regionarray=[];
    this.pagearray=[];
    this.received=0;
    this.added=0;
    $scope.inputVal="";


    //Calculate number of page for page filter
    this.numberOfPages=function(l){
        main.received=l;
        return Math.ceil(l/main.pageSize);
    };

    this.unCheckAndEmptyArray = function() {
        for(var i=1;i<21;i++)
        {
          var x="check"+i;
          var y="page"+i;
          if(i<5)
          {
            document.getElementById(y).checked = false;
          }
          document.getElementById(x).checked = false;
        }
        main.housearray=[];
        main.regionarray=[];
        main.pagearray=[];
    };

    //Option selector for first filter
    this.selected_first = function(id){
      main.id1=id;
      main.id2=0;
      main.unCheckAndEmptyArray();
      if(main.id1==1)
      {
        main.first_click="Type";
      }
      if(main.id1==2)
      {
        main.first_click="Name";
        main.second_click="None";
      }
    };

    //Option selector for second filter
    this.selected_second = function(id){
      main.id2=id;
      main.unCheckAndEmptyArray();
      main.filter_items();
    };

    this.containsComparator = function(expected, actual){  
      return actual.indexOf(expected) > -1;
    };

    //Option selector for third filter
    this.selected_third = function(type,id,value){
      main.currentPage = 0;
      if(type==2)
      {
         if(document.getElementById(id).checked)
        {
            //Push a region in the array
            for(var i in value)
            main.pagearray.push(value[i]);
          
        }
        else
        {
          //Remove a region from the array
          for(var i in value)
          {
            var index = main.pagearray.indexOf(value[i]);
            if (index > -1) {
              main.pagearray.splice(index, 1);
              }
          }
        }
      }
      if(type==0)
      {
        if(document.getElementById(id).checked)
        {
          if(value==0)
          {
            main.tv=1;
          }
          else
          {
            //Push a house in the array
            for(var i in value)
            main.housearray.push(value[i]);
          }
        }
        else
        {
          if(value==0)
          {
            main.tv=0;
          }
          else
          {
            //Remove a house from the array
            for(var i in value)
            {
              var index = main.housearray.indexOf(value[i]);
              if (index > -1) {
                main.housearray.splice(index, 1);
                }
            }
          }
        }
      }
      else
      {
        if(document.getElementById(id).checked)
        {
            //Push a region in the array
            for(var i in value)
            main.regionarray.push(value[i]);
          
        }
        else
        {
          //Remove a region from the array
          for(var i in value)
          {
            var index = main.regionarray.indexOf(value[i]);
            if (index > -1) {
              main.regionarray.splice(index, 1);
              }
          }
        }
      }
  };
    
    //Select allegiance houses for characters
    this.houses=function(p,index){
        if(p.hasOwnProperty('allegiances'))
        {
          var hlength=main.housearray.length;
          if(hlength!=0)
          {  
            var plength=p.allegiances.length;       
            if(plength!=0)
            {
              var str=p.allegiances[0].split("/");
              var k=str[str.length-1];
              //Comparison for tv or housearray and housearray alone
              if(main.tv==1)
                return k && main.housearray.indexOf(parseInt(k)) !== -1 || p.tvSeries[0] !="";
              else
                return k && main.housearray.indexOf(parseInt(k)) !== -1 ;
            }
            else
            {
              //Comparison only for tv if no house selected
              if(main.tv==1)
                return p.tvSeries[0] !="";
              else
                return false;
            }
          }
          else
          {
              //Comparison only for tv if there are no houses
            if(main.tv==1)
              return p.tvSeries[0] !="";
            else
              return true;
          }
        }
        else
          return true;  
    };


    //Get region for selected house
    this.region=function(p,index){
        if(p.hasOwnProperty('region'))
        {
          if(main.regionarray.length!=0)
          {
            if(p.region!="")
            {
              var k=p.region;
              return k && main.regionarray.indexOf(k) !== -1 ;
            }
            else
            {
              return false;
            }
          }
          else
          {
            return true;
          }
        }
        else
          return true;
    };
 //Get region for selected house
    this.pages=function(p,index){
      console.log("called");
        if(p.hasOwnProperty('isbn'))
        {
          if(main.pagearray.length!=0)
          {
            return main.pagearray.indexOf(p.numberOfPages) !== -1;
          }
          else
          {
            return true;
          }
        }
        else
          return true;
    };


    //Custom Filter function
    this.filter_item=function(item,index){
      if(main.id1==0)
        return true;
      if(main.id1==1&&main.id2==0)
      {
        $('#srow').hide();
        return true;
      }
      if(main.id1==2)
      {
        if(main.currentPage>=main.numberOfPages(main.received))
        {
          main.currentPage=0;
        }

        //Show no results
        if(main.numberOfPages(main.received)==0)
        {
          $('#srow').show();
        }
        else
          $('#srow').hide();

        //Get value from textarea and return the matched items.Ignore case.
        if ($scope.inputVal=="") {
            return true;
        }
        else
        {
          if(item.name.toLowerCase().indexOf($scope.inputVal.toLowerCase())!==-1)
          {
            return true;
          }
          else
            return false;
        }
      }
      if(main.id1==1&&main.id2==1)
      {
        $('#srow').hide();
        //Find if its a book
        if(item.hasOwnProperty('isbn')&&main.pages(item,index))
          return true;
        else
          return false;
      }
      if(main.id1==1&&main.id2==2)
      {
        $('#srow').hide();
        //Find if its a character
        if(item.hasOwnProperty('gender')&&main.houses(item,index))
          return true;
        else
          return false;
      }
      if(main.id1==1&&main.id2==3)
      {
        $('#srow').hide();
        //Find if its a house
        if(item.hasOwnProperty('region')&&main.region(item,index))
        {
          return true;
        }
        else
          return false;
      }
    };

    //Tasker based on second filter
    //Set current page as 0 after every click
    this.filter_items = function(id){
      if(main.id1==2)
      {
        main.currentPage = 0;
        main.second_click="Enter Name";
        main.sortList();
      }
      if(main.id1==1&&main.id2==0)
      {
        main.currentPage = 0;
        main.second_click="None";
        main.sortList();
      }
      if(main.id1==1&&main.id2==1)
      {
        main.currentPage = 0;
        main.second_click="Books";
        main.sortList();
      }
      if(main.id1==1&&main.id2==2)
      {
        main.currentPage = 0;
        main.second_click="Characters";
        main.sortList();
      }
      if(main.id2==3)
      {
        main.currentPage = 0;
        main.second_click="Houses";
        main.sortList();
      }
    };

    //Sort function
    this.sortList = function(){
      function compare(a,b) {
          if(a.name=="")
            a.name="zzz";
          if(b.name=="")
            b.name="zzz";
          if (a.name < b.name )
          {
             if(a.name=="zzz")
              a.name="Unkown";
              if(b.name=="zzz")
              b.name="Unkown";
             return -1;
          }
          if (a.name > b.name)
          {
            if(a.name=="zzz")
              a.name="Unkown";
              if(b.name=="zzz")
              b.name="Unkown";
            return 1;
          }
          return 0;
        }
        main.currentPage = 0;
        main.loadList.sort(compare);

    };

    //Sort Reverse
    this.sortReverse = function(){
      function compare(a,b) {
          if (a.name > b.name)
             return -1;
          if (a.name < b.name)
            return 1;
          return 0;
        }
        main.currentPage = 0;
        main.loadList.sort(compare);
    };

    //Load books from service
    this.loadBooks = function(){
      IceAndFireService.getBooks(1,'&pageSize=12')
        .then(function successCallback(response){

          main.loading=true;
          main.loadList=response.data;
          main.loadChar(1);

        }, function errorCallback(response,type){
          $location.path("/error");
          console.log(response);
          console.log(type);

        }
      );

    };

    //Load characters from service
    this.loadChar = function(i){
        var chararr=[];
        for(var j=i;j<44;j++)
        {
          chararr=IceAndFireService.getChar(j,'&pageSize=50')
            .then(function successCallback(response){
              main.loadList = main.loadList.concat(response.data);
            }, function errorCallback(response){
               $location.path("/error");
              console.log(response);

            }
          );
        }
        $q.all(chararr).then(function(){
          main.loadHouse(1);
        });



    };



    //Load Houses from service
    this.loadHouse = function(i){
        var chararr=[];
        for(var j=i;j<10;j++)
        {
          chararr[j]=IceAndFireService.getHouse(j,'&pageSize=50')
            .then(function successCallback(response){
              main.loadList = main.loadList.concat(response.data);
            }, function errorCallback(response){
               $location.path("/error");
              console.log(response);
            }
          );
        }
        $q.all(chararr).then(function(){
          $('.spinner').hide();
          $('.pages').show();
          $('.secondRow').show();
          main.sortList();
      });



    };

    //Get list of books,houses and characters
    this.loadBooks();

    //Send detail from controller to service and change url
    this.sendDetail=function(url){
      IceAndFireService.setUrl(url);
      $location.path("/detail");
    };


      $( document ).ready(function() {
    $('body').css('overflow-y','scroll');
  });



}]);
