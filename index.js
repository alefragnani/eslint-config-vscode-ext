/*---------------------------------------------------------------------------------------------
*  Copyright (c) Alessandro Fragnani. All rights reserved.
*  Licensed under the MIT License. See License.md in the project root for license information.
*--------------------------------------------------------------------------------------------*/

'use strict';

const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');

module.exports = [
    js.configs.recommended,
    ...typescript.configs['flat/recommended'],
    {
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
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 0,
            '@typescript-eslint/no-unused-vars': 1,
            '@typescript-eslint/no-explicit-any': 1,
            '@typescript-eslint/no-non-null-assertion': 1,
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            'no-tabs': 'error',
            'semi': ['error', 'always'],
            'no-unexpected-multiline': 'error',
            'eqeqeq': 2
        }
    }
];