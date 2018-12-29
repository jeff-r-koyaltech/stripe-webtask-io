const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
    let body = ctx.body
    let stripe = stripe_client(ctx.secrets.stripe_secret_key)

    let chargeReq = {
        amount: body.amount,
        currency: body.currency || 'usd',
        customer: body.customerId,
        source: body.sourceId,
        description: body.description,
        statement_descriptor: body.statement_descriptor
      }

    stripe.charges.create(chargeReq)
        .then((result) => cb(null, result))
        .catch(cb)
}