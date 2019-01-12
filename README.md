# koa-nocache

[![Build Status](https://travis-ci.org/mingchen/koa-nocache.svg?branch=master)](https://travis-ci.org/mingchen/koa-nocache)

[![NPM](https://nodei.co/npm/koa-nocache.png?downloads=true)](https://nodei.co/npm/koa-nocache/)


## Introduction

A node `koajs` middleware which add no-cache related headers for all the express response to disable caches.
It is useful for REST API response, add no-cache headers to avoid browsers cache request response.

The following headers are added to response header:

    Cache-Control: no-cache, no-store, must-revalidate
    Expires: 0
    Pragma: no-cache


## Install

    npm install koajs-nocache

## Usage

    const nocache = require('koajs-nocache');

    app = new Koa();
    app.use(nocache());

or use you can only add no-cache headers to specific requests with `router`:

    const nocache = require('koajs-nocache');
    router.get('/foo',
               nocache(),
               function(ctx, next) {
        ctx.body = ...;
    });

Checkout `test/nocache_test.js` for example usages.

## License

MIT
