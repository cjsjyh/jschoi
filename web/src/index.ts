// index.js

function component() {
  var element = document.createElement('div')

  /* lodash is required for the next line to work */
  element.innerHTML = 'test inner2'

  return element
}

document.body.appendChild(component())
