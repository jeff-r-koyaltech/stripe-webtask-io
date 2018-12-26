set -x
export $(grep -v '^#' .env | xargs)

export WT_BIN='./node_modules/wt-cli/bin/wt'

$WT_BIN create --secret stripe_secret_key=${stripe_secret_key} src/create-charge.js
$WT_BIN create --secret stripe_secret_key=${stripe_secret_key} --secret stripe_product_id=${stripe_product_id} src/product.js
$WT_BIN create --secret stripe_secret_key=${stripe_secret_key} src/plans.js
$WT_BIN create --secret stripe_secret_key=${stripe_secret_key} src/create-customer-source.js
$WT_BIN create --secret stripe_secret_key=${stripe_secret_key} src/subscription.js
$WT_BIN create --secret stripe_secret_key=${stripe_secret_key} src/products.js
