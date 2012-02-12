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

    $.get(HSD_BASE + 'static/js/flotr2-DefaultOptions.js', function (response) {
      new Editor($('.editor.api'), {
        noRun : true,
        example : response
      });
    });
  });
});
