set -x
export $(grep -v '^#' .env | xargs)

echo "Smoke testing against ${TEST_BASE_URL} ..."

echo "=== Test Charge==="
curl --header "Content-Type: application/json" --request POST \
  --data '{ "amount": "1000", "token": "tok_visa", "description": "Test Charge", "email": "smoke-test@host.com" }' \
  ${TEST_BASE_URL}/create-charge

echo "=== Get Product==="
curl --header "Content-Type: application/json" --request GET \
  ${TEST_BASE_URL}/product

echo "=== Get Plans==="
curl --header "Content-Type: application/json" --request GET \
  ${TEST_BASE_URL}/plans?productId=${stripe_product_id}

echo "=== Create Customer Source==="
curl --header "Content-Type: application/json" --request POST \
  --data '{ "owner": { "email": "user@host.com" }, "source": { "id": "tok_visa" } }' \
  ${TEST_BASE_URL}/create-customer-source

echo "=== Upsert Subscription==="
curl --header "Content-Type: application/json" --request POST \
  --data '{ "quantity": 1 }' \
  "${TEST_BASE_URL}/subscription?customerId=${stripe_customer_id}&planId=${stripe_plan_id}"
