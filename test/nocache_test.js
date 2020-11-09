const Koa = require('koa');
const Router = require('koa-router');
const request = require('supertest');
const expect = require('chai').expect;
const nocache = require('..');

describe('Test nocache middleware', function() {
  it('GET should return no-cache headers with use middleware', function(done) {
    let app = new Koa();

    app.use(nocache());

    app.use(function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    request(app.callback()).get('/')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Surrogate-Control', 'no-store')
      .end(done);
  });

  it('PUT should return no-cache headers with use middleware to explicity PUT method', function(done) {
    let app = new Koa();

    app.use(nocache({methods: 'PUT'}));

    app.use(function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    request(app.callback()).put('/')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Surrogate-Control', 'no-store')
      .end(done);
  });

  it('POST should not return no-cache headers with use middleware', function(done) {
    let app = new Koa();

    app.use(nocache());

    app.use(function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    request(app.callback()).post('/')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        // Ensure header does not exist
        expect(res.headers).to.not.include.key('expires');
        expect(res.headers).to.not.include.key('cache-control');
        expect(res.headers).to.not.include.key('pragma');
        expect(res.headers).to.not.include.key('Surrogate-Control');

        done();
      });
  });


  it('GET should return no-cache headers with router middleware', function(done) {
    let app = new Koa();
    app.use(nocache());
    let router = new Router();

    router.get('/api/bar', function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    app
      .use(router.routes())
      .use(router.allowedMethods());

    request(app.callback()).get('/api/bar')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Surrogate-Control', 'no-store')
      .end(done);
  });

  it('GET should return no-cache headers as a router middleware', function(done) {
    let app = new Koa();
    let router = new Router();

    router.get('/api/bar', nocache(), function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    app
      .use(router.routes())
      .use(router.allowedMethods());

    request(app.callback()).get('/api/bar')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Surrogate-Control', 'no-store')
      .end(done);
  });

  it('POST should not return no-cache headers with router middleware', function(done) {
    let app = new Koa();
    let router = new Router();

    router.post('/api/foobar', nocache(), function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    app
      .use(router.routes())
      .use(router.allowedMethods());

    request(app.callback()).post('/api/foobar')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          done(err);
          return;
        }

        // Ensure header does not exist
        expect(res.headers).to.not.include.key('expires');
        expect(res.headers).to.not.include.key('cache-control');
        expect(res.headers).to.not.include.key('pragma');
        expect(res.headers).to.not.include.key('surrogate-control');

        done();
      });
  });

  it('POST should return no-cache headers with router middleware explicitly specify methods options', function(done) {
    let app = new Koa();
    let router = new Router();

    router.post('/api/foobar', nocache({ methods: ['POST'] }), function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    app
      .use(router.routes())
      .use(router.allowedMethods());

    request(app.callback()).post('/api/foobar')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate')
      .expect('Pragma', 'no-cache')
      .expect('Surrogate-Control', 'no-store')
      .end(done);
  });
});
