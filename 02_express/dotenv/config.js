(function () {
  require('dotenv/lib/main').config(
    Object.assign(
      {},
      require('node_modules/dotenv/lib/env-options'),
      require('node_modules/dotenv/lib/cli-options')(process.argv)
    )
  )
})()
