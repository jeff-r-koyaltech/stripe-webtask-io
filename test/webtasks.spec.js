require('dotenv').config()

const client = require('./test-client').default

const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-string'))


describe("Webtask.io", () => {
    describe("Customers and Sources", () => {

        it("Should upsert a customer with a default, specified payment source.", () => {
            let ownerObj = {
                owner: {
                  name: "Smoke Test",
                  address: {
                    line1: "123 Smoky Ln",
                    city: "Gatlinburg",
                    state: "NC",
                    postal_code: "37738",
                    country: "USA"
                  },
                  email: "smoke-test@host.com"
                }
            }

            return client.upsertCustomerWithSource("tok_visa", ownerObj)
                .then((result) => {
                    testingCustomerId = result.customer.id
                    expect(result.customer.id).to.startsWith('cus_')
                    expect(result.source).to.equal('tok_visa')
                })
        })
    })

    describe("Products and Plans", () => {
        it("Should list more than one product", () => {
            return client.getProducts()
                .then((products) => {
                    expect(products).to.not.be.null
                    expect(products.data).to.not.be.null
                    expect(products.data.length).to.be.above(1)
                })
        })
    })
})
