module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['prettier'],
    extends: ['eslint:recommended'],
    rules: {
        'prettier/prettier': 'warn',
        'no-unref': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off'
    },
    overrides: [
        {
            files: ['**/*.mjs', 'src/vue/**/*.js'],
            parserOptions: {
                sourceType: 'module'
            }
        }
    ]
}
