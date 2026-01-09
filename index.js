/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

'use strict'
module.exports = {
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.ts'
                ]
            }
        },
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts'
            ]
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/no-non-null-assertion': 1,
        "indent": ["error", 4, { "SwitchCase": 1 }],
			"no-tabs": "error",
            "semi": ["error", "always"],
            "no-unexpected-multiline": "error",
        'eqeqeq': 2
    }
};