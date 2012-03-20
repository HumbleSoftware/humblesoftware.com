$(function () {

  var
    Editor = Flotr.Examples.Editor;

  function editor (node, code) {
    console.log(node);
    new Editor(node, {
      noRun : ($.browser.msie && $.browser.msie < 9 ? true : false),
      example : code,
      type : 'html'
    });
  }

  $.get(HSD_BASE + 'envision/example/template', function (response) {
    editor($('#usage-template'), response);
    $.get(HSD_BASE + 'envision/example/custom', function (response) {
      editor($('#usage-custom'), response);
    });
  });
});
