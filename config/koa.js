'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let compress = require('koa-compress')
let hbs = require('koahub-handlebars')
let logger = require('koa-logger')
let scss = require('koa.sass')
let serve = require('koa-static')





module.exports = function (app, config) {

  /****************************************************************************\
    Set up middleware
  \****************************************************************************/

  app.use(logger())
  app.use(compress())

  // Handlebars template rendering
  app.use(hbs.middleware({
    defaultLayout: 'root',
    layoutsPath: './templates',
    viewPath: './templates'
  }))

  // SCSS compiling
  app.use(serve('./static'))
}
