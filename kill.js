console.debug("running manually")
registerBodyObserver();
killFrontPage();


const HIDDEN_STYLE = 'position: absolute; height: 0px; overflow: hidden;';
function hideElement(element) {
    // Note: Going the easy route and just setting 'display: none' sends a reddit's script
    // into some sort of infinite loop, eating up lots of CPU.
    element.setAttribute('style', HIDDEN_STYLE);
}

function isElementHidden(element) {
    return container.getAttribute('style') === HIDDEN_STYLE;
}


// New front page
function killFrontPage() {
    let container = document.querySelector("div.ListingLayout-outerContainer");
    if (!container) {
        console.debug("Could not find front page container")
        return;
    }

    if (!isElementHidden(container)) {
        hideElement(container);

	    // Check again in 2 seconds. SPA with tons of JS makes things quite unpredictable, so let's be safe here.
	    setTimeout(killFrontPage, 2000);
    }
}

function registerBodyObserver() {
    // We're going to listen to changes on our container, so we can check if the
    // url has changed.
    // The only other way to do this without a timer (that actually works with
    // new Reddit) is to use the extensions WebNavigation API, but that requires a background
    // script and way broader and scarier permissions than we want to get.
    var oldUrl = document.location.href;

    var observer = new MutationObserver(function() {
        if (oldUrl != document.location.href) {
            oldUrl = document.location.href;
            killFrontPage();
        }
    });

    observer.observe(document.getElementById("2x-container"), {childList: true, subtree: true});
}
