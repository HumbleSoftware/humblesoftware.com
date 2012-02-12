$(function () {
  var
    Editor = Flotr.Examples.Editor;

  $.get('example', function (response) {
    var
      usageExample = $('.editor.usage');

    new Editor($('.editor.usage'), {
      noRun : ($.browser.msie && $.browser.msie < 9 ? true : false),
      example : response,
      type : 'html'
    });

    $.get(HSD_BASE + 'static/lib/flotr2/js/DefaultOptions.js', function (response) {
      new Editor($('.editor.api'), {
        noRun : true,
        example : response
      });
    });
  });

  /*
  editor($('.editor.basic'), {
    example : EXAMPLES.basic.callback.toString()
  });
  /**/

});
