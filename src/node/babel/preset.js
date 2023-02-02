var babel = require('@babel/core')
var code = `num => {
   const offset = 23;
   return num ** 2 + offset;
}`
babel.transform(
    code,
    {
        // '@babel/preset-env' 可简写
        presets: ['@babel/env'] 
    },
    function (err, result) {
        if (err) return console.error(err)
        console.log(result.code)
    }
)
