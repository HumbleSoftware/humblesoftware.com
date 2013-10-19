var
  BaseApp = require('rendr/shared/app'),
  handlebarsHelpers = require('./lib/handlebarsHelpers'),
  _ = require('underscore');

module.exports = BaseApp.extend({

  defaults : _.extend(BaseApp.prototype.defaults, {
    title : 'humble software development'
  }),

  postInitialize: function() {
    this.templateAdapter.registerHelpers(handlebarsHelpers);
  },

  start: function() {
    var router = this.router;
    // Show a loading indicator while fetching:
    this
      .listenTo(router, 'action:start', function () { this.set({loading: true}); })
      .listenTo(router, 'action:end', function () { this.set({loading: false}); });
    // Call super:
    BaseApp.prototype.start.call(this);
  }

});
