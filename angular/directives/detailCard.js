//Declare the directive
app.directive('detailCard', function($timeout) {
    return {
        restrict: 'E',
        scope:{
          data:"="
        },
        link: function(scope, elem, attrs) {
          var setHtml=function(){
            console.log(scope.data.loadList);
          if(scope.data.loadList.isbn!=null)
          {
            elem.parent().addClass("detailBook");
            elem.append("<center><img class='img-responsive' src='images/cover.png'>");
            elem.append("<br>");
            if(scope.data.loadList.name!="")
            elem.append("<h1><b>"+scope.data.loadList.name+"</b></h2>");
            else {
              elem.append("<h1>Unknown</h1>");
            }
            elem.append("<p>-By "+scope.data.loadList.authors+"</p>");
            elem.append("<h3><b>Number of Pages - "+scope.data.loadList.numberOfPages+"</b></h3>");
            elem.append("<h3><b>Publisher - "+scope.data.loadList.publisher+"</b></h3>");
            elem.append("<h3><b>Country - "+scope.data.loadList.country+"</b></h3>");
            elem.append("<h3><b>Type - "+scope.data.loadList.mediaType+"</b></h3>");
             var d= new Date(scope.data.loadList.released);
            elem.append("<h3><b>Released - "+d.toUTCString()+"</b></h3>");
            var loadBooks=function(){
              if(scope.data.loadList.povCharacters[0]!="")
              elem.append("<h3><b>Featured Characters - "+scope.data.charSet+"</b></h3>");
          };
            setTimeout(loadBooks,3000);
            
          }
          if(scope.data.loadList.gender!=null)
          {
            elem.parent().addClass("detailBook");
            elem.append("<center><img class='img-responsive' src='images/char.png'>");
            elem.append("<br>");
            if(scope.data.loadList.name!="")
            elem.append("<h1><b>"+scope.data.loadList.name+"</b></h2>");
            else {
              elem.append("<h1><b>Unknown</b></h2>");
            }
            if(scope.data.loadList.aliases[0]!="")
            elem.append('<h3><b>"'+scope.data.loadList.aliases[0]+'"</b></h3>');
            if(scope.data.loadList.gender!="")
            elem.append('<h3><b>Gender - '+scope.data.loadList.gender+'</b></h3>');
            if(scope.data.loadList.culture!="")
            elem.append('<h3><b>Culture  - '+scope.data.loadList.culture+'</b></h3>');
            if(scope.data.loadList.born!=""&&scope.data.loadList.born!=null)
            elem.append('<h3><b>Born  - '+scope.data.loadList.born+'</b></h3>');
            if(scope.data.loadList.died!="")
            elem.append('<h3><b>Died  - '+scope.data.loadList.died+'</b></h3>');
            if(scope.data.loadList.tvSeries[0]!="")
            {
                elem.append('<h3><b>TV Series - '+scope.data.loadList.tvSeries.join()+'</b></h4>');
            }
            if(scope.data.loadList.titles[0]!="")
            {
                elem.append('<h3><b>Titles - '+scope.data.loadList.titles.join()+'</b></h3>');
            }

            var loadBooks=function(){
              if(scope.data.loadList.allegiances.length!=0)
              elem.append('<h3><b>Allegiances  - '+scope.data.houseSet+'</b></h3>');
            elem.append("<h3><b>Featured in Books - "+scope.data.bookSet+"</b></h3>");
          }
            setTimeout(loadBooks,1000);
          }
          
          if(scope.data.loadList.region!=null)
          {
            elem.parent().addClass("detailBook");
            elem.append("<center><img class='img-responsive' src='images/house.png'>");
            elem.append("<br>");
            if(scope.data.loadList.name!="")
            elem.append("<h1><b>"+scope.data.loadList.name+"</b></h1>");
            if(scope.data.loadList.region!="")
            elem.append("<h3><b>Region : "+scope.data.loadList.region+"</b></h3>");
            if(scope.data.loadList.coatOfArms!="")
            elem.append("<h3><b>Coat of Arms : "+scope.data.loadList.coatOfArms+"</b></h3>");
            if(scope.data.loadList.words!="")
            elem.append("<h3><b>Words : "+scope.data.loadList.words+"</b></h3>");
            if(scope.data.loadList.titles[0]!=0)
            {
                elem.append('<h3><b>Titles - '+scope.data.loadList.titles.join()+'</b></h3>');
            }
            if(scope.data.loadList.seats[0]!=0)
            {
                elem.append('<h3><b>Seats - '+scope.data.loadList.seats.join()+'</b></h3>');
            }
            if(scope.data.loadList.ancestralWeapons[0]!=0)
            {
                elem.append('<h3><b>Ancestral Weapons - '+scope.data.loadList.ancestralWeapons.join()+'</b></h3>');
            }
            var loadBooks=function(){
              if(scope.data.loadList.cadetBranches.length!=0)
              elem.append('<h3><b>Cadet Branches - '+scope.data.houseSet+'</b></h3>');
              if(scope.data.loadList.swornMembers.length!=0)
              elem.append('<h3><b>Sworn Members - '+scope.data.charSet+'</b></h3>');
          }
            setTimeout(loadBooks,2000);
            

          }
        }
        setTimeout(setHtml,1000);
        }
    };
});
