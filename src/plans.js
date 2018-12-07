const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
    let body = ctx.body
    let stripe = stripe_client(ctx.secrets.stripe_secret_key)

    stripe.plans.list({ product: ctx.query.productId })
        .then((plans) => {
            cb(null, plans)
        })
        .catch(cb)
}
