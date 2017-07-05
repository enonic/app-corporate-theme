// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
if (navigator.userAgent.match(/IEMobile\/10.0/)) {
	var msViewportStyle = document.createElement('style')
	msViewportStyle.appendChild(
		document.createTextNode(
			'@-ms-viewport{width:auto!important}'
		)
	)
	document.querySelector('head').appendChild(msViewportStyle)
}
jQuery(function($) {

	// Toogle-effect on menu button on phablets
	$('.navbar .btn-navbar').click( function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});


	// Ajax contact
	$('.contact-form').submit(function() {
		$('button').click(function(event) {
			event.preventDefault();
		});
		$this = $(this);

		//create a json with dynamic variable
		var formData = {};
		$('.contact-form .post-data').each(function(){
			formData[$(this).attr('name')]= $(this).val();
		});

		$.post($(this).attr('action'), formData, function(data) {
			$('.formFields').parent().append(data);
			$('.formFields').hide();
			$('.formFields').parent().before($('.response-field'));
		},'html');
		return false;
	});


	// Goto Top
	$('.gototop').click(function(event) {
		 event.preventDefault();
		 $('html, body').animate({
			 scrollTop: $("body").offset().top
		 }, 500);
	});

});
