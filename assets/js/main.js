$(document).ready(function() {
  var options = [
    {
      id: 1,
      value: 'architecture'
    },
    {
      id: 2,
      value: 'cinemagraph'
    },
    {
      id: 3,
      value: 'glitch'
    },
    {
      id: 4,
      value: 'loop'
    },
    {
      id: 5,
      value: 'timelapse'
    },
    {
      id: 6,
      value: 'mashup'
    },
    {
      id: 7,
      value: 'typography'
    },
    {
      id: 8,
      value: 'sculpture'
    }
  ];

  // render button tags
  $.each(options, function(i, value) {
    $('.art-desgin-tags').append(
      '<div class="col-lg-2 col-md-3 col-6 tag-box text-center"><button type="button" data-name="' +
        value.value +
        '" class="btn btn-primary btn-block tag">' +
        value.value +
        '</button>' +
        '</div>'
    );
  });

  // render button tag when adding tags
  $('#addArt').on('submit', function(e) {
    e.preventDefault();
    var artQuery = $('#artInput')
      .val()
      .trim();
    $('#addArtModal').modal('toggle');

    $('.art-desgin-tags').append(
      '<div class="col-lg-2 col-md-3 col-6 tag-box text-center"><button type="button" data-name="' +
        artQuery +
        '" class="btn btn-primary btn-block tag">' +
        artQuery +
        '</button>' +
        '</div>'
    );

    $('#artInput').val('');
  });

  // call api through ajax on button tag click
  $(document).on('click', '.tag', function(e) {
    $('.gallery').empty();

    var dataName = $(this).attr('data-name');

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      dataName +
      '+art&design&api_key=ZhrVs1bOcGeNlrsYqdBK1z3G9kt83xc7';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      $.each(response.data, function(i, value) {
        $('.gallery').append(
          '<div class="col-lg-3 col-md-4 col-6"><img class="img-fluid img-thumbnail gif" src="' +
            value.images.fixed_height_still.url +
            '" alt="' +
            value.title +
            '" data-still="' +
            value.images.fixed_height_still.url +
            '" data-state="still" data-animate="' +
            value.images.fixed_height.url +
            '" data-animate="' +
            value.images.fixed_height.url +
            '" "/>' +
            '</div>'
        );
      });
    });
  });

  // animating gifs n click
  $(document).on('click', '.gif', function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }
  });
});
