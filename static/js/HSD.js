(function () {

var BODY                = 'body',
    CLICK               = 'click',

    CN_LISTING          = '.listing',
    CN_SNIPPET          = '.snippet',
    CN_TOGGLE           = '.toggle',
    S_TOGGLE            = 'div.listing .toggle',

// HSD declared above
HSD = {

  toggleListing : function (element) {

    var
      listing = $(element).closest(CN_LISTING),
      snippet = listing.find(CN_SNIPPET),
      button  = listing.find(CN_TOGGLE);

    if (snippet.is(':visible')) {
      button.text('(show)');
      snippet.hide();
    } else {
      button.text('(hide)');
      snippet.show();
    }
  }

};


function init () {

  // Toggle Snipett
  $('body').delegate(S_TOGGLE, CLICK, handleListingToggle);

  // PrettyPrint
  prettyPrint();
}

function handleListingToggle (e) {
  HSD.toggleListing(e.target);
}

// Namespacing
window.HSD = HSD;


// Initialize
init();


})();
