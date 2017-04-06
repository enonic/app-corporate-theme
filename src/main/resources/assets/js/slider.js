$(function(){

    var Page = (function() {

        var $navArrows = $( '#nav-arrows' ),
            slitslider = $( '#slider' ).slitslider( {
                autoplay : true
            } ),

            init = function() {
                initEvents();
            },
            initEvents = function() {
                $navArrows.children( ':last' ).on( 'click', function() {
                    slitslider.next();
                    return false;
                });

                $navArrows.children( ':first' ).on( 'click', function() {
                    slitslider.previous();
                    return false;
                });
            };

        return { init : init };

    })();

    Page.init();

});
