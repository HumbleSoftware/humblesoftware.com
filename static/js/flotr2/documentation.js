$(function () {

  $.get('example', function (response) {
    editor($('.editor.basic'), {
      example : response,
      type : 'html'
    });
  });
  /**/

  /*
  editor($('.editor.basic'), {
    example : EXAMPLES.basic.callback.toString()
  });
  /**/

});
