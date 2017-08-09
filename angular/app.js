  //Declare the module with fastclick
  var app=angular.module('iceAndFire',['ngRoute'])
  .run(function() {
    FastClick.attach(document.body);
  });
