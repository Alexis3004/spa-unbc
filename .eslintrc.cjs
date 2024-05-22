/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['vue'],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        eqeqeq: 'off',
        'space-before-function-paren': [
            'error',
            {
                // "always", "never", or "ignore"
                anonymous: 'always', // anonymous is for anonymous function expressions (e.g. function () {}).
                named: 'ignore', // named is for named function expressions (e.g. function foo () {}).
                asyncArrow: 'always' // asyncArrow is for async arrow function expressions (e.g. async () => {}).
            }
        ]
    }
}
