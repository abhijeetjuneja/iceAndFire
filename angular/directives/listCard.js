//Declare the directive
app.directive('myCard', function() {
    return {
        restrict: 'E',
        scope:{
          data:"=",
        },
        controller:function($scope){

        },
        link: function(scope, elem, attrs) {

          if(scope.data.isbn!=null)
          {
            elem.parent().addClass("bookStyle");
            if(scope.data.name!="")
            elem.append("<b>"+scope.data.name+"</b>");
            else {
              elem.append("<b>--Unknown--</b>");
            }
            elem.append("<p>By "+scope.data.authors+"</p>");
          }
          if(scope.data.gender!=null)
          {
            elem.parent().addClass("characterStyle");
            elem.addClass("innerChar");
            if(scope.data.name!="")
            elem.append("<b>"+scope.data.name+"</b>");
            else {
              elem.append("<b>--Unknown--</b>");
            }
            if(scope.data.aliases[0]!="")
            elem.append('<p>"'+scope.data.aliases[0]+'"</p>');
          }
          if(scope.data.region!=null)
          {
            elem.parent().addClass("houseStyle");
            if(scope.data.name!="")
            elem.append("<b>"+scope.data.name+"</b>");
            else {
              elem.append("<b>--Unknown--</b>");
              if(scope.data.region!="")
              elem.append("<b>Region : "+scope.data.region+"</b>");
            }


          }

        }
    };
});
