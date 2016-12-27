const LRUCache = require('lru-cache');

/**
 *
 * @param express
 * @param config
 * @param app
 * @constructor
 */
function Router(express, config, app) {

    const server = express();
    const handler = app.getRequestHandler();

    // This is where we cache our rendered HTML pages
    const ssrCache = new LRUCache({
        max: config.CACHE_MAX,
        maxAge: config.CACHE_MAX_AGE
    });

    /**
     * @param req
     * @param res
     * @param pagePath
     * @param queryParams
     */
    function renderAndCache(req, res, pagePath, queryParams) {
        // If we have a page in the cache, let's serve it
        if (ssrCache.has(req.url)) {
            console.log(`CACHE HIT: ${req.url}`);
            res.send(ssrCache.get(req.url));
            return
        }

        // If not let's render the page into HTML
        app.renderToHTML(req, res, pagePath, queryParams)
            .then((html) => {
                // Let's cache this page
                console.log(`CACHE MISS: ${req.url}`);
                ssrCache.set(req.url, html);

                res.send(html)
            })
            .catch((err) => {
                app.renderError(err, req, res, pagePath, queryParams)
            })
        ;
    }

    // Use the `renderAndCache` utility defined below to serve pages
    server.get('/', (req, res) => {
        renderAndCache(req, res, '/')
    });

    server.get('*', (req, res) => {
        return handler(req, res)
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost' + config.PORT)
    });

}


exports = module.exports = Router;