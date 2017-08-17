app.controller('mainController',function(){
	//Adjust jumbotron padding
	$( document ).ready(function() {
		$('body').css('overflow-y','hidden');
		var h1=document.getElementById('nav1').offsetHeight;
		document.getElementById('jumbo').style.paddingTop=0;
		document.getElementById('jumbo').style.paddingBottom=0;
		var h2=document.getElementById('jumbo').offsetHeight;
		var h3=document.getElementById('myFooter').offsetHeight;
		var h4=window.innerHeight-(h1+h2+h3);
		h4=h4/2;
		s=h4+"px";
		document.getElementById('jumbo').style.paddingTop=s;
		document.getElementById('jumbo').style.paddingBottom=s;
	});

	//Adjust jumbotron padding on orientation change

	$(window).bind('orientationchange',function(e) {
	  fixOrientation();
	});

	$(window).bind('resize',function(e) {
	  fixOrientation();
	});

	function fixOrientation() {

	    setTimeout(function() {

	        var windowWidth = window.innerWidth;

	        var h1=document.getElementById('nav1').offsetHeight;
			document.getElementById('jumbo').style.paddingTop=0;
			document.getElementById('jumbo').style.paddingBottom=0;
			var h2=document.getElementById('jumbo').offsetHeight;
			var h3=document.getElementById('myFooter').offsetHeight;
			var h4=window.innerHeight-(h1+h2+h3);
			h4=h4/2;
			s=h4+"px";
			document.getElementById('jumbo').style.paddingTop=s;
			document.getElementById('jumbo').style.paddingBottom=s;

	    },100);
	}

 

});