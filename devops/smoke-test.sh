set -x
export $(grep -v '^#' .env | xargs)

echo "Smoke testing against ${TEST_BASE_URL} ..."

echo "=== Get Public key==="
curl --request GET \
  ${TEST_BASE_URL}/get-pub-key  

echo "=== Test Charge==="
curl --header "Content-Type: application/json" --request POST \
  --data '{ "amount": "1000", "token": "tok_visa", "description": "Test Charge", "email": "smoke-test@host.com" }' \
  ${TEST_BASE_URL}/create-charge
