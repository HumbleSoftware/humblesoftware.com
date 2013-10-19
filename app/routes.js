module.exports = function(match) {
  match('',                   'home#index');
  match('projects',           'home#projects');
  match('projects',           'home#projects');
  match('demos',              'demos#index');
  match('demos/:demo',        'demos#demo');
  match('contact',            'home#contact');
};
