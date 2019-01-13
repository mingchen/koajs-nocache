/**
 * nocache middleware.
 *
 * @param {Object} [options]
 *  - {String|Array} methods need add nocache headers.
 *                   default is ['GET']
 *
 * @return {Function} nocache middleware
 */
module.exports = function nocache(options) {
  options = options || {};
  let methods = options.methods;
  if (!methods) {
    methods = ['GET'];
  }

  if (typeof methods === 'string') {
    methods = [methods];
  }

  return async function nocacheMiddleware(ctx, next) {
    if (methods.includes(ctx.method)) {
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      ctx.set('Expires', '0');
      ctx.set('Pragma', 'no-cache');
    }

    await next();
  };
};
