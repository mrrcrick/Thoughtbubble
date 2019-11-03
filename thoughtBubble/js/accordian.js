// clean up panels
  function cleanupPanels(exclude)
  {

      $('.panel').each(
          function(pan)
          {
              console.log("*");
              var targetPanel = $(this).find('.panel-title').attr("data-target");
              if (exclude!= targetPanel  ) {
                  $(this).find('.collapse').collapse('hide');
                  $(this).find('.headersel').removeClass('headersel');
                  $(this).find('.icondown').show();
                  $(this).find('.iconup').hide();

              }
          }
      );

  }
// handle panel clicked
    function panelClick(e){
        // get id of panel
        var clickedPanelId = e.target.getAttribute('data-target');
        if (clickedPanelId && clickedPanelId!=null) {
            var targetPanelHeader = $('.panel .panel-title[data-target][data-target="'+clickedPanelId +'"]');
            var head = $(targetPanelHeader).parent();
            var icon = $(head).find('.glyphicon');

            // clean up
            cleanupPanels(clickedPanelId);
            $(icon).toggle();
            $(head).toggleClass("headersel");
            if ($(head).hasClass("headersel")) {
                $('.textcontent').hide();
                $('.loadercontainer').hide();
                // get data
                $(clickedPanelId+' .loadercontainer').show();
                    fetch('https://jsonplaceholder.typicode.com/todos/1')
                      .then((response) => {
                          return response.json()})
                      .then(function(json) {

                        $(clickedPanelId +' .textcontent').html(json["title"]);
                        $(clickedPanelId +' .textcontent').hide();
                         return json['title'];
                        }).then(
                        function(text){
                            $('.loadercontainer').fadeIn('slow')
                            .fadeOut('slow',
                            ()=>$(clickedPanelId +' .textcontent')
                            .fadeIn('slow')
                        )
                        }
                    );
                }


            }


        }


    $(document).ready(
        function() {
            $('.panel-heading').click(panelClick);

        }

    );
