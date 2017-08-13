app.controller('mainController',function(){
	//Adjust jumbotron padding
	$( document ).ready(function() {
		var h1=document.getElementById('nav1').scrollHeight;
		var h2=document.getElementById('jumbo').scrollHeight;
		var h3=document.getElementById('myFooter').scrollHeight;
		var h4=window.innerHeight-(h1+h2+h3);
		h4=h4/2;
		console.log(h1,h2,h3,h4,window.innerHeight);
		s=h4+"px";
		document.getElementById('jumbo').style.paddingTop=s;
		document.getElementById('jumbo').style.paddingBottom=s;

	});

	//Adjust jumbotron padding on orientation change
	$(window).on("orientationchange",function(){
		var h1=document.getElementById('nav1').scrollHeight;
		var h2=document.getElementById('jumbo').scrollHeight;
		var h3=document.getElementById('myFooter').scrollHeight;
		var h4=window.innerHeight-(h1+h2+h3);
		h4=h4/2;
		var s="";
		s=h4+"px";
		document.getElementById('jumbo').style.paddingTop=s;
		document.getElementById('jumbo').style.paddingBottom=s;
	});

});