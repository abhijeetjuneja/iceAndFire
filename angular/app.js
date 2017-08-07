  //Declare the module
  var app=angular.module('iceAndFire',['ngRoute'])
  .run(function() {
    FastClick.attach(document.body);
  });
