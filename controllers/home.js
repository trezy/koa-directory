'use strict'

/******************************************************************************\
  GET: Show
\******************************************************************************/

module.exports.show = async function (ctx) {
  await ctx.render('home', ctx.query)
}