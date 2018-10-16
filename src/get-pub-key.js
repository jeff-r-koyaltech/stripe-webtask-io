
module.exports = function(ctx, cb) {
    cb(null, {
        stripe_published_key: ctx.secrets.stripe_published_key || 'NADA'
    })
}