const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
  let stripe = stripe_client(ctx.secrets.stripe_secret_key)
  let stripeProductId = ctx.secrets.stripe_product_id

  stripe.products.retrieve(stripeProductId)
    .then((product) => {
      cb(null, product)
    })
    .catch(cb)
}
