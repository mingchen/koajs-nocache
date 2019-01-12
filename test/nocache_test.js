const Koa = require('koa');
const Router = require('koa-router');
const request = require('supertest');
const nocache = require('..');

describe('Test nocache middleware', function() {
  it('should return no-cache headers with use middleware', function(done) {
    let app = new Koa();
    app.use(nocache());
    app.use(function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    request(app.callback()).get('/api/foo')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate')
      .expect('Pragma', 'no-cache')
      .end(done);
  });

  it('should return no-cache headers with router middleware', function(done) {
    var app = new Koa();
    var router = new Router();

    router.get('/api/bar', nocache(), function(ctx) {
      ctx.body = { foo: 'bar' };
    });

    app
      .use(router.routes())
      .use(router.allowedMethods());

    request(app.callback()).get('/api/bar')
      .expect(200)
      .expect('Expires', '0')
      .expect('Cache-Control', 'no-cache, no-store, must-revalidate')
      .expect('Pragma', 'no-cache')
      .end(done);
  });
});
