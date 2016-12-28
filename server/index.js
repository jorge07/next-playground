const express = require('express');
const next = require('next');
const config = require('./config');
const LRUCache = require('lru-cache');
const app = next({ dir: config.PAGES_PATH, dev: process.env.NODE_ENV !== 'production'});
const Router = require('./routing');
const server = express();

if (process.env.NODE_ENV === 'production') {

    //This is where we cache our rendered HTML pages
    server.set('ssrCache', new LRUCache({
        max: config.CACHE_MAX,
        maxAge: config.CACHE_MAX_AGE
    }));
}

app
    .prepare()
    .then(
        new Router(server, config, app)
    )
;
