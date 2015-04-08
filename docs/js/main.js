$(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 200) {
            $('.navbar-inverse').fadeIn(500);
        } else {
            $('.navbar-inverse').fadeOut(500);
        }
    });


    $('#video-container').click(function(){
      $('#video-container').html('<iframe width="750" height="422" src="//www.youtube-nocookie.com/embed/pF7d8Dmxy8A?rel=0&vq=hd1080&autoplay=1" frameborder="0" allowfullscreen></iframe>');
      setAspectRatio();
    });

    // Auto-resize the video player to proper aspect ratio.
    function setAspectRatio() {
      $('#video-container iframe').each(function() {
        $(this).css('height', $(this).width() * 9/16);
      });
    }
    $(window).resize(setAspectRatio);

    /* ================================
       Social counts
    ================================= */

    var shareUrl = window.location.href;
    // If the share buttons widget is visible, lets load some values
    if($('#share-buttons').length > 0) {
        $.ajax('https://act.eff.org/tools/social_buttons_count?url=' + shareUrl, {
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

    $('.cta').click(function() {
        window.location.href='#call';
        return false;
    });
    $('#tf-phone-number').focus();
    $('#tf-phone-number').mask('(000) 000-0000');

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    };

    var tweets = [
      "Please stop spying on innocent people everywhere under the Patriot Act.",
      "Please end untargeted surveillance under the Patriot Act.",
      "It's time to end the NSA's untargeted mass surveillance under the Patriot Act."
    ];

    var targets = [
      '@NancyPelosi ',
      '@SenateMajLdr ',
      '@SenatorReid ',
      '@SpeakerBoehner ',
    ];

    shuffle(tweets);
    for (var i=0; i < tweets.length; i++) {
      shuffle(targets);
      tweets[i] = 'Dear ' + targets[0] + targets[1] + tweets[i];
      $('#tweets a:eq(' + i.toString() + ')').attr('href', 'https://twitter.com/share?text=' + encodeURIComponent(tweets[i]) + '&url=https%3A%2F%2Ffight215.org');
      $('#tweets p:eq(' + i.toString() + ')').text(tweets[i]);
    }

    $('#tweets a').click(function() {
      var url = $(this).attr('href');
      window.open(url, 'Twitter', 'width=550,height=420');
      return false;
    });


});
