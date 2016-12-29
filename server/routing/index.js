exports = module.exports = class {

    constructor(server, config, app)  {

        this.server = server;

        this.handler = app.getRequestHandler();
        this.render = new (require('../cache/render'))(app, server.get('ssrCache'));

        // Middleware
        server.use(function(req, res, next) {
            global.navigator = {
                userAgent: req.headers['user-agent']
            };
            next();
        });

        // Use the `renderAndCache` utility defined below to serve pages
        server.get('/', (req, res) => {
            this.render.hit(req, res, '/', { header: req.header('user-agent') })
        });

        server.get('*', (req, res) => {
            return this.handler(req, res)
        });

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost' + config.PORT)
        });
    }
};
