const axios = require('axios')

const baseUrl = process.env.TEST_BASE_URL
const pubApiKey = process.env.stripe_published_key

const createCardCharge = (data) => {
  return new Promise((resolve, reject) => {
    let url = `${baseUrl}/create-charge`
    console.log(url)
    axios.post(url, data)
      .then(function (res) {
          console.log(res)
        resolve(res.data.id)
      })
      .catch((error) => reject(error))
  })
}

const upsertCustomerWithSource = (source, owner) => {
  return new Promise((resolve, reject) => {
    let req = {
      source: source,
      owner: owner.owner
    }
    axios.post(`${baseUrl}/create-customer-source`, req)
      .then((res) => {
        resolve({ customer: res.data, source: source })
      })
      .catch((error) => reject(error))
  })
}

const upsertSubscription = (customerId, planId, quantity) => {
  return new Promise((resolve, reject) => {
    let req = {
      quantity: quantity
    }
    axios.put(`${baseUrl}/subscription?customerId=${customerId}&planId=${planId}`, req)
      .then(function (res) {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })
}

const getProduct = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/product`)
      .then(function (res) {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })
}

const getProducts = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/products`)
      .then(function (res) {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })
}

const getPlansByProductId = (productId) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/plans?productId=${productId}`)
      .then(function (res) {
        resolve(res.data)
      })
      .catch((error) => reject(error))
  })
}

exports.default = {
    baseUrl,
    pubApiKey,
  
    createCardCharge,
  
    upsertCustomerWithSource,
    upsertSubscription,
    getProduct,
    getProducts,
    getPlansByProductId
  }
