const HIDDEN_STYLE = 'position: absolute; height: 0px; overflow: hidden;';
const urlParser = new UrlParser(window.location.href);
var options = {};

function hideElement(element) {
    // Note: Going the easy route and just setting 'display: none' sends a reddit's script
    // into some sort of infinite loop, eating up lots of CPU.
    element.setAttribute('style', HIDDEN_STYLE);
}

function isElementHidden(element) {
    return element.getAttribute('style') === HIDDEN_STYLE;
}

// New front page
function killBrowsePage() {
    let container = document.querySelector("div.ListingLayout-outerContainer");
    if (!container) {
        console.debug("Could not find front page container")
        return;
    }

    if (!isElementHidden(container)) {
        hideElement(container);

	    // Check again in 2 seconds. SPA with tons of JS makes things quite unpredictable, so let's be safe here.
	    setTimeout(killBrowsePage, 2000);
    }
}

function hideElementOld(element) {
    element.setAttribute('style', 'display: none');
}

function killBrowsePageOld() {
    const chooseCountry = document.querySelector("div.menuarea");
    chooseCountry && hideElementOld(chooseCountry);

    const trendingSubreddits = document.querySelector("div.trending-subreddits");
    trendingSubreddits && hideElementOld(trendingSubreddits);

    if (window.location.href.indexOf("comments") === -1) {
        const mainContent = document.getElementById("siteTable");
        mainContent && hideElementOld(mainContent);
    }
}

function killMoreFromThisCommunity() {
    var xpath = "//div[text()='More posts from the ']";
    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!matchingElement) {
        console.debug("Could not find the 'More posts from the ... community' section");
        return;
    }

    if (!isElementHidden(matchingElement.parentElement)) {
        hideElement(matchingElement.parentElement);
        setTimeout(killMoreFromThisCommunity, 2000);
    }
}

function killMoreFromThisCommunityOld() {
    const moreFromSpacer = document.querySelector("div.spacer.seo-comments");
    moreFromSpacer && hideElementOld(moreFromSpacer);

    const moreFromContent = document.querySelector("div.spacer.seo-comments-recommendations");
    moreFromContent && hideElementOld(moreFromContent);

    const commentsContinued = document.getElementById("bottom-comments");
    commentsContinued && hideElementOld(commentsContinued);
}

function killReadNextOld() {
    const readNextContainer = document.querySelector("div.read-next-container");
    readNextContainer && hideElementOld(readNextContainer);
}

function killTopbarSubredditsListOld() {
    const srList = document.querySelector("div.sr-list");
    srList && hideElementOld(srList);

    const srMoreLink = document.getElementById("sr-more-link");
    srMoreLink && hideElementOld(srMoreLink);
}

function killMySubredditsDropdown() {
    const el = document.querySelector("div[aria-label='Start typing to filter your communities or use up and down to select.']");
    if (el && !isElementHidden(el)) {
        hideElement(el);
        setTimeout(killMySubredditsDropdown, 2000);
    }
}

function killMySubredditsDropdownOld() {
    const xpath = "//span[text()='my subreddits']/..";
    const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (matchingElement) {
        hideElementOld(matchingElement);
    }
}

function loadOptions() {
    chrome.storage.sync.get(["options"], function(result) {
        options = result.options || {};
        kill();
    });
}

function registerBodyObserver() {
    // We're going to listen to changes in our container, so we can check if the
    // url has changed.
    // The only other way to do this without a timer (that actually works with
    // new Reddit) is to use the WebExtensions webNavigation API, but that requires a background
    // script and way broader and scarier permissions than we want to get.
    var oldUrl = document.location.href;

    var observer = new MutationObserver(function() {
        if (oldUrl != document.location.href) {
            urlParser.url = document.location.href;
            kill();
        }
    });

    const container = document.getElementById("2x-container"); 
    container && observer.observe(container, {childList: true, subtree: true});
}

function kill() {
    if (options.block_frontpage && urlParser.isOnFrontPage ||
        options.block_r_all && urlParser.subreddit === 'all' ||
        options.block_r_popular && urlParser.subreddit === 'popular' ||
        options.block_all_subreddits && urlParser.subreddit) {

        killBrowsePage();
        killBrowsePageOld();
    }

    if (options.block_more_from_this_community && urlParser.isInComments) {
        killMoreFromThisCommunity();
        killMoreFromThisCommunityOld();
    }

    if (options.block_read_next_box && urlParser.isInComments) {
        killReadNextOld();
    }

    if (options.block_topbar_subreddits_list) {
        killTopbarSubredditsListOld();
    }

    if (options.block_my_subreddits_dropdown) {
        killMySubredditsDropdown();
        killMySubredditsDropdownOld();
    }
}

loadOptions();
registerBodyObserver();
