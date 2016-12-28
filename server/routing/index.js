exports = module.exports = class {

    constructor(server, config, app)  {

        this.server = server;

        this.handler = app.getRequestHandler();
        this.render = new (require('../cache/render'))(app, server.get('ssrCache'));

        // Use the `renderAndCache` utility defined below to serve pages
        server.get('/', (req, res) => {
            this.render.hit(req, res, '/')
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
