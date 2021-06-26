import Post from '@web/components/Post'
// index.js

function component() {
  var $element = document.createElement('div')

  /* lodash is required for the next line to work */
  new Post({ $parent: $element })
  return $element
}

document.body.appendChild(component())
