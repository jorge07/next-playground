exports = module.exports = class {

    constructor(app, ssrCache) {
        this.app = app;
        this.ssrCache = ssrCache;
    }

    /**
     * @param req
     * @param res
     * @param pagePath
     * @param queryParams
     */
    hit(req, res, pagePath, queryParams) {
        // If we have a page in the cache, let's serve it
        if (this.ssrCache && this.ssrCache.has(req.url)) {

            console.log(`CACHE HIT: ${req.url}`);
            res.send(this.ssrCache.get(req.url));
            return
        }

        // If not let's render the page into HTML
        this.app.renderToHTML(req, res, pagePath, queryParams)
            .then((html) => {
                // Let's cache this page
                console.log(`CACHE MISS: ${req.url}`);
                if (this.ssrCache) {
                    this.ssrCache.set(req.url, html);
                }

                res.send(html)
            })
            .catch((err) => {
                this.app.renderError(err, req, res, pagePath, queryParams)
            })
        ;
    }
}
