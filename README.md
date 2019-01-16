# koajs-nocache

[![Build Status](https://travis-ci.org/mingchen/koajs-nocache.svg?branch=master)](https://travis-ci.org/mingchen/koajs-nocache)

[![NPM](https://nodei.co/npm/koajs-nocache.png?downloads=true)](https://nodei.co/npm/koajs-nocache/)


## Introduction

A node `koajs` middleware which add no-cache related headers for all the `koajs` response to disable caches.
It is useful for REST API response, add no-cache headers to avoid browsers cache request response. Only `GET` response have no-cache headers by default.

The following headers are added to response header:

    Cache-Control: no-cache, no-store, must-revalidate
    Expires: 0
    Pragma: no-cache

## Install

    npm install koajs-nocache

## API

nocache(options):

    /**
     * nocache middleware.
     *
     * @param {Object} [options]
     *                 - {String|Array} methods need add nocache headers.
     *                                  default is ['GET']
     *
     * @return {Function} nocache middleware
     */

## Usage

Add no-cache related headers to all the `GET` responses:

    const nocache = require('koajs-nocache');

    app = new Koa();
    app.use(nocache());

or use you can only add no-cache headers to specific requests with `koa-router`:

    const nocache = require('koajs-nocache');

    router.get('/foo',
               nocache(),
               function(ctx, next) {
        ctx.body = ...;
    });

Checkout `test/nocache_test.js` for example usages.

## License

[MIT](LICENSE.txt)

