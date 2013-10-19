var
  config = require('../config/demos'),
  _ = require('underscore');

module.exports = {
  index : function (params, callback) {
    this.app.set({
      title : 'hsd - demos'
    });
    callback(null, {
      demos : config
    });
  },
  demo : function (params, callback) {
    console.log(params.demo);
    var demo = _.findWhere(config, {slug : params.demo});
    this.app.set({
      title : 'demos - ' + demo.slug
    });
    callback(null, { demo : demo });
  }
};
