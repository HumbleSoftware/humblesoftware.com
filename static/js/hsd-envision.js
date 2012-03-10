(function () {

  var
    ONERROR   = window.onerror,
    COUNT     = 0,
    TYPES     = {},

    T_CONTROLS =
      '<div class="controls">' +
        '<button class="run btn large primary">Run</button>' +
      '</div>',
    T_EDITOR = '<div class="editor"></div>',
    T_SOURCE = '<div class="source"></div>',
    T_ERRORS = '<div class="errors"></div>',
    T_RENDER = '<div class="render"></div>',
    T_IFRAME = '<iframe></iframe>';


  // Javascript type:
  TYPES.javascript = function Javascript (o) {
    this.onerror = o.onerror;
  };
  TYPES.javascript.prototype = {
    codeMirrorType : 'javascript',
    example : function (o) {

      var
        example = o.example,
        render = o.render,
        renderId = $(render).attr('id');

      return '(' + example + ')(document.getElementById("' + renderId + '"));';
    },
    render : function (o) {
      eval(o.example);
    }
  };

  // HTML Type:
  TYPES.html = function Html (o) {
    this.onerror = o.onerror;
  };
  TYPES.html.prototype = {
    codeMirrorType : 'htmlmixed',
    example : function (o) {
      return $.trim(o.example);
    },
    render : function (o) {

      var
        example = o.example,
        render = o.render,
        iframe = $(T_IFRAME),
        that = this,
        win, doc;

      render.html(iframe);

      win = iframe[0].contentWindow;

      doc = win.document;
      doc.open();

      // Error
      win.onerror = iframe.onerror = function () {
        that.onerror.apply(null, arguments);
      }

      doc.write(example);
      doc.close();
    }
  };

  // Editor
  function Editor (container, o) {

    var
      type      = o.type || 'javascript',
      example   = o.example || '',
      noRun     = o.noRun || false,
      teardown  = o.teardown || false,
      controls  = $(T_CONTROLS),
      render    = $(T_RENDER),
      errors    = $(T_ERRORS),
      source    = $(T_SOURCE),
      node      = $(T_EDITOR),
      renderId  = 'editor-render-' + COUNT,
      api,
      render,
      codeMirror;

    api = new TYPES[type]({
      onerror : onerror
    });
    if (!api) throw 'Invalid type: API not found for type `' + type + '`.';

    render
      .attr('id', renderId);

    errors
      .hide();

    node
      .append(render)
      .append(controls)
      .append(source)
      .addClass(type)
      .addClass(noRun ? 'no-run' : '');

    container = $(container);
    container
      .append(node);

    source
      .append(errors)

    example = api.example({
      example : example,
      render : render
    });

    codeMirror = CodeMirror(source[0], {
      value : example,
      readOnly : noRun,
      lineNumbers : true,
      mode : api.codeMirrorType
    });

    if (!noRun) {
      controls.delegate('.run', 'click', function () {
        example = codeMirror.getValue();
        execute();
      });

      execute();
    }

    // Error handling:
    window.onerror = function (message, url, line) {

      onerror(message, url, line);
      console.log(message);

      if (ONERROR && $.isFunction(ONERROR)) {
        return ONERROR(message, url, line);
      } else {
        return false;
      }
    }

    // Helpers

    function execute () {
      errors.hide();
      if (teardown) {
        teardown.call();
      }
      api.render({
        example : example,
        render : render
      });
    }

    function onerror (message, url, line) {
      // @TODO Find some js error normalizing lib

      var
        doThatSexyThang = false,
        html = '<span class="error">Error: </span>',
        error, stack;

      /*
      // Native error type handling:
      if (typeof (message) !== 'string') {
        error = message;
        message = error.message;
        stack = error.stack;

        //if (stack) {
          console.log(stack);
        //}

        //console.log(message);

      }

      */

      html += '<span class="message">' + message + '</span>';
      if (typeof (line) !== "undefined") {
        html += '<span class="position">';
        html += 'Line <span class="line">' + line + '</span>';
        console.log(url);
        if (url) {
          html += ' of ';
          if (url == window.location) {
            html += '<span class="url">script</span>';
            if (doThatSexyThang) {
              //codeMirror.setMarker(line, '&#8226;');
            }
          } else {
            html += '<span class="url">' + url + '</span>';
          }
        }
        html += '.</span>';
      }

      errors.show();
      errors.html(html);
    }

    COUNT++;

    this.setExample = function (source) {
      example = api.example({
        example : source,
        render : render
      });
      codeMirror.setValue(example);
      codeMirror.refresh();
      execute();
    }
  }

  if (typeof Flotr.Examples === 'undefined') Flotr.Examples = {};
  Flotr.Examples.Editor = Editor;
})();

envision = {};

(function () { 
/**
 * Options:
 *
 * element - element housing visualization
 *
 */

var
  CN_FIRST  = 'envision-first',
  CN_LAST   = 'envision-last',

  T_VISUALIZATION   = '<div class="envision-visualization"></div>';
  T_CHILD_CONTAINER = '<div class="envision-child-container"></div>';

function Visualization (options) {
  this.options = options || {};
  this.children = [];
  this.node = null;
  this.rendered = false;
}

Visualization.prototype = {

  render : function (element) {

    var options = this.options;

    element = element || options.element;
    if (!element) throw 'No element to render within.';

    this.node = bonzo.create(T_VISUALIZATION)[0];
    bonzo(this.node).addClass(options.name || '')
    this.container = element;
    bonzo(element).append(this.node);

    _.each(this.children, function (child) {
      this._renderChild(child);
    }, this);
    this._updateClasses();

    this.rendered = true;

    return this;
  },

  add : function (child) {
    this.children.push(child);
    if (this.rendered) {
      this._renderChild(child);
      this._updateClasses();
    }
    return this;
  },

  remove : function (child) {
    var
      children  = this.children,
      index     = this.indexOf(child);
    if (index !== -1) {
      children.splice(index, 1);
      bonzo(child.container).remove();
      this._updateClasses();
    }
    return this;
  },

  setPosition : function (child, newIndex) {
    var
      children  = this.children;
    if (newIndex >= 0 && newIndex < children.length && this.remove(child)) {
      if (this.rendered) {
        if (newIndex === children.length)
          this.node.appendChild(child.container);
        else
          this.node.insertBefore(child.container, children[newIndex].container);
      }
      children.splice(newIndex, 0, child);
      this._updateClasses();
    }
    return this;
  },

  indexOf : function (child) {
    return _.indexOf(this.children, child);
  },

  getChild : function (index) {
    var children = this.children;
    if (index < children.length) return children[index];
  },

  isFirst : function (child) {
    return (this.indexOf(child) === 0 ? true : false);
  },

  isLast : function (child) {
    return (this.indexOf(child) === this.children.length - 1 ? true : false);
  },

  _renderChild : function (child) {
    var
      childContainer = bonzo.create(T_CHILD_CONTAINER)[0];

    bonzo(this.node).append(childContainer);
    child.render(childContainer);
  },

  _updateClasses : function () {

    var
      children  = this.children,
      first     = 0,
      last      = children.length -1,
      node;

    _.each(children, function (child, index) {
      node = bonzo(child.container);

      if (index === first)
        node.addClass(CN_FIRST);
      else
        node.removeClass(CN_FIRST);

      if (index === last)
        node.addClass(CN_LAST);
      else
        node.removeClass(CN_LAST);
    });
  }
};

envision.Visualization = Visualization;

})();

/**
 * Child Class
 *
 * Defines a visualization child.
 *
 * Options:
 *  height - Integer
 *  width - Integer
 *  flotr - A set of flotr options
 */
(function () { 

var

  V = envision,

  CN_CHILD = 'envision-child',

  T_CHILD = '<div class="' + CN_CHILD + '"></div>';

function Child (options) {

  options = options || {};

  var
    node = bonzo.create(T_CHILD)[0];

  this.options = options;
  this.node = node;

  if (options.flotr) {
    this.api = new V.flotr.Child(options);
  } else if (options.drawing) {
    this.api = options.drawing;
  }
}

Child.prototype = {

  render : function (element) {

    var
      node = this.node,
      options = this.options;

    element = element || options.element;

    if (!element) throw 'No element to render within.';

    bonzo(element)
      .addClass(options.name || '')
      .append(this.node);
    this._setDimension('width');
    this._setDimension('height');
    this.container = element;

    this.draw(options.data, options.flotr);
  },

  draw : function (data, flotr) {
    if (this.api) {
      this.api.draw(data, flotr, this.node);
    }
  },

  getData : function () {
    return this.data;
  },

  trigger : function () {
    this.api.trigger.apply(this.api, arguments);
  },

  attach : function () {
    this.api.attach.apply(this.api, arguments);
  },

  detach : function () {
    this.api.detach.apply(this.api, arguments);
  },

  _setDimension : function (attribute) {
    var
      node = this.node,
      options = this.options;
    if (options[attribute]) {
      bonzo(node).css(attribute, options[attribute]);
    } else {
      options[attribute] = parseInt(bonzo(node).css(attribute), 10);
    }
    this[attribute] = options[attribute];
  }
};

V.Child = Child;

})();

/**
 * Interaction Class
 *
 * Defines an interaction between visualization children.
 *
 * An interaction has leaders, followers, and actions.  Leaders fire events which
 * are reacted to by followers as defined by actions.
 *
 * Options:
 *  leader - Child or children to lead the interaction
 *  event - Event to interact with
 *
 */
(function () {

var H = envision;

function Interaction(options) {
  this.options = options = options || {};
  this.actions = [];
  this.actionOptions = [];
  this.followers = [];
  this.leaders = [];
  this.prevent = {};

  //this._initOptions();
  //if (!options.leader) throw 'No leader.';

  if (options.leader) {
    this.leader(options.leader);
  }

  //this.leaders = (_.isArray(options.leader) ? options.leader : [options.leader]);
}

Interaction.prototype = {

  getLeaders : function () {
    return this.leaders; 
  },

  getFollowers : function () {
    return this.followers; 
  },

  getActions : function () {
    return this.actions;
  },

  leader : function (child) {

    this.leaders.push(child);

    _.each(this.actions, function (action, i) {
      this._bindLeader(child, action, this.actionOptions[i]);
    }, this);
    return this;
  },

  follower : function (child) {
    this.followers.push(child);
    return this;
  },

  group : function (children) {
    if (!_.isArray(children)) children = [children];
    _.each(children, function (child) {
      this.leader(child);
      this.follower(child);
    }, this);
    return this;
  },

  add : function (action, options) {
    this.actions.push(action);
    this.actionOptions.push(options);
    _.each(this.leaders, function (leader) {
      this._bindLeader(leader, action, options);
    }, this);
    return this;
  },

  _bindLeader : function (leader, action, options) {
    _.each(action.events, function (e) {

      var
        handler = e.handler || e,
        consumer = e.consumer || e;

      leader.attach(leader, handler, _.bind(function (leader, result) {

        if (this.prevent[name]) return;

        // Apply custom callback configured for this action
        if (options && options.callback) {
          options.callback.call(this, result);
        }

        this.prevent[name] = true; // Prevent recursions for this name
        try {
          _.each(this.followers, function (follower) {

            if (leader === follower) return; // Skip leader (recursion)

            follower.trigger(follower, consumer, result);

          }, this);
        } catch (e) {
          this.prevent[name] = false;
          throw e;
        }
        this.prevent[name] = false;
      }, this));
    }, this);
  }
};

H.Interaction = Interaction;

})();

(function () {

var selection = {
  events : [
    {
      handler : 'select',
      consumer : 'zoom'
    },
    'click'
  ]
};

envision.action = envision.action || {};
envision.action.selection = selection;

})();

(function () {

var hit = {
  events : [
    'hit',
    'mouseout'
  ]
};

envision.action = envision.action || {};
envision.action.hit = hit;

})();

(function () {

function Preprocessor (options) {

  options = options || {};

  var
    data;

  this.getData = function () {
    if (this.bounded) bound(this);
    return data;
  }

  this.setData = function (newData) {
    var
      i, length;
    if (!_.isArray(newData)) throw new Error('Array expected.');
    if (newData.length < 2) throw new Error('Data must contain at least two dimensions.');
    length = newData[0].length;
    for (i = newData.length; i--;) {
      if (!_.isArray(newData[i])) throw new Error('Data dimensions must be arrays.');
      if (newData[i].length !== length) throw new Error('Data dimensions must contain the same number of points.');
    }

    data = newData;

    return this;
  }

  if (options.data) this.setData(options.data);
}

function getStartIndex (data, min) {

  var
    length = data.length,
    i;

  for (i = 0; i < length; i++) {
    if (data[i] >= min) break;
  }

  // Include point outside range when not exact match
  if (data[i] > min && i > 0) i--;

  return i;
}

function getEndIndex (data, max) {

  var
    i;

  for (i = data.length; i--;) {
    if (data[i] <= max) break;
  }

  // Include point outside range when not exact match
  if (data[i] < max && i > 0) i++;

  return i;
}

function bound (that) {

  delete that.bounded;

  var
    data    = that.getData(),
    length  = that.length(),
    x       = data[0],
    y       = data[1],
    min     = that.min || 0,
    max     = that.max || that.length(),
    start   = getStartIndex(x, min),
    end     = getEndIndex(x, max);

  that.setData([
    x.slice(start, end + 1),
    y.slice(start, end + 1)
  ]);
};

Preprocessor.prototype = {

  length : function () {
    return this.getData()[0].length;
  },

  bound : function (min, max) {

    if (!_.isNumber(min) || !_.isNumber(max)) return this;

    this.min = min;
    this.max = max;
    this.bounded = true;

    return this;
  },

  /**
   * Sample using min and max.
   */
  subsampleMinMax : function (resolution) {

    var bounded = this.bounded;
    delete this.bounded;

    var
      data    = this.getData(),
      length  = this.length(),
      x       = data[0],
      y       = data[1],
      start   = bounded ? getStartIndex(x, this.min) : 0,
      end     = bounded ? getEndIndex(x, this.max) : length - 1,
      count   = (resolution - 2) / 2,
      newX    = [],
      newY    = [],
      min     = Number.MAX_VALUE,
      max     = -Number.MAX_VALUE,
      minI    = 1,
      maxI    = 1,
      unit    = (end - start)/ count,
      position, min, max, datum, i, j;

    if (end - start + 1 > resolution) {

      newX.push(x[start]);
      newY.push(y[start]);

      position = start + unit;

      for (i = start; i < end; i++) {

        if (i === Math.round(position)) {

          position += unit;

          j = Math.min(maxI, minI);
          newX.push(x[j]);
          newY.push(y[j]);

          j = Math.max(maxI, minI);
          newX.push(x[j]);
          newY.push(y[j]);

          minI = i;
          min = y[minI];
          maxI = i;
          max = y[maxI];

        } else {
          if (y[i] > max) {
            max = y[i];
            maxI = i;
          }

          if (y[i] < min) {
            min = y[i];
            minI = i;
          }
        }
      }

      if (i < position) {
        newX.push(x[minI]);
        newY.push(min);
        newX.push(x[maxI]);
        newY.push(max);
      }

      // Last
      newX.push(x[end]);
      newY.push(y[end]);

      this.setData([newX, newY]);
    } else {
      this.bounded = true;
    }

    return this;
  },

  subsample : function (resolution) {

    var bounded = this.bounded;
    delete this.bounded;

    var
      data    = this.getData(),
      length  = this.length(),
      x       = data[0],
      y       = data[1],
      start   = bounded ? getStartIndex(x, this.min) : 0,
      end     = bounded ? getEndIndex(x, this.max) : length - 1,
      unit    = (end - start + 1) / resolution,
      newX    = [],
      newY    = [],
      i, index;

    if (length > resolution) {

      // First
      newX.push(x[start]);
      newY.push(y[start]);

      for (i = 1; i < resolution; i++) {
        if (i * unit >= end - unit) break;
        index = Math.round(i * unit) + start;
        newX.push(x[index]);
        newY.push(y[index]);
      }

      // Last
      newX.push(x[end]);
      newY.push(y[end]);

      this.setData([newX, newY]);
    }

    return this;
  }
};

envision.Preprocessor = Preprocessor;

}());

(function () {

  function QuadraticDrawing () {
  }

  QuadraticDrawing.prototype = {

    height : null,
    width : null,
    rendered : false,

    render : function (node) {
      var
        canvas = document.createElement('canvas'),//bonzo.create('<canvas></canvas>')[0],
        offset = bonzo(node).offset();

      this.height = offset.height;
      this.width = offset.width;

      bonzo(canvas)
        .attr('height', offset.height)
        .attr('width', offset.width)
        .css({
          position : 'absolute',
          top : '0px',
          left : '0px'
        });

      node.appendChild(canvas);
      bonzo(node).css({
        position : 'relative'
      });

      if (typeof FlashCanvas !== 'undefined') FlashCanvas.initElement(canvas);
      this.context = canvas.getContext('2d');
      this.rendered = true;
    },

    draw : function (data, options, node) {

      if (!this.rendered) this.render(node);

      var
        context = this.context,
        height = this.height,
        width = this.width,
        half = Math.round(height / 2) - .5,
        min, max;

      options = options || { min : width / 2, max : width / 2};

      min = options.min + 0.5;
      max = options.max + 0.5;

      context.clearRect(0, 0, width, height);
      if (min || max) {
        context.save();
        context.strokeStyle = '#B6D9FF';
        context.fillOpacity = .5;
        context.fillStyle = 'rgba(182, 217, 255, .4)';
        context.beginPath();

        // Left
        if (min <= 1) {
          context.moveTo(0, height);
          context.lineTo(0, -0.5);
        } else {
          context.moveTo(min, height);
          context.quadraticCurveTo(min, half, Math.max(min - half, min / 2), half);
          context.lineTo(Math.min(half, min / 2), half);
          context.quadraticCurveTo(0, half, 0, -0.5);
        }

        // Top
        context.lineTo(width, -0.5);

        // Right
        if (max >= width - 1) {
          context.lineTo(max, height);
        } else {
          context.quadraticCurveTo(width, half, Math.max(width - half, width - (width - max) / 2), half);
          context.lineTo(Math.min(max + half, width - (width - max) / 2), half);
          context.quadraticCurveTo(max, half, max, height);
        }

        context.stroke();
        context.closePath();
        context.fill();
        context.restore();
      }
    },
    trigger : function (child, name, options) {
      if (name === 'zoom') {
        this.zoom(child, options);
      } else if (name === 'click') {
        this.click(child);
      }
    },
    zoom : function (child, options) {
      var
        x = options.x || {},
        min = x.min,
        max = x.max,
        api = child.api;

      child.draw(null, {
        min : min,
        max : max
      });
    },
    click : function (child) {
      child.draw(null, {
        min : child.width / 2,
        max : child.width / 2
      });
    }
  };
  envision.QuadraticDrawing = QuadraticDrawing;
})();

envision.flotr = {};

/*
 * Flotr Default Options
 */

envision.flotr.defaultOptions = {
  grid : {
    outlineWidth : 0,
    labelMargin : 0,
    horizontalLines : false,
    verticalLines : false
  },
  bars : {
    show        : false,
    barWidth    : 0.5,
    fill        : true,
    lineWidth   : 1,
    fillOpacity : 1
  },
  lines : {
    lineWidth   : 1
  },
  xaxis : {
    margin      : false,
    tickDecimals: 0,
    showLabels  : false
  },
  yaxis : {
    margin      : false,
    showLabels  : false
  },
  shadowSize    : false
};

/**
 * Child Class
 *
 * Defines a visualization child.
 *
 * Options:
 *  height - Integer
 *  width - Integer
 *  flotr - A set of flotr options
 */
(function () { 

var
  V = envision,
  E = Flotr.EventAdapter,
  DEFAULTS = V.flotr.defaultOptions;

function Child (options) {
  this.options = options || {};
  this.flotr = null;
  this._flotrDefaultOptions();
}

Child.prototype = {

  draw : function (data, flotr, node) {

    var
      o           = this.options,
      fData       = [];

    data = data || o.data;

    if (flotr) {
      flotr = Flotr.clone(flotr);
      _.extend(o.flotr, flotr);
      this._flotrDefaultOptions(flotr);
    }
    flotr = o.flotr;
    o.data = data;
    min = flotr.xaxis.min;
    max = flotr.xaxis.max;

    data = this._getDataArray(data);
    if (o.skipPreprocess) {
      flotrData = data;
    } else {
      _.each(data, function (d, index) {
        // TODO flotr
        /*
        if (!_.isArray(d) && !_.isFunction(d)) {
          fData[index] = _.clone(d);
          fData[index] = this._processData(d.data);
        } else {
        */
          fData[index] = this._processData(d);
        //}
      }, this);

      fData = fData[0];
      var
        flotrData = [],
        x = fData[0],
        y = fData[1],
        i;
      for (i = 0; i < x.length; i++) {
        flotrData.push([x[i], y[i]]);
      }
      flotrData = [flotrData];
    }

    if (!flotr) throw 'No graph submitted.';

    this.flotr = Flotr.draw(node, flotrData, flotr);
  },

  _processData : function (data) {

    var
      options     = this.options,
      process     = options.processData,
      resolution  = options.width,
      axis        = options.flotr.xaxis,
      min         = axis.min,
      max         = axis.max,
      preprocessor;

    if (_.isFunction(data)) {
      return data(min, max, resolution);
    } else if (process) {
      preprocessor = new V.Preprocessor({data : data});
      process.apply(this, [{
        preprocessor : preprocessor,
        min : min,
        max : max,
        resolution : resolution
      }]);
    } else {
      preprocessor = new V.Preprocessor({data : data})
        .bound(min, max)
        .subsampleMinMax(resolution);
    }

    return preprocessor.getData();
  },

  _getDataArray : function (data) {

    if (data[0] && (!_.isArray(data[0]) || (data[0][0] && _.isArray(data[0][0]))))
      return data;
    else
      return [data];
  },

  _flotrDefaultOptions : function (options) {

    var o = options || this.options.flotr,
      i;

    for (i in DEFAULTS) {
      if (DEFAULTS.hasOwnProperty(i)) {
        if (_.isUndefined(o[i])) {
          o[i] = DEFAULTS[i];
        } else {
          _.defaults(o[i], DEFAULTS[i]);
        }
      }
    }
  },

  attach : function (child, name, callback) {

    var
      event = this.events[name] || {},
      name = event.name || false,
      handler = event.handler || false;

    if (handler) {

      return E.observe(child.node, name, function () {

        var
          args = [child].concat(Array.prototype.slice.call(arguments)),
          result = handler.apply(this, args);

        return callback.apply(null, [child, result]);

      });
    } else {
      return false;
    }
  },

  detach : function (child, name, callback) {
    return E.stopObserve(child.node, name, handler);
  },

  trigger : function (child, name, options) {

    var
      event = this.events[name],
      consumer = event.consumer || false;

    return consumer ? consumer.apply(this, [child, options]) : false;
  },

  events : {

    hit : {
      name : 'flotr:hit',
      handler : function (child, hit) {

        var
          x = hit.x,
          y = hit.y,
          graph = child.api.flotr,
          options;

        // Normalized hit:
        options = {
          data : {
            index : hit.index,
            x : x,
            y : y
          },
          x : graph.axes.x.d2p(x),
          y : graph.axes.y.d2p(y)
        };

        return options;
      },
      consumer : function (child, hit) {

        var
          graph = child.api.flotr,
          o;

        // TODO this is a hack;
        // the hit plugin should expose an API to do this easily
        o = {
          x : hit.data.x,
          y : hit.data.y || 1,
          relX : hit.x,
          relY : hit.y || 1
        };

        graph.hit.hit(o);
      }
    },

    select : {
      name : 'flotr:selecting',
      handler : function (child, selection) {

        var
          mode = child.options.flotr.selection.mode,
          axes = child.api.flotr.axes,
          datax, datay, x, y, options;

        if (mode.indexOf('x') !== -1) {
          datax = {};
          datax.min = selection.x1;
          datax.max = selection.x2;
          x = {};
          x.min = axes.x.d2p(selection.x1);
          x.max = axes.x.d2p(selection.x2);
        }

        if (mode.indexOf('y') !== -1) {
          datay = {};
          datay.min = selection.y1;
          datay.max = selection.y2;
          y = {};
          y.min = axes.y.d2p(selection.y1);
          y.max = axes.y.d2p(selection.y2);
        }

        // Normalized selection:
        options = {
          data : {
            x : datax,
            y : datay
          },
          x : x,
          y : y
        }

        return options;
      },
      consumer : function (child, selection) {

        var
          graph = child.api.flotr,
          axes = graph.axes,
          data = selection.data || {},
          options = {},
          x = selection.x,
          y = selection.y;

        if (!x && data.x) {
          // Translate data to pixels
          x = data.x;
          options.x1 = axes.x.d2p(x.min);
          options.x2 = axes.x.d2p(x.max);
        } else if (x) {
          // Use pixels
          options.x1 = x.min;
          options.x2 = x.max;
        }

        if (!y && data.y) {
          // Translate data to pixels
          y = data.y;
          options.y1 = axes.y.d2p(y.min);
          options.y2 = axes.y.d2p(y.max);
        } else if (y) {
          // Use pixels
          options.y1 = y.min;
          options.y2 = y.max;
        }

        graph.selection.setSelection(options);
      }
    },

    zoom : {
      consumer : function (child, selection) {

        var
          x = selection.data.x,
          y = selection.data.y,
          options = {};

        if (x) {
          options.xaxis = {
            min : x.min,
            max : x.max
          };
        }

        if (y) {
          options.yaxis = {
            min : y.min,
            max : y.max
          };
        }

        child.draw(null, options);
      }
    },

    mouseout : {
      name : 'flotr:mouseout',
      handler : function (child) {
      },
      consumer : function (child) {
        child.api.flotr.hit.clearHit();
      }
    },

    click : {
      name : 'flotr:click',
      handler : function (child) {

        var
          min = child.api.flotr.axes.x.min,
          max = child.api.flotr.axes.x.max;

        return {
          data : {
            x : {
              min : min,
              max : max
            }
          },
          x : {
            min : child.api.flotr.axes.x.d2p(min),
            max : child.api.flotr.axes.x.d2p(max)
          }
        };
      },
      consumer : function (child, selection) {

        var
          x = selection.data.x,
          y = selection.data.y,
          options = {};

        if (x) {
          options.xaxis = {
            min : x.min,
            max : x.max
          };
        }

        if (y) {
          options.yaxis = {
            min : y.min,
            max : y.max
          };
        }

        child.draw(null, options);
      }
    }
  }
};

V.flotr.Child = Child;

})();

/** Lines **/
Flotr.addType('lite-lines', {
  options: {
    show: false,           // => setting to true will show lines, false will hide
    lineWidth: 2,          // => line width in pixels
    fill: false,           // => true to fill the area from the line to the x axis, false for (transparent) no fill
    fillBorder: false,     // => draw a border around the fill
    fillColor: null,       // => fill color
    fillOpacity: 0.4       // => opacity of the fill color, set to 1 for a solid fill, 0 hides the fill
  },

  /**
   * Draws lines series in the canvas element.
   * @param {Object} options
   */
  draw : function (options) {

    var
      context     = options.context,
      lineWidth   = options.lineWidth,
      shadowSize  = options.shadowSize,
      offset;

    context.save();
    context.lineCap = 'butt';
    context.lineWidth = lineWidth;
    context.strokeStyle = options.color;

    this.plot(options);

    context.restore();
  },

  plot : function (options) {

    var
      context   = options.context,
      xScale    = options.xScale,
      yScale    = options.yScale,
      data      = options.data, 
      length    = data.length - 1,
      zero      = yScale(0),
      x0, y0;
      
    if (length < 1) return;

    x0 = xScale(data[0][0]);
    y0 = yScale(data[0][1]);

    context.beginPath();
    context.moveTo(x0, y0);
    for (i = 0; i < length; ++i) {
      context.lineTo(
        xScale(data[i+1][0]),
        yScale(data[i+1][1])
      );
    }

    if (!options.fill || options.fill && !options.fillBorder) context.stroke();

    if (options.fill){
      x0 = xScale(data[0][0]);
      context.fillStyle = options.fillStyle;
      context.lineTo(xScale(data[length][0]), zero);
      context.lineTo(x0, zero);
      context.lineTo(x0, yScale(data[0][1]));
      context.fill();
      if (options.fillBorder) {
        context.stroke();
      }
    }
  }
});

/** Bars **/
Flotr.addType('whiskers', {

  options: {
    show: false,           // => setting to true will show bars, false will hide
    lineWidth: 2,          // => in pixels
    barWidth: 1,           // => in units of the x axis
    fill: true,            // => true to fill the area from the line to the x axis, false for (transparent) no fill
    fillColor: null,       // => fill color
    fillOpacity: 0.4,      // => opacity of the fill color, set to 1 for a solid fill, 0 hides the fill
    horizontal: false,     // => horizontal bars (x and y inverted)
    stacked: false,        // => stacked bar charts
    centered: true         // => center the bars to their x axis value
  },

  stack : { 
    positive : [],
    negative : [],
    _positive : [], // Shadow
    _negative : []  // Shadow
  },

  draw : function (options) {
    var
      context = options.context;

    context.save();
    context.lineJoin = 'miter';
    context.lineCap = 'butt';
    context.lineWidth = options.lineWidth;
    context.strokeStyle = options.color;
    if (options.fill) context.fillStyle = options.fillStyle;
    
    this.plot(options);

    context.restore();
  },

  plot : function (options) {

    var
      data            = options.data,
      context         = options.context,
      shadowSize      = options.shadowSize,
      xScale          = options.xScale,
      yScale          = options.yScale,
      zero            = yScale(0),
      i, x;

    if (data.length < 1) return;

    context.translate(-options.lineWidth, 0)
    context.beginPath();
    for (i = 0; i < data.length; i++) {
      x = xScale(data[i][0]);
      context.moveTo(x, zero);
      context.lineTo(x, yScale(data[i][1]));
    }

    context.closePath();
    context.stroke();
  },

  drawHit : function (options) {

    var
      args            = options.args,
      context         = options.context,
      shadowSize      = options.shadowSize,
      xScale          = options.xScale,
      yScale          = options.yScale,
      zero            = yScale(0),
      x               = xScale(args.x),
      y               = yScale(args.y);

    context.save();
    context.translate(-options.lineWidth, 0)
    context.beginPath();
    context.moveTo(x, zero);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();
  },

  clearHit: function (options) {

    var
      args            = options.args,
      context         = options.context,
      shadowSize      = options.shadowSize,
      xScale          = options.xScale,
      yScale          = options.yScale,
      lineWidth       = options.lineWidth,
      zero            = yScale(0),
      x               = xScale(args.x),
      y               = yScale(args.y);

    context.save();
    context.clearRect(x - 2 * lineWidth, y - lineWidth, 4 * lineWidth, zero - y + lineWidth);
    context.restore();
  }
});
/*!
  * Bonzo: DOM Utility (c) Dustin Diaz 2011
  * https://github.com/ded/bonzo
  * License MIT
  */
!function(a,b){typeof define=="function"?define(b):typeof module!="undefined"?module.exports=b():this[a]=b()}("bonzo",function(){function x(a){return new RegExp("(^|\\s+)"+a+"(\\s+|$)")}function y(a,b,c){for(var d=0,e=a.length;d<e;d++)b.call(c||a[d],a[d],d,a);return a}function z(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}function A(a){return a&&a.nodeName&&a.nodeType==1}function B(a,b,c,d){for(d=0,j=a.length;d<j;++d)if(b.call(c,a[d],d,a))return!0;return!1}function D(a,b,c){var d=0,g=b||this,h=[],i=f&&typeof a=="string"&&a.charAt(0)!="<"?function(b){return(b=f(a))&&(b.selected=1)&&b}():a;return y(J(i),function(a){y(g,function(b){var f=!b[e]||b[e]&&!b[e][e]?function(){var a=b.cloneNode(!0);return g.$&&g.cloneEvents&&g.$(a).cloneEvents(b),a}():b;c(a,f),h[d]=f,d++})},this),y(h,function(a,b){g[b]=a}),g.length=d,g}function E(a,b,c){var d=N(a),e=d.css("position"),f=d.offset(),g="relative",h=e==g,i=[parseInt(d.css("left"),10),parseInt(d.css("top"),10)];e=="static"&&(d.css("position",g),e=g),isNaN(i[0])&&(i[0]=h?0:a.offsetLeft),isNaN(i[1])&&(i[1]=h?0:a.offsetTop),b!=null&&(a.style.left=b-f.left+i[0]+q),c!=null&&(a.style.top=c-f.top+i[1]+q)}function F(a,b){return x(b).test(a.className)}function G(a,b){a.className=w(a.className+" "+b)}function H(a,b){a.className=w(a.className.replace(x(b)," "))}function I(a){this.length=0;if(a){a=typeof a!="string"&&!a.nodeType&&typeof a.length!="undefined"?a:[a],this.length=a.length;for(var b=0;b<a.length;b++)this[b]=a[b]}}function J(a){return typeof a=="string"?N.create(a):A(a)?[a]:a}function K(a,c,d){var e=this[0];return a==null&&c==null?(L(e)?M():{x:e.scrollLeft,y:e.scrollTop})[d]:(L(e)?b.scrollTo(a,c):(a!=null&&(e.scrollLeft=a),c!=null&&(e.scrollTop=c)),this)}function L(a){return a===b||/^(?:body|html)$/i.test(a.tagName)}function M(){return{x:b.pageXOffset||d.scrollLeft,y:b.pageYOffset||d.scrollTop}}function N(a,b){return new I(a,b)}var a=this,b=window,c=b.document,d=c.documentElement,e="parentNode",f=null,g=/^checked|value|selected$/,h=/select|fieldset|table|tbody|tfoot|td|tr|colgroup/i,i="table",k={thead:i,tbody:i,tfoot:i,tr:"tbody",th:"tr",td:"tr",fieldset:"form",option:"select"},l=/^checked|selected$/,m=/msie/i.test(navigator.userAgent),n=[],o=0,p=/^-?[\d\.]+$/,q="px",r="setAttribute",s="getAttribute",t=/(^\s*|\s*$)/g,u={lineHeight:1,zoom:1,zIndex:1,opacity:1},v=function(){var a=["webkitTransform","MozTransform","OTransform","msTransform","Transform"],b;for(b=0;b<a.length;b++)if(a[b]in c.createElement("a").style)return a[b]}(),w=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(t,"")},C=c.defaultView&&c.defaultView.getComputedStyle?function(a,b){b=b=="transform"?v:b,b=b=="transform-origin"?v+"Origin":b;var d=null;b=="float"&&(b="cssFloat");var e=c.defaultView.getComputedStyle(a,"");return e&&(d=e[z(b)]),a.style[b]||d}:m&&d.currentStyle?function(a,b){b=z(b),b=b=="float"?"styleFloat":b;if(b=="opacity"){var c=100;try{c=a.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(d){try{c=a.filters("alpha").opacity}catch(e){}}return c/100}var f=a.currentStyle?a.currentStyle[b]:null;return a.style[b]||f}:function(a,b){return a.style[z(b)]};I.prototype={get:function(a){return this[a]},each:function(a,b){return y(this,a,b)},map:function(a,b){var c=[],d,e;for(e=0;e<this.length;e++)d=a.call(this,this[e],e),b?b(d)&&c.push(d):c.push(d);return c},first:function(){return N(this[0])},last:function(){return N(this[this.length-1])},html:function(a,b){function f(b){while(b.firstChild)b.removeChild(b.firstChild);y(J(a),function(a){b.appendChild(a)})}var c=b?d.textContent===null?"innerText":"textContent":"innerHTML",e;return typeof a!="undefined"?this.each(function(b){(e=b.tagName.match(h))?f(b,e[0]):b[c]=a}):this[0]?this[0][c]:""},text:function(a){return this.html(a,1)},addClass:function(a){return this.each(function(b){F(b,a)||G(b,a)})},removeClass:function(a){return this.each(function(b){F(b,a)&&H(b,a)})},hasClass:function(a){return B(this,function(b){return F(b,a)})},toggleClass:function(a,b){return this.each(function(c){typeof b!="undefined"?b?G(c,a):H(c,a):F(c,a)?H(c,a):G(c,a)})},show:function(a){return this.each(function(b){b.style.display=a||""})},hide:function(a){return this.each(function(a){a.style.display="none"})},append:function(a){return this.each(function(b){y(J(a),function(a){b.appendChild(a)})})},prepend:function(a){return this.each(function(b){var c=b.firstChild;y(J(a),function(a){b.insertBefore(a,c)})})},appendTo:function(a,b){return D.call(this,a,b,function(a,b){a.appendChild(b)})},prependTo:function(a,b){return D.call(this,a,b,function(a,b){a.insertBefore(b,a.firstChild)})},next:function(){return this.related("nextSibling")},previous:function(){return this.related("previousSibling")},related:function(a){return this.map(function(b){b=b[a];while(b&&b.nodeType!==1)b=b[a];return b||0},function(a){return a})},before:function(a){return this.each(function(b){y(N.create(a),function(a){b[e].insertBefore(a,b)})})},after:function(a){return this.each(function(b){y(N.create(a),function(a){b[e].insertBefore(a,b.nextSibling)})})},insertBefore:function(a,b){return D.call(this,a,b,function(a,b){a[e].insertBefore(b,a)})},insertAfter:function(a,b){return D.call(this,a,b,function(a,b){var c=a.nextSibling;c?a[e].insertBefore(b,c):a[e].appendChild(b)})},css:function(a,d,e){function g(a,b,c){for(var d in f)f.hasOwnProperty(d)&&(c=f[d],(b=z(d))&&p.test(c)&&!(b in u)&&(c+=q),b=b=="transform"?v:b,b=b=="transformOrigin"?v+"Origin":b,a.style[b]=c)}if(d===undefined&&typeof a=="string")return d=this[0],d?d==c||d==b?(e=d==c?N.doc():N.viewport(),a=="width"?e.width:a=="height"?e.height:""):C(d,a):null;var f=a;typeof a=="string"&&(f={},f[a]=d),m&&f.opacity&&(f.filter="alpha(opacity="+f.opacity*100+")",f.zoom=a.zoom||1,delete f.opacity);if(d=f["float"])m?f.styleFloat=d:f.cssFloat=d,delete f["float"];return this.each(g)},offset:function(a,b){if(typeof a=="number"||typeof b=="number")return this.each(function(c){E(c,a,b)});var c=this[0],d=c.offsetWidth,e=c.offsetHeight,f=c.offsetTop,g=c.offsetLeft;while(c=c.offsetParent)f=f+c.offsetTop,g=g+c.offsetLeft;return{top:f,left:g,height:e,width:d}},attr:function(a,b){var c=this[0];if(typeof a=="string"||a instanceof String)return typeof b=="undefined"?g.test(a)?l.test(a)&&typeof c[a]=="string"?!0:c[a]:c[s](a):this.each(function(c){g.test(a)?c[a]=b:c[r](a,b)});for(var d in a)a.hasOwnProperty(d)&&this.attr(d,a[d]);return this},val:function(a){return typeof a=="string"?this.attr("value",a):this[0].value},removeAttr:function(a){return this.each(function(b){l.test(a)?b[a]=!1:b.removeAttribute(a)})},data:function(a,b){var c=this[0];if(typeof b=="undefined"){c[s]("data-node-uid")||c[r]("data-node-uid",++o);var d=c[s]("data-node-uid");return n[d]||(n[d]={}),n[d][a]}return this.each(function(c){c[s]("data-node-uid")||c[r]("data-node-uid",++o);var d=c[s]("data-node-uid"),e=n[d]||(n[d]={});e[a]=b})},remove:function(){return this.each(function(a){a[e]&&a[e].removeChild(a)})},empty:function(){return this.each(function(a){while(a.firstChild)a.removeChild(a.firstChild)})},detach:function(){return this.map(function(a){return a[e].removeChild(a)})},scrollTop:function(a){return K.call(this,null,a,"y")},scrollLeft:function(a){return K.call(this,a,null,"x")},toggle:function(a){return this.each(function(a){a.style.display=a.offsetWidth||a.offsetHeight?"none":"block"}),a&&a(),this}},N.setQueryEngine=function(a){f=a,delete N.setQueryEngine},N.aug=function(a,b){for(var c in a)a.hasOwnProperty(c)&&((b||I.prototype)[c]=a[c])},N.create=function(a){return typeof a=="string"?function(){var b=/^<([^\s>]+)/.exec(a),d=c.createElement(b&&k[b[1].toLowerCase()]||"div"),e=[];d.innerHTML=a;var f=d.childNodes;d=d.firstChild,e.push(d);while(d=d.nextSibling)d.nodeType==1&&e.push(d);return e}():A(a)?[a.cloneNode(!0)]:[]},N.doc=function(){var a=this.viewport();return{width:Math.max(c.body.scrollWidth,d.scrollWidth,a.width),height:Math.max(c.body.scrollHeight,d.scrollHeight,a.height)}},N.firstChild=function(a){for(var b=a.childNodes,c=0,d=b&&b.length||0,e;c<d;c++)b[c].nodeType===1&&(e=b[d=c]);return e},N.viewport=function(){return{width:m?d.clientWidth:self.innerWidth,height:m?d.clientHeight:self.innerHeight}},N.isAncestor="compareDocumentPosition"in d?function(a,b){return(a.compareDocumentPosition(b)&16)==16}:"contains"in d?function(a,b){return a!==b&&a.contains(b)}:function(a,b){while(b=b[e])if(b===a)return!0;return!1};var O=a.bonzo;return N.noConflict=function(){return a.bonzo=O,this},N})
envision.templates = envision.templates || {};

(function () {

var
  V = envision;

// Custom data processor
function processData (options) {

  var
    resolution = options.resolution;

  options.preprocessor
    .bound(options.min, options.max)
    .subsampleMinMax(resolution + Math.round(resolution / 3));
}

function getDefaults () {
  return {
    price : {
      name : 'envision-finance-price',
      flotr : {
        'lite-lines' : {
          lineWidth : 1,
          show : true,
          fill : true,
          fillOpacity : 0.2
        },
        mouse : {
          track: true,
          trackY: false,
          trackAll: true,
          sensibility: 1,
          trackDecimals: 4,
          position: 'ne'
        },
        yaxis : { 
          autoscale : true,
          autoscaleMargin : 0.05,
          noTicks : 4,
          showLabels : true,
          min : 0
        }
      },
      processData : processData
    },
    volume : {
      name : 'envision-finance-volume',
      flotr : {
        whiskers : {
          show : true,
          lineWidth : 2
        },
        mouse: {
          track: true,
          trackY: false,
          trackAll: true
        }
      },
      processData : processData
    },
    summary : {
      name : 'envision-finance-summary',
      flotr : {
        'lite-lines' : {
          show : true,
          lineWidth : 1,
          fill : true,
          fillOpacity : 0.2,
          fillBorder : true
        },
        xaxis : {
          noTicks: 5,
          showLabels : true
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : 0.1
        },
        handles : {
          show : true
        },
        selection : {
          mode : 'x'
        },
        grid : {
          verticalLines : false
        }
      }
    },
    connection : {
      name : 'envision-finance-connection',
      drawing : new V.QuadraticDrawing()
    }
  };
}

function Finance (options) {

  var
    data = options.data,
    defaults = getDefaults(),
    vis = new V.Visualization({name : 'envision-finance'}),
    selection = new V.Interaction(),
    hit = new V.Interaction(),
    price, volume, connection, summary;

  if (options.defaults) {
    defaults = Flotr.merge(defaults, options.defaults);
  }

  defaults.price.data = data.price;
  defaults.volume.data = data.volume;
  defaults.summary.data = data.summary;

  defaults.price.flotr.mouse.trackFormatter = options.trackFormatter || function (o) {

    var
      index = o.index,
      value = 'Price: $' + data.price[1][index] + ", Vol: " + data.volume[1][index],
      day;

    return value;
  };
  if (options.xTickFormatter) {
    defaults.summary.flotr.xaxis.tickFormatter = options.xTickFormatter;
  }
  defaults.price.flotr.yaxis.tickFormatter = options.yTickFormatter || function (n) {
    return '$' + n;
  };

  price = new V.Child(defaults.price);
  volume = new V.Child(defaults.volume);
  connection = new V.Child(defaults.connection);
  summary = new V.Child(defaults.summary);

  // Render visualization
  vis
    .add(price)
    .add(volume)
    .add(connection)
    .add(summary)
    .render(options.container);

  // Define the selection zooming interaction
  selection
    .follower(price)
    .follower(volume)
    .follower(connection)
    .leader(summary)
    .add(V.action.selection, options.selectionCallback ? { callback : options.selectionCallback } : null);

  // Define the mouseover hit interaction
  hit
    .group([price, volume])
    .add(V.action.hit);

  // Optional initial selection
  if (options.selection) {
    summary.trigger(summary, 'select', options.selection);
  }

  // Members
  this.vis = vis;
  this.selection = selection;
  this.hit = hit;
  this.price = price;
  this.volume = volume;
  this.summary = summary;
}

V.templates.Finance = Finance;

})();

(function () {

var
  V = envision,
  Zoom;

function defaultsZoom () {
  return {
    name : 'zoom',
    flotr : {}
  };
}

function defaultsSummary () {
  return {
    name : 'summary',
    flotr : {
      handles : { show : true },
      selection : { mode : 'x'}
    }
  };
}

function getDefaults (options, defaults) {
  var o = _.defaults(options, defaults);
  o.flotr = _.defaults(o.flotr, defaults.flotr);
  return o;
}

Zoom = function (options) {

  var
    vis = new V.Visualization(),
    zoom = new V.Child(getDefaults(options.zoom || {}, defaultsZoom())),
    summary = new V.Child(getDefaults(options.summary || {}, defaultsSummary())),
    interaction = new V.Interaction({leader : summary});

  vis
    .add(zoom)
    .add(summary);

  interaction.add(V.action.selection);
  interaction.follower(zoom);

  this.vis = vis;
  this.interaction = interaction;

  if (options.container) {
    this.render(options.container);
  }
};

Zoom.prototype = {
  render : function (container) {
    this.vis.render(container);
  }
};

V.templates.Zoom = Zoom;

})();
