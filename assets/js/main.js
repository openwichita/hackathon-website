/*
	Tessellate by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

  $("#success_msg").hide();
  $("#danger_msg").hide();

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 1000px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Scrolly links.
			$('.scrolly').scrolly();

		// Prioritize "important" elements on narrow.
			skel.on('+narrow -narrow', function() {
				$.prioritize(
					'.important\\28 narrow\\29',
					skel.breakpoint('narrow').active
				);
			});  
      fadeoutlogo();
      fadeoutbtn();
      setTimeout(function(){ fadeinlogo() }, 500);
      setTimeout(function(){ fadeinbtn() }, 1000);
	});
  
  function fadeinlogo() {
    $("#logo").addClass("fade-in");
  }
  function fadeoutlogo(){
    $("#logo").addClass("fade-out");
  }
  
  function fadeinbtn() {
    $("#header_btn").addClass("fade-in");
  }
  function fadeoutbtn(){
    $("#header_btn").addClass("fade-out");
  }
  
  $("#message_btn").click(function(){
    
    if ($("#message_frm").valid()){
      $.post( "/contact", $( "#message_frm" ).serialize() )
      .done(function( data ) {
        if (data.sent){
          $("#success_msg").fadeIn( "fast", function(){
            setTimeout(function(){
              $("#success_msg").fadeOut("slow");
            }, 5000);
          });
        }else{
          $("#danger_msg").fadeIn( "fast", function(){
            setTimeout(function(){
              $("#danger_msg").fadeOut("slow");
            }, 5000);
          });
        }
      }).error(function(){
        $("#danger_msg").fadeIn( "fast", function(){
          setTimeout(function(){
            $("#danger_msg").fadeOut("slow");
          }, 5000);
        });
      });
    }
  });

})(jQuery);
