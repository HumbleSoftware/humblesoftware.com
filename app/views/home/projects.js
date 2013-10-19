var View = require('../base');
module.exports = View.extend({
  className : 'projects',
  initialize : function () {
    View.prototype.initialize.apply(this, arguments);
    console.log('here');
    return this;
  }
});
module.exports.id = 'home/projects';
