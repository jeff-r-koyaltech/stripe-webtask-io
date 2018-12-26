const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
  let stripe = stripe_client(ctx.secrets.stripe_secret_key)

  stripe.products.list({ active: true })
    .then((products) => {
      cb(null, products)
    })
    .catch(cb)
}
