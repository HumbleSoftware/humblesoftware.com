$(function () {
  var
    a = $('.project-flotr-demo.a'),
    b = $('.project-flotr-demo.b'),
    link = $('.project-flotr-demo-link'),
    href = link.attr('href'),
    examples = [
      'basic',
      'basic-bars',
      'basic-bars-horizontal',
      'basic-bar-stacked'
      /*
      'basic-axis',
      'basic-pie',
      'basic-candle',
      'basic-bubble',
      'basic-radar',
      'color-gradients',
      'negative-values'
      */
    ],
    store = {},
    fadeTime = 300,
    interval = 3400,
    index = 1,
    timeout;

  // Init
  b.css({
    'visibility' : 'hidden',
    'opacity' : 0
  });

  execute(examples[0], a[0]);
  execute(examples[1], b[0]);
  setLink(examples[0]);

  // Rotation
  function intervalCallback () {
    swapGraphs();
    timeout = setTimeout(intervalCallback, interval);
  }
  timeout = setTimeout(intervalCallback, interval - 2 * fadeTime);

  // Hover pause rotation
  link.hover(function () {
      clearTimeout(timeout);
    }, function () {
      timeout = setTimeout(intervalCallback, interval - 2 * fadeTime);
  });

  function swapGraphs () {
    a.fadeOut(fadeTime, function () {
      b.css({
        'display' : 'none',
        'opacity' : 1,
        'visibility' : 'visible'
      });
      setLink(examples[index]);
      b.fadeIn(fadeTime, function () {
        var
          swap = b;
        index++;
        if (index >= examples.length) index = 0;
        b = a;
        a = swap;
        b.css({
          'visibility' : 'hidden',
          'display' : 'block',
          'opacity' : 0
        });
        execute(examples[index], b[0]);
      });
    });
  }

  var
    flashCanvas = !('getContext' in (document.createElement('canvas')));
  function execute(key, container) {
    var
      example = Flotr.ExampleList.examples[key];
    if (flashCanvas) {
      // Do the thing
      if (container.firstChild) {
        div = container.firstChild;
      } else {
        div = container.createElement('div');
        container.appendChild('div');
      }
      example.callback.apply(
        null, [div].concat(example.args) || [div]
      );
      
    } else {
      // Use store
      if (store[key]) {
        container.removeChild(container.firstChild);
        container.appendChild(store[key]);
      } else {
        if (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        var div = document.createElement('div');
        container.appendChild(div);
        example.callback.apply(
          null, [div].concat(example.args) || [div]
        );
        store[key] = div;
      }
    }
    $(container).attr('title', 'Example: ' + example.name);
  }

  function setLink (key) {
    link.attr('href', href + '#!' + key);
  }
});
