  //Declare the module with fastclick
  var app=angular.module('iceAndFire',['ngRoute','ngAnimate'])
  .run(function() {
    FastClick.attach(document.body);
  });
