var babel = require('@babel/core')

var code = `num => num ** 2`

babel.transform(
    code,
    {
        plugins: [
            '@babel/plugin-transform-arrow-functions',
            '@babel/plugin-transform-exponentiation-operator'
        ]
    },
    function (err, result) {
        if (err) return console.error(err)
        console.log(result.code)
    }
)
