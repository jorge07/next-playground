const express = require('express');
const next = require('next');
const config = require('./config');
const app = next({ dir: config.PAGES_PATH, dev: true });
const Router = require('./routing');

app.prepare().then(new Router(express, config, app));
