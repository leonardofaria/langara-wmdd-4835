$(function() {

	$('.nav-social li:last-of-type a').on('click', function(){
		$('#searchform').slideToggle();
		$('#search').focus();
	});

	$('#search').on('blur', function(){
		$('#searchform').slideToggle();
	});

	$('#menu-grid').on('click', function() {
		$('.widget').slideToggle();
	});

	$('.content').on('click', '.post', function() {
		var current = $(this);
		$(this).remove();
		$(".content").prepend(current);
	});

});