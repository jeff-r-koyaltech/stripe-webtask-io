const stripe_client = require('stripe')

module.exports = function(ctx, cb) {
    let body = ctx.body
    let stripe = stripe_client(ctx.secrets.stripe_secret_key)

    upsertSubscriptionInternal(ctx.query.customerId, ctx.query.planId,
        body.quantity, stripe)
      .then((subscription) => {
        cb(null, subscription)
      })
      .catch(cb)
  }
  
  const upsertSubscriptionInternal = (customerId, planId, quantity, stripe) => {
    return new Promise((resolve, reject) => {
      stripe.customers.retrieve(customerId)
        .then((customer) => {
          if (customer.subscriptions.data.length === 0) {
            let subCreateObj = {
              customer: customerId,
              items: [{
                plan: planId,
                quantity: quantity
              }]
            }
            stripe.subscriptions.create(subCreateObj)
              .then((subscription) => {
                resolve(subscription)
              })
              .catch((error) => { reject(error) })
          } else {
            let subscription = customer.subscriptions.data[0]
            if (subscription.items.data.length > 0) {
              let subItem = subscription.items.data[0]
              let subUpdateObj = {
                items: [
                  {
                    id: subItem.id,
                    plan: planId,
                    quantity: quantity
                  }
                ]
              }
              stripe.subscriptions.update(subscription.id, subUpdateObj)
                .then((subscription) => {
                  resolve(subscription)
                })
                .catch((error) => { reject(error) })
            } else {
              reject(new Error('Unexpected Subscriber configuration. We are working on the problem.'))
            }
          }
        })
        .catch((error) => { reject(error) })
    })
  }