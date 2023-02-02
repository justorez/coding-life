const { parse } = require('@babel/parser')
const { default: generate } = require('@babel/generator')
const t = require('@babel/types') // 操作单个 AST 节点
const { default: traverse } = require('@babel/traverse') // 遍历 AST，实现批量操作

/**
 * 将代码里的 findEleById 替换为 document.getElementById
 */
var orginCode = `findEleById("jz")` // 原始代码

// 生成原始 AST
var originAST = parse(orginCode, {
    sourceType: 'module'
})

// 对 AST 进行遍历并操作
traverse(originAST, {
    Identifier(path) {
        var { node } = path
        // 找到 findEleById，将其替换成为目标节点
        if (node && node.name === 'findEleById') {
            var newNode = t.memberExpression(
                t.identifier('document'),
                t.identifier('getElementById')
            ) 
            // 创建目标节点
            path.replaceWith(newNode) // 替换原始节点
            path.stop()
        }
    }
})

// 将转换后的 AST 生成目标代码
const targetCode = generate(
    originAST,
    {
        /* options */
    },
    orginCode
) 

console.log(targetCode)
