//Declare the controller

app.controller('listController',['$http','IceAndFireService','$location',function($http,IceAndFireService,$location){

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
      main.filter_item="";
      }
      if(main.id1==2)
      {
        main.filter_item="";
      main.first_click="Name";
      main.second_click="None";
    }
    };

    //Option selector for second filter
    this.selected_second = function(id){
      main.id2=id;
      console.log("Second filter is : "+main.id2);
      main.filter_items();
    };

    this.containsComparator = function(expected, actual){  
      return actual.indexOf(expected) > -1;
    };

    //Option selector for third filter
    this.selected_third = function(id,value){
      
      console.log("called");
      if(document.getElementById(id).checked)
      {
        if(value==0)
        {
          main.tv=1;
        }
        else
        {
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
        for(var i in value)
        {
          var index = main.housearray.indexOf(value[i]);
          if (index > -1) {
            main.housearray.splice(index, 1);
            }

        }
        console.log("popped"+main.housearray);
      }
      }
  };
    
    this.houses=function(p,index){
      console.log("called filter");
        
        if(p.hasOwnProperty('allegiances'))
        {
          if(main.housearray.length!=0)
          {
         
          if(p.allegiances.length!=0)
          {
            var str=p.allegiances[0].split("/");

            var k=str[str.length-1];
            if(main.tv==1)
            return k && main.housearray.indexOf(parseInt(k)) !== -1 || p.tvSeries[0] !="";
            else
              return k && main.housearray.indexOf(parseInt(k)) !== -1 ;
          }
          else
          {
            if(main.tv==1)
              return p.tvSeries[0] !="";
            else
            return false;
          }
          }
          else
          {
            if(main.tv==1)
              return p.tvSeries[0] !="";
            else
            return true;
          }
        }
        else
          return true;
      
      

    };

    //Tasker based on second filter
    this.filter_items = function(id){
      if(main.id1==2)
      {
        main.currentPage = 0;
        main.second_click="Enter Name";
        main.filter_item={};
        main.filter_item.name=document.getElementById('filter_entered').value;
        console.log(main.filter_item);
      }
      if(main.id1==1&&main.id2==0)
      {
          main.currentPage = 0;
        main.second_click="None";
        main.filter_item={};
        console.log(main.filter_item);
      }
      if(main.id1==1&&main.id2==1)
      {
          main.currentPage = 0;
        main.second_click="Books";
        main.filter_item={};
        main.filter_item.isbn="";
        console.log(main.filter_item);
      }
      if(main.id1==1&&main.id2==2)
      {
          main.currentPage = 0;
        main.second_click="Characters";
        main.filter_item={};
        main.filter_item.gender="";
        console.log(main.filter_item);
      }
      if(main.id2==3)
      {
        main.currentPage = 0;
        main.second_click="Houses";
        main.filter_item={};
      main.filter_item.region="";
      console.log(main.filter_item);
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
        console.log("called");
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
          console.log(type)

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
            else {
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
            else {
              main.sortList();
              console.log(main.loadList);
              main.loading=false;
            }

          }, function errorCallback(response){

            console.log(response);

          }
        );


    };

    this.loadBooks();


    this.sendDetail=function(url){
      IceAndFireService.setUrl(url);

      $location.path("/detail");
    };



}]);
