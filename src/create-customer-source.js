const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
    let body = ctx.body
    let stripe = stripe_client(ctx.secrets.stripe_secret_key)

    upsertCustomer(body.owner.email, body.source.id, stripe)
      .then((customer) => {
        cb(null, customer)
      })
      .catch(cb)
  }
  
  const upsertCustomer = (email, sourceId, stripe) => {
    return new Promise((resolve, reject) => {
      stripe.customers.list({ email: email, limit: 1 })
        .then((resp) => {
          if (resp.data.length === 1) {
            stripe.customers.update(resp.data[0].id, {
              description: 'Customer for ' + email,
              source: sourceId })
              .then((customer) => {
                resolve(customer)
              })
              .catch((error) => { reject(error) })
          } else {
            stripe.customers.create({
              description: 'Customer for ' + email,
              email: email,
              source: sourceId })
              .then((customer) => {
                resolve(customer)
              })
              .catch((error) => { reject(error) })
          }
        })
        .catch((error) => { reject(error) })
    })
  }