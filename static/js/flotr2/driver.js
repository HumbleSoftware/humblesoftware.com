$().ready(function () {

  Examples = new Flotr.Examples({
    node : document.getElementById('examples'),
    thumbPadding : 150
  });

  var
    examples  = $('#examples').find('.flotr-examples'),
    thumbs    = examples.find('.flotr-examples-thumbs'),
    offset    = 128,
    page      = $(window);

  $(document)
    .scroll(handleScrollSize);
  page
    .resize(handleResizeSize);

  function handleScrollSize () {
    if (examples.hasClass('flotr-examples-collapsed') && (examples.hasClass('flotr-examples-large') || examples.hasClass('flotr-examples-medium'))) {
      if (_.isNull(offset)) {
        offset = parseInt(thumbs.css('top'));
        if (_.isNaN(offset)) {
          offset = 0;
        }
      }
      var
        scrollTop = $(document).scrollTop(),
        top = Math.max(0, offset - scrollTop);
      thumbs.css({
        top : top,
        height : page.height() - 22 - top
      });
      Examples.options.thumbPadding = top + 22
    }
  }

  function handleResizeSize () {
    if (examples.hasClass('flotr-examples-large') || examples.hasClass('flotr-examples-medium')) {
      handleScrollSize();
    } else {
      thumbs.css({
        top : 'auto'
      });
    }
  }
});
