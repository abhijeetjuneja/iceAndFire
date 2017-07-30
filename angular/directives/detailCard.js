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
            if(scope.data.loadList.name!="")
            elem.append("<h2><b>"+scope.data.loadList.name+"</b></h2>");
            else {
              elem.append("<b>Unknown</b>");
            }
            elem.append("<p>-By "+scope.data.loadList.authors+"</p>");
            elem.append("<h4><b>Number of Pages - "+scope.data.loadList.numberOfPages+"</b></h4>");
            elem.append("<h4><b>Publisher - "+scope.data.loadList.publisher+"</b></h4>");
            elem.append("<h4><b>Country - "+scope.data.loadList.country+"</b></h4>");
            elem.append("<h4><b>Type - "+scope.data.loadList.mediaType+"</b></h4>");
            elem.append("<h4><b>Released - "+scope.data.loadList.released+"</b></h4>");
            elem.append("<h4><b>Featured Characters - "+scope.data.charSet+"</b></h4>");
          }
          if(scope.data.loadList.gender!=null)
          {
            elem.parent().addClass("detailBook");
            elem.append("<center><img class='img-responsive' src='images/char.png'>");
            if(scope.data.loadList.name!="")
            elem.append("<h2><b>"+scope.data.loadList.name+"</b></h2>");
            else {
              elem.append("<h2><b>Unknown</b></h2>");
            }
            if(scope.data.loadList.aliases[0]!="")
            elem.append('<h4><b>"'+scope.data.loadList.aliases[0]+'"</b></h4>');
            if(scope.data.loadList.gender!="")
            elem.append('<h4><b>Gender - '+scope.data.loadList.gender+'</b></h4>');
            if(scope.data.loadList.culture!="")
            elem.append('<h4><b>Culture  - '+scope.data.loadList.culture+'</b></h4>');
            if(scope.data.loadList.born!=""&&scope.data.loadList.born!=null)
            elem.append('<h4><b>Born  - '+scope.data.loadList.born+'</b></h4>');
            if(scope.data.loadList.died!="")
            elem.append('<h4><b>Died  - '+scope.data.loadList.died+'</b></h4>');
            if(scope.data.loadList.tvSeries[0]!="")
            {
                elem.append('<h4><b>TV Series - '+scope.data.loadList.tvSeries.join()+'</b></h4>');
            }
            if(scope.data.loadList.titles[0]!="")
            {
                elem.append('<h4><b>Titles - '+scope.data.loadList.titles.join()+'</b></h4>');
            }

            var loadBooks=function(){
              if(scope.data.loadList.allegiances.length!=0)
              elem.append('<h4><b>Allegiances  - '+scope.data.houseSet+'</b></h4>');
            elem.append("<h4><b>Featured in Books - "+scope.data.bookSet+"</b></h4>");
          }
            setTimeout(loadBooks,3000);
          }
          if(scope.data.loadList.region!=null)
          {
            elem.parent().addClass("detailBook");
            elem.append("<center><img class='img-responsive' src='images/house.png'>");
            if(scope.data.loadList.name!="")
            elem.append("<h2><b>"+scope.data.loadList.name+"</b></h2>");
            if(scope.data.loadList.region!="")
            elem.append("<h4><b>Region : "+scope.data.loadList.region+"</b></h4>");
            if(scope.data.loadList.coatOfArms!="")
            elem.append("<h4><b>Coat of Arms : "+scope.data.loadList.coatOfArms+"</b></h4>");
            if(scope.data.loadList.words!="")
            elem.append("<h4><b>Words : "+scope.data.loadList.words+"</b></h4>");
            if(scope.data.loadList.titles[0]!=0)
            {
                elem.append('<h4><b>Titles - '+scope.data.loadList.titles.join()+'</b></h4>');
            }
            if(scope.data.loadList.seats[0]!=0)
            {
                elem.append('<h4><b>Seats - '+scope.data.loadList.seats.join()+'</b></h4>');
            }
            if(scope.data.loadList.ancestralWeapons[0]!=0)
            {
                elem.append('<h4><b>Ancestral Weapons - '+scope.data.loadList.ancestralWeapons.join()+'</b></h4>');
            }
            var loadBooks=function(){
              if(scope.data.loadList.cadetBranches.length!=0)
              elem.append('<h4><b>Cadet Branches - '+scope.data.houseSet+'</b></h4>');
              if(scope.data.loadList.swornMembers.length!=0)
              elem.append('<h4><b>Sworn Members - '+scope.data.charSet+'</b></h4>');
          }
            setTimeout(loadBooks,3000);


          }
        }
        setTimeout(setHtml,3000);
        }
    };
});
