var navTrigger = document.getElementById("nav-trigger");
var headerMain = document.getElementById("header-main");

navTrigger.addEventListener('click', function(evt){
	console.log(headerMain.classList);
	headerMain.classList.toggle('clicked');
});
