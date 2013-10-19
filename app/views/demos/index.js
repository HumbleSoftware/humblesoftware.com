var View = require('../base');

module.exports = View.extend({
  className : 'demos',
  getTemplateData : function () {
    return this.options.demos;
  }
});
module.exports.id = 'demos/index';
