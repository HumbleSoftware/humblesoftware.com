$(function () {

  var
    Editor = Flotr.Examples.Editor;

  $.get(HSD_BASE + 'envision/example/template', function (response) {

    var
      usageExample = $('#usage-template');

    new Editor(usageExample, {
      noRun : ($.browser.msie && $.browser.msie < 9 ? true : false),
      example : response,
      type : 'html'
    });
  });
});
