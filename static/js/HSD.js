(function () {

var BODY                = 'body',
    CLICK               = 'click',

    CN_LISTING          = '.listing',
    CN_LISTING_TOGGLE   = '.listing-show, .listing-hide',
    CN_LISTING_SHOW     = '.listing-show',
    CN_LISTING_HIDE     = '.listing-hide',

// HSD declared above
HSD = {

  toggleListing : function (listing) {

    listing = $(listing).closest(CN_LISTING);
    if (!listing.hasClass(CN_LISTING)) throw "Not a listing.";

  }

};


function init () {
  $('body').delegate(CN_LISTING_TOGGLE, CLICK, handleListingToggle);
}

function handleListingToggle (e) {
  HSD.toggleListing(e.target);
  console.log(e);
}

// Namespacing
window.HSD = HSD;


// Initialize
init();


})();
