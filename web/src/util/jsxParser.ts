interface JsxObjType {
  type: string
  children: JsxObjType[]
  props: { [propName: string]: string }
  innerHTML?: string
  click?: () => null
}

interface JsxObjWrapperType {
  nextCheckIndex: number
  JSXobj: JsxObjType
}

interface ExtractedFunctionType {
  strWithoutFunc: string
  func: () => any
}

// Right now, in cases such as
// <div>
//    <p> test </p>
//    test2
// </div>
// which innerHTML comes after children tag are not handled.
// wrap it in a HTML tag or place before children tag

// ------------------
// [MASTER FUNCTION]
// ------------------
export const JSXstrToHTML = ($parent: HTMLElement, JSXstr: string) => {
  const processedJSXstr = splitStrByArrowBracket(JSXstr)
  const { JSXobj } = JSXstrToJSXobj(processedJSXstr)
  return JSXobjToHTML($parent, JSXobj)
}

export const isClosingTag = (str: string): boolean => str?.[0] === '/'
export const removeQuotes = (str: string): string =>
  str?.replace(/"/g, '').replace(/'/g, '')
//remove tab, newline, form feed > replace multiple space to one
export const cleanUpText = (str: string): string =>
  str.replace(/\f|\n|\r|\t/g, '').replace(/\s\s+/g, ' ')

// Split JSX string by tags and remove whitespace
export const splitStrByArrowBracket = (JSXstr: string): string[] => {
  return JSXstr.split('<').reduce((acc, str) => {
    const trimmedStr = str.trim()
    if (trimmedStr) {
      acc.push(trimmedStr)
    }
    return acc
  }, [])
}

export const extractFunction = (
  srcStr: string,
  funcName: string,
): ExtractedFunctionType => {
  const startIndex = srcStr.indexOf(funcName)
  if (startIndex === -1) return { func: null, strWithoutFunc: srcStr }

  const endIndex = srcStr.lastIndexOf('}')
  const funcStr = srcStr.slice(startIndex, endIndex)
  const funcStartIndex = funcStr.indexOf('{')

  return {
    strWithoutFunc: cleanUpText(
      srcStr.slice(0, startIndex - 1) +
        srcStr.slice(endIndex + 1, srcStr.length),
    ),
    func: eval(funcStr.slice(funcStartIndex + 1, endIndex)),
  }
}

export const JSXstrToJSXobj = (
  htmlStrArr: string[],
  checkIndex = 0,
): JsxObjWrapperType => {
  const newJSXobj: JsxObjType = { type: '', children: [], props: {} }
  const currentLine = htmlStrArr[checkIndex]
  let newJSXobjWrapper
  if (isClosingTag(currentLine)) {
    return {
      nextCheckIndex: checkIndex + 1,
      JSXobj: null,
    }
  } else {
    newJSXobjWrapper = JSXstrToJSXobj(htmlStrArr, checkIndex + 1)
    // loop until MY closing tag appears
    while (true) {
      // children element exists
      if (newJSXobjWrapper.JSXobj !== null) {
        newJSXobj.children.push(newJSXobjWrapper.JSXobj)
        newJSXobjWrapper = JSXstrToJSXobj(
          htmlStrArr,
          newJSXobjWrapper.nextCheckIndex,
        )
      }
      // closing tag immediately returns without JSXobj
      else break
    }
  }

  // Handling onClick to change to a function
  const { func, strWithoutFunc } = extractFunction(currentLine, 'onClick')
  func && (newJSXobj.click = func)

  // [strWithoutFunc current status]: div className="test"> hello world
  const [propsStr, innerHTML] = strWithoutFunc.split('>')
  innerHTML && (newJSXobj.innerHTML = innerHTML.trim())

  // Extract type and other properties
  const [type, ...propsStrSplit] = propsStr.split(' ')
  newJSXobj.type = type
  propsStrSplit.forEach((prop) => {
    const [propName, propValue] = prop.split('=')
    propName && (newJSXobj.props[propName] = removeQuotes(propValue))
  })

  return {
    nextCheckIndex: newJSXobjWrapper.nextCheckIndex,
    JSXobj: newJSXobj,
  }
}

export const JSXobjToHTML = ($parent: HTMLElement, JSXobj: JsxObjType) => {
  const $element = document.createElement(JSXobj.type)
  JSXobj.click && ($element.click = JSXobj.click)
  JSXobj.innerHTML && ($element.innerHTML = JSXobj.innerHTML)

  for (const propName in JSXobj.props) {
    $element.setAttribute(propName, JSXobj.props[propName])
  }
  JSXobj.children.forEach((childObj) => JSXobjToHTML($element, childObj))

  $parent.appendChild($element)
  return $element
}
