import * as Koa from 'koa';

declare function nocache(options?: {
    methods?: Array<string>
}): Koa.Middleware;

export = nocache;
