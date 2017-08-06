app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});

app.filter('houses', function () {
 
    return function (input)
    {
        return input.name == 'Cersei Lannister';
    };
});
