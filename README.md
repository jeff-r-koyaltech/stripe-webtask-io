# Usage

- git clone ...
- yarn install --production=false
- yarn run init (and sign into webtask.io with your credentials)
- yarn run deploy (note the BASE URL for your account, and provide in .env, as well as your Stripe published and secret test keys)
- yarn run smoke-test


# Features

- Stripe one-time payment by source/token
- Secure storage and retrieval of published stripe key
- Isolates the secret key away from your front-end
