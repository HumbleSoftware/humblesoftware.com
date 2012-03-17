$(function () {

  // No Select
  $('#demos').mousedown(function (e) {
    if ($(e.target).closest('.image').length) {
      $('body').addClass('no-select');
    } else {
      $('body').removeClass('no-select');
    }
  }).mouseup(function (e) {
    $('body').removeClass('no-select');
  });

  function envisionExample (id, example) {
    var
      Editor = Flotr.Examples.Editor,
      container = document.getElementById('demo'),
      editor;

    if (container) {
      editor = new Editor(container, {
        example : example,
        teardown : function () {
          var
            render = $(container).find('.render')[0],
            vis = envision.bonzo(render).data('envision');
          if (vis) vis.destroy();
        }
      });
    } else {
      container = document.getElementById(id);
      if (container) example(container);
    }
  }

  HSD.envisionExample = envisionExample;
});
