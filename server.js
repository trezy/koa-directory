'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

const Koa = require('koa')
const router = require('koa-route')

const app = new Koa()





/******************************************************************************\
  Defaults
\******************************************************************************/

let defaultPort = 3000





/******************************************************************************\
  Initialize the app
\******************************************************************************/

// Configure middleware, et al
require('./config/koa')(app)





/******************************************************************************\
  Initialize the router
\******************************************************************************/

// Configure
require('./config/router')(app)





/******************************************************************************\
  Start the server
\******************************************************************************/

console.log('')
console.log(`Listening on port ${process.env.PORT || defaultPort}`)
console.log('-------------------------------------------------------------------------------')
console.log('')

app.listen(defaultPort)
