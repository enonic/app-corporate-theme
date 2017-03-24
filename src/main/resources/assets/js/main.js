jQuery(function($) {

	//Ajax contact
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

	//Goto Top
	$('.gototop').click(function(event) {
		 event.preventDefault();
		 $('html, body').animate({
			 scrollTop: $("body").offset().top
		 }, 500);
	});	
	//End goto top
});