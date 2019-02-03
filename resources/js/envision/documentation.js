$(function () {

  var Editor = Flotr.Examples.Editor;

  function handler (id) {
    return function (response) {
      new Editor($(id), {
        example : response,
        type : 'html'
      });
    }
  }

  $.get('/envision/example/custom', handler('#usage-custom'));
  $.get('/envision/example/template', handler('#usage-template'));
});
