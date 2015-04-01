$(document).on('ready', function () {
    /* ==========================================================================
       Social counts
       ========================================================================== */

    var shareUrl = window.location.href;
    // If the share buttons widget is visible, lets load some values
    if($('#share-buttons').length > 0) {
        $.ajax('https://socialbuttonsserver.herokuapp.com/?url=' + shareUrl, {
            success: function(res, err) {
                $.each(res, function(network, value) {
                    var count = value;
                    if (count / 10000 > 1) {
                        count = Math.ceil(count / 1000) + 'k'
                    }
                    $('[data-network="' + network + '"]').attr('count', count).hide().show();
                })
            },
            dataType: 'json',
            cache         : true
        });

        $( ".facebook-button" ).click(function() {
          var url = $(this).attr("href");
          window.open(url, "Share on Facebook", "width=650,height=500");
          return false;
        })
        $( ".twitter-button" ).click(function() {
            var url = $(this).attr("href");
            window.open(url,"Twitter","width=550,height=420");
            return false;
        })
        $( ".google-button" ).click(function() {
            var url = $(this).attr("href");
            window.open(url,"Share on Google Plus","width=500,height=436");
            return false;
        })
    }

});

$('#video-container').click(function(){
  $('#video-container').html('<iframe width="853" height="480" src="//www.youtube-nocookie.com/embed/pF7d8Dmxy8A?rel=0&vq=hd1080&autoplay=1" frameborder="0" allowfullscreen></iframe>');
});

$(window).on('scroll', function() {
    if ($(this).scrollTop() > 150 && !$('.navbar').hasClass('visible')) {
        $('.navbar').animate({opacity : 1}, 'slow', function() {
            $(this).addClass('visible').removeAttr('style');
        });
    } else if ($(this).scrollTop() <= 150 && $('.navbar').hasClass('visible')) {
        $('.navbar').animate({opacity : 0}, 'slow', function() {
            $(this).removeClass('visible').removeAttr('style');
        });
    }
});