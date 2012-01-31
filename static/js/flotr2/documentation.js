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

  var
    doc = $(document),
    nav = $('#documentation-nav'),
    offset = nav.offset(),
    animation;

  /*
  nav.css({
    position : 'fixed'
  });

  doc.scroll(function (e) {

    var
      scrollTop = doc.scrollTop(),
      bottom = Math.max(offset.top - scrollTop, 10);

    nav
      .stop()
      .animate({
        top : top
      });
  });

  /*
  editor($('.editor.basic'), {
    example : EXAMPLES.basic.callback.toString()
  });
  /**/

});
