import {
  removeQuotes,
  splitStrByArrowBracket,
  extractFunction,
  cleanUpText,
  JSXstrToJSXobj,
} from './jsxParser'

const removeQuotesCases = [
  { arg: `"className1"`, result: `className1` },
  { arg: `'className1'`, result: `className1` },
  { arg: `className1`, result: `className1` },
]
const splitStrByArrowBracketCases = [
  { arg: `<div>test</div>`, result: [`div>test`, `/div>`] },
  {
    arg: `
        <div className="header">
            <p>test</p>
        </div>
    `,
    result: [`div className="header">`, `p>test`, `/p>`, `/div>`],
  },
  {
    arg: `
        <div className="header">
            <p>test</p>
            <p className="child">test2</p>
        </div>
    `,
    result: [
      `div className="header">`,
      `p>test`,
      `/p>`,
      `p className="child">test2`,
      `/p>`,
      `/div>`,
    ],
  },
  {
    arg: `
        <div className="header">
            <p>test
                <a href="www.naver.com">go to link</a>
            </p>
        </div>
    `,
    result: [
      `div className="header">`,
      `p>test`,
      `a href="www.naver.com">go to link`,
      `/a>`,
      `/p>`,
      `/div>`,
    ],
  },
]
const extractFunctionCases = [
  {
    arg: `<div onClick={${() => console.log('test')}}>content</div>`,
    resultFunc: () => console.log('test'),
    resultStr: `<div>content</div>`,
  },
  {
    arg: `
        <a 
            href="www.naver.com" 
            onClick={${() => {
              const sum = 1 + 2
              console.log('test')
            }}}
        > go to link
        </a>
    `,
    resultFunc: () => {
      const sum = 1 + 2
      console.log('test')
    },
    resultStr: `
        <a 
            href="www.naver.com" 
        > go to link
        </a>
    `,
  },
]
describe('Utility Functions', () => {
  test.each(removeQuotesCases)('removeQuotes', ({ arg, result }) => {
    expect(removeQuotes(arg)).toBe(result)
  })
  test.each(splitStrByArrowBracketCases)(
    'splitStrByArrowBracket',
    ({ arg, result }) => {
      expect(splitStrByArrowBracket(arg)).toEqual(result)
    },
  )
  test.each(extractFunctionCases)(
    'extractFunction',
    ({ arg, resultFunc, resultStr }) => {
      const { func, strWithoutFunc } = extractFunction(arg, 'onClick')
      expect(JSON.stringify(func)).toEqual(JSON.stringify(resultFunc))
      expect(strWithoutFunc).toEqual(cleanUpText(resultStr))
    },
  )
})

const JSXstrings = [
  {
    arg: `<div></div>`,
    result: {
      type: 'div',
      children: [],
      props: {},
    },
  },
  {
    arg: `<p>test</p>`,
    result: {
      type: 'p',
      innerHTML: 'test',
      children: [],
      props: {},
    },
  },
  {
    arg: `<div className="class1">inner</div>`,
    result: {
      type: 'div',
      innerHTML: 'inner',
      props: { className: 'class1' },
      children: [],
    },
  },
  {
    arg: `<div className="class1" onClick={${() =>
      console.log(1)}}>inner</div>`,
    result: {
      type: 'div',
      props: { className: 'class1' },
      click: expect.any(Function),
      innerHTML: 'inner',
      children: [],
    },
  },
  {
    arg: `
        <div className="class1">
            <p
                onClick={${() => console.log(1)}}
            > 
                title 
            </p>
            <a href="www.naver.com"> go to link </a>
            <div className="class2">
                <p>inside</p>
            </div>
        </div>
  `,
    result: {
      type: 'div',
      props: { className: 'class1' },
      children: [
        {
          type: 'p',
          props: {},
          click: expect.any(Function),
          innerHTML: 'title',
          children: [],
        },
        {
          type: 'a',
          props: { href: 'www.naver.com' },
          innerHTML: 'go to link',
          children: [],
        },
        {
          type: 'div',
          props: { className: 'class2' },
          children: [
            {
              type: 'p',
              props: {},
              innerHTML: 'inside',
              children: [],
            },
          ],
        },
      ],
    },
  },
]
describe('JSX parsing', () => {
  test.each(JSXstrings)('JSX string to JSX obj', ({ arg, result }) => {
    const { JSXobj } = JSXstrToJSXobj(splitStrByArrowBracket(arg))
    expect(JSXobj).toEqual(result)
  })
})
