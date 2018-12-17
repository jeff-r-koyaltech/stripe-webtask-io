require('dotenv').config()

const client = require('./test-client').default

const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-string'))


describe("Webtask.io", () => {
    describe("Customers and Sources", () => {

        let testingCustomerId = null
        
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

        it("Should create a one-time charge for a known customer", () => {
            expect(testingCustomerId).to.not.be.null

            let data = {
                sourceId: "tok_visa",
                customerId: testingCustomerId || "cus_123",
                amount: 1000,
                description: "Regression testing"
              }

            return client.createCardCharge(data)
                .then((chargeId) => {
                    expect(chargeId).to.startsWith('ch_')
                })
        })
    })
})
