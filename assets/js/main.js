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
      '<div class="col-lg-2 col-md-3 col-6 tag-box text-center"><button type="button" id="' +
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
    var artQuery = $('#artInput').val();
    $('#addArtModal').modal('toggle');

    $('.art-desgin-tags').append(
      '<div class="col-lg-2 col-md-3 col-6 tag-box text-center"><button type="button" id="' +
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

    var id = $(this).attr('id');

    var queryURL =
      'http://api.giphy.com/v1/gifs/search?q=' +
      id +
      '+art&design&api_key=ZhrVs1bOcGeNlrsYqdBK1z3G9kt83xc7';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      $.each(response.data, function(i, value) {
        $('.gallery').append(
          '<div class="col-lg-3 col-md-4 col-6"><a href="#" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="' +
            value.images.downsized_large.url +
            '" alt="' +
            value.title +
            '"/></a>' +
            '</div>'
        );
      });
    });
  });
});
