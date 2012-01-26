$(function () {
  var
    Editor = Flotr.Examples.Editor;

  $.get('example', function (response) {
    new Editor($('.editor.basic'), {
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
