//*
(function ($, Drupal) {



  Drupal.behaviors.scroll = {
    attach: function (context, settings) {

      $('.js-scroll').click(function(e){
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
      });
    }
  };

  Drupal.behaviors.change_org = {
    attach: function (context, settings) {
      $('.peticion').each(function(){
        var id = $(this).data('id');
        change_org(id);
      });

      function change_org(id){
        var tag = document.createElement("script");
        tag.src = 'https://api.change.org/v1/petitions/'+id+'?api_key=30ade2b28d38d990a8d1273dcc187f5ad2acd4ba6103389371c8353232345580&callback=Drupal.json_p';
        document.getElementsByTagName("head")[0].appendChild(tag);
      }


      //new Foundation.Equalizer($('.articulos'));
      //new Foundation.Equalizer($('.peticiones'));


    }
  };

  Drupal.json_p = function(data) {
    var petition = $('.peticion[data-id='+data.petition_id+']');
    petition.find('.circular-bar__signatures').text(data.signature_count);
    petition.find('.circular-bar__goal').text('de '+data.goal);
    var percentage = parseInt(data.signature_count/data.goal*100);
    if(percentage>100) percentage = 100;
    petition.find('.circular-bar').addClass('circular-bar--progress-'+percentage);
  }

})(jQuery, Drupal);



