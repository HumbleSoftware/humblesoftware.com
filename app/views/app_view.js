var BaseAppView = require('rendr/shared/base/app_view');

var $body = $('body');
var $title = $('title');

module.exports = BaseAppView.extend({
  postInitialize : function() {
    this.app.on('change:title', function (app, title) {
      $title.text(title);
    });
    this.app.on('change:loading', function(app, loading) {
      $body.toggleClass('loading', loading);
    }, this);
  },
  getTemplateData : function () {
    return {
      title : this.get('title') || 'humble software development'
    };
  }
});
