//Declare the controller

app.controller('listController',['$http','IceAndFireService','$location','$scope',function($http,IceAndFireService,$location,$scope){

    var main=this;

    this.loadList=[];
    this.id1=0;
    this.id2=0;
    this.id3=0;
    this.filter_item={};
    this.second_click="None";
    this.first_click="";
    this.currentPage = 0;
    this.pageSize = 10;
    this.data = [];
    this.loading=true;
    this.value="";
    this.valarr=[];
    this.count=0;
    this.seasarr=[];
    this.seasval="";
    this.lann=0;
    this.tv=0;
    this.housearray=[];
    this.regionarray=[];
    $scope.inputVal="";

    //Calculate number of page for page filter
    this.numberOfPages=function(l){
        return Math.ceil(l/main.pageSize);
    };

    //Option selector for first filter
    this.selected_first = function(id){
      main.id1=id;
      main.id2=0;
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
      main.filter_items();
    };

    this.containsComparator = function(expected, actual){  
      return actual.indexOf(expected) > -1;
    };

    //Option selector for third filter
    this.selected_third = function(type,id,value){
      main.currentPage = 0;
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

    //Custom Filter function
    this.filter_item=function(item,index){
      if(main.id1==0)
        return true;
      if(main.id1==1&&main.id2==0)
      {
        return true;
      }
      if(main.id1==2)
      {
            //Get value from textarea and return the matched items.Ignore case.
            if ($scope.inputVal=="") {
                return true;
            }
            else
              if(item.name.toLowerCase().indexOf($scope.inputVal.toLowerCase())!==-1)
              {
                return true;
              }
              else
                return false;
      }
      if(main.id1==1&&main.id2==1)
      {
        //Find if its a book
        if(item.hasOwnProperty('isbn'))
          return true;
        else
          return false;
      }
      if(main.id1==1&&main.id2==2)
      {
        //Find if its a character
        if(item.hasOwnProperty('gender')&&main.houses(item,index))
          return true;
        else
          return false;
      }
      if(main.id1==1&&main.id2==3)
      {
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
      }
      if(main.id1==1&&main.id2==0)
      {
        main.currentPage = 0;
        main.second_click="None";
   
      }
      if(main.id1==1&&main.id2==1)
      {
        main.currentPage = 0;
        main.second_click="Books";
      }
      if(main.id1==1&&main.id2==2)
      {
        main.currentPage = 0;
        main.second_click="Characters";
      }
      if(main.id2==3)
      {
        main.currentPage = 0;
        main.second_click="Houses";
      }
    };

    //Sort function
    this.sortList = function(){
      function compare(a,b) {
          if (a.name < b.name)
             return -1;
          if (a.name > b.name)
            return 1;
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
      IceAndFireService.getBooks()
        .then(function successCallback(response){

          main.loading=true;
          main.loadList=response.data;
          main.loadChar(1);

        }, function errorCallback(response,type){

          console.log(response);
          console.log(type);

        }
      );

    };

    //Load characters from service
    this.loadChar = function(i){
        IceAndFireService.getChar(i,'&pageSize=50')
          .then(function successCallback(response){
            main.loadList = main.loadList.concat(response.data);
            i++;
            if(i<44)
            main.loadChar(i);
            else 
            {
              main.loadHouse(1);
            }

          }, function errorCallback(response){

            console.log(response);

          }
        );


    };



    //Load Houses from service
    this.loadHouse = function(i){
        IceAndFireService.getHouse(i,'&pageSize=50')
          .then(function successCallback(response){
            main.loadList = main.loadList.concat(response.data);
            i++;
            if(i<10)
            main.loadHouse(i);
            else 
            {
              main.sortList();
              main.loading=false;
            }

          }, function errorCallback(response){
            console.log(response);
          }
        );


    };

    //Get list of books,houses and characters
    this.loadBooks();

    //Send detail from controller to service and change url
    this.sendDetail=function(url){
      IceAndFireService.setUrl(url);
      $location.path("/detail");
    };



}]);
