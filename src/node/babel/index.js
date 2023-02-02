const { parse } = require('@babel/parser')
const { default: generate } = require('@babel/generator')

let code = `var name = 'justorez'`
let ast = parse(code)
let targetCode = generate(ast)
console.log(targetCode)
// console.log(ast.program.body[0])
