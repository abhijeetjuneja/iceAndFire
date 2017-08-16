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
	$(window).on("orientationchange",function(){
		var h1=document.getElementById('nav1').offsetHeight;
		document.getElementById('jumbo').style.paddingTop=0;
		document.getElementById('jumbo').style.paddingBottom=0;
		var h2=document.getElementById('jumbo').offsetHeight;
		var h3=document.getElementById('myFooter').offsetHeight;
		var h4=window.innerHeight-(h1+h2+h3);
		h4=h4/2;
		var s="";
		s=h4+"px";
		console.log(h1,h2,h3,h4,window.innerHeight);
		document.getElementById('jumbo').style.paddingTop=s;
		document.getElementById('jumbo').style.paddingBottom=s;
	});

});