module.exports = function() {
  return function nocache(ctx, next) {
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    ctx.set('Expires', '0');
    ctx.set('Pragma', 'no-cache');

    next();
  };
};
