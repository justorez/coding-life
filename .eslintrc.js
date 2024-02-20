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
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        'prettier/prettier': 'warn',
        'no-unref': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-sparse-arrays': 'off',
        'no-extra-semi': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    },
    overrides: [
        {
            files: ['**/*.mjs', 'src/vue/**/*.js', '**/*.ts'],
            parserOptions: {
                sourceType: 'module'
            }
        }
    ]
}
