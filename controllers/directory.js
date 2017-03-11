'use strict'

/******************************************************************************\
  Module imports
\******************************************************************************/

let bytes = require('bytes')
let fs = require('fs')
let path = require('path')





/******************************************************************************\
  GET: Show
\******************************************************************************/

module.exports.show = async function (ctx) {
  let currentDirectory = path.resolve('.' + (ctx.query.parent ? `/${ctx.query.parent}` : ''))
  let parentDirectory = ''
  let relativePathPrefix = ''
  let structure = fs.readdirSync(currentDirectory)

  if (ctx.query.parent) {
    if (ctx.query.parent !== '/') {
      relativePathPrefix += `${ctx.query.parent}/`
    }

    if (ctx.query.parent.indexOf('/') !== -1) {
      parentDirectory = ctx.query.parent.split('/')
      parentDirectory.pop()
      parentDirectory = parentDirectory.join('/')
    } else {
      parentDirectory = '/'
    }
  }

  structure = structure.map(item => {
    let itemPath = path.resolve(currentDirectory, item)
    let stats = fs.statSync(itemPath)

    let isDirectory = stats.isDirectory()

    return {
      isDirectory: isDirectory,
      name: item,
      relativePath: `${relativePathPrefix}${item}`,
      size: bytes(stats.size)
    }
  })

  let breadcrumbs = []
  let relativePathSegments = relativePathPrefix.split('/')
  relativePathSegments = relativePathSegments.filter(segment => !!segment)

  while (relativePathSegments.length > 0) {
    let breadcrumb = {}
    let segment = relativePathSegments.shift()

    if (segment) {
      breadcrumb.name = segment

      if (relativePathSegments.length) {
        breadcrumb.path = breadcrumbs.map(bc => bc.name).concat(segment).join('/')
      }

      breadcrumbs.push(breadcrumb)
    }
  }

  await ctx.render('directory', {
    breadcrumbs,
    parentDirectory,
    structure
  })
}
