var View = require('../base');

module.exports = View.extend({
  className : 'demo',
  getTemplateData : function () {
    return this.options.demo;
  },
  postRender : function () {
    console.log(this);
    console.log(this.options.demo);
    require(this.options.demo.script).init();
  }
});
module.exports.id = 'demos/demo';
