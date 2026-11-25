'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { ESLint } = require('eslint');

const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: {
        extends: [require.resolve('..')]
    }
});

async function lint(source) {
    const [result] = await eslint.lintText(source, { filePath: 'example.ts' });
    assert.equal(result.fatalErrorCount, 0, 'example must parse successfully');
    return result.messages;
}

const cases = [
    {
        rule: '@typescript-eslint/no-unused-vars',
        severity: 1,
        valid: 'export const value = 1;',
        invalid: 'const value = 1;'
    },
    {
        rule: '@typescript-eslint/no-explicit-any',
        severity: 1,
        valid: 'export const value: number = 1;',
        invalid: 'export const value: any = 1;'
    },
    {
        rule: '@typescript-eslint/no-non-null-assertion',
        severity: 1,
        valid: 'export const value = input;',
        invalid: 'export const value = input!;'
    },
    {
        rule: 'indent',
        severity: 2,
        valid: 'export function example() {\n    return 1;\n}',
        invalid: 'export function example() {\n  return 1;\n}'
    },
    {
        rule: 'no-tabs',
        severity: 2,
        valid: 'export const value = 1;',
        invalid: 'export const value = 1;\t'
    },
    {
        rule: 'semi',
        severity: 2,
        valid: 'export const value = 1;',
        invalid: 'export const value = 1'
    },
    {
        rule: 'no-unexpected-multiline',
        severity: 2,
        valid: 'const value = 1;\n[1].forEach(item => item);',
        invalid: 'const value = 1\n[1].forEach(item => item);'
    },
    {
        rule: 'eqeqeq',
        severity: 2,
        valid: 'export const equal = 1 === 1;',
        invalid: 'export const equal = 1 == 1;'
    }
];

for (const { rule, severity, valid, invalid } of cases) {
    test(`${rule} reports the configured severity`, async () => {
        const validMessages = await lint(valid);
        assert.equal(validMessages.some(message => message.ruleId === rule), false);

        const invalidMessages = await lint(invalid);
        const diagnostics = invalidMessages.filter(message => message.ruleId === rule);
        assert.ok(diagnostics.length > 0, `expected a ${rule} diagnostic`);
        assert.ok(diagnostics.every(message => message.severity === severity));
    });
}

test('indent requires four spaces for switch cases', async () => {
    const valid = await lint('switch (value) {\n    case 1:\n        break;\n}');
    const invalid = await lint('switch (value) {\ncase 1:\n    break;\n}');
    assert.equal(valid.some(message => message.ruleId === 'indent'), false);
    assert.ok(invalid.some(message => message.ruleId === 'indent'));
});

test('explicit module boundary types are not required', async () => {
    const config = await eslint.calculateConfigForFile('example.ts');
    assert.equal(config.rules['@typescript-eslint/explicit-module-boundary-types'][0], 0);
    const messages = await lint('export function example() {\n    return 1;\n}');
    assert.equal(messages.some(message => message.ruleId === '@typescript-eslint/explicit-module-boundary-types'), false);
});

test('ESLint and TypeScript recommended configs are inherited', async () => {
    const messages = await lint('debugger;\ntype Empty = {};');
    assert.ok(messages.some(message => message.ruleId === 'no-debugger' && message.severity === 2));
    assert.ok(messages.some(message => message.ruleId === '@typescript-eslint/no-empty-object-type' && message.severity === 2));
});
