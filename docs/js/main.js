$(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.navbar-inverse').fadeIn(500);
        } else {
            $('.navbar-inverse').fadeOut(500);
        }
    });


    $('#video-container').click(function(){
      $('#video-container').html('<iframe width="853" height="480" src="//www.youtube-nocookie.com/embed/pF7d8Dmxy8A?rel=0&vq=hd1080&autoplay=1" frameborder="0" allowfullscreen></iframe>');
    });

    /* ================================
       Social counts
    ================================= */

    var shareUrl = window.location.href;
    // If the share buttons widget is visible, lets load some values
    if($('#share-buttons').length > 0) {
        $.ajax('https://socialbuttonsserver.herokuapp.com/?url=' + shareUrl, {
            success: function(res, err) {
                $.each(res, function(network, value) {
                    var count = value;
                    if (count / 10000 > 1) {
                        count = Math.ceil(count / 1000) + 'k';
                    }
                    $('[data-network="' + network + '"]').attr('count', count).hide().show();
                });
            },
            dataType: 'json',
            cache         : true
        });

        $( ".facebook-button" ).click(function() {
          var url = $(this).attr("href");
          window.open(url, "Share on Facebook", "width=650,height=500");
          return false;
        });
        $( ".twitter-button" ).click(function() {
            var url = $(this).attr("href");
            window.open(url,"Twitter","width=550,height=420");
            return false;
        });
        $( ".google-button" ).click(function() {
            var url = $(this).attr("href");
            window.open(url,"Share on Google Plus","width=500,height=436");
            return false;
        });
    }
});