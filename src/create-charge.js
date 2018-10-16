const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
    let body = ctx.body
    let stripe = stripe_client(ctx.secrets.stripe_secret_key)

    let chargeReq = {
        amount: body.amount,
        currency: body.currency || 'usd',
        source: body.token,
        description: body.description,
        receipt_email: body.email
    }

    stripe.charges.create(chargeReq)
        .then((result) => cb(null, result))
        .catch(cb)
}