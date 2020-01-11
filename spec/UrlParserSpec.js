describe("UrlParser", function() {
    it("should parse front page url correctly", function() {
        const parser = new UrlParser("https://reddit.com/");

        expect(parser.isOnFrontPage).toBeTruthy();
        expect(parser.isInComments).toBeFalsy();
        expect(parser.subreddit).toEqual('');
    });

    it("should not get confused by front page subpages", function () {
        const parser = new UrlParser("http://reddit.com/hot");

        expect(parser.isOnFrontPage).toBeTruthy();
        expect(parser.isInComments).toBeFalsy();
        expect(parser.subreddit).toEqual('');
    })

    it("should parse subreddit url correctly", function() {
        const parser = new UrlParser("http://np.reddit.com/r/all/top");

        expect(parser.isOnFrontPage).toBeFalsy();
        expect(parser.isInComments).toBeFalsy();
        expect(parser.subreddit).toEqual('all');
    })

    it("should detect when url points to comments", function() {
        const parser = new UrlParser("https://www.reddit.com/r/pics/comments/92dd8/test_post_please_ignore/");

        expect(parser.isInComments).toBeTruthy();
    })
});