set -x
export $(grep -v '^#' .env | xargs)

wt create --secret stripe_secret_key=${stripe_secret_key} src/create-charge.js
wt create src/get-pub-key.js --secret stripe_published_key=${stripe_published_key}
