const BLOCKABLE_SUBPAGES = new Set(['', 'hot', 'new', 'rising', 'controversial', 'top', 'gilded']); 

class UrlParser {
    constructor(currentUrl) {
        this.url = currentUrl;
    }

    set url(newUrl) {
        function isFrontPage(urlParts) {
            return BLOCKABLE_SUBPAGES.has(urlParts[3]);
        }

        function isComments(urlParts) {
            return urlParts[5] === 'comments';
        }

        function getSubreddit(urlParts) {
            return urlParts[4] || '';
        }

        // The url might look something like
        // https://old.reddit.com/r/subname/comments/xxxx/xxxxx/
        // or
        // https://old.reddit.com/hot

        this._resetValues()
        const urlParts = newUrl.split("/");

        if (urlParts.length < 3) {
            console.error("Unexpected url format ", urlParts.length);
            return;
        }

        this._isOnFrontPage = isFrontPage(urlParts);
        this._subreddit = getSubreddit(urlParts);
        this._isInComments = isComments(urlParts);
 
        this._url = newUrl;
    }

    /** Returns empty string if the user is not in any subreddit */
    get subreddit() {
        return this._subreddit;
    }

    get isOnFrontPage() {
        return this._isOnFrontPage;
    }

    get isInComments() {
        return this._isInComments;
    }

    _resetValues() {
        this._isInComments = false;
        this._isOnFrontPage = false;
        this._subreddit = "";
    }
}