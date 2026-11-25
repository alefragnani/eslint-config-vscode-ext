'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const manifest = require('../package.json');

test('package entry point and dependencies resolve', () => {
    assert.equal(manifest.name, 'eslint-config-vscode-ext');
    assert.ok(manifest.main, 'package must declare an entry point');
    const config = require(root);
    assert.ok(Array.isArray(config));
    assert.ok(config.some(entry => entry.languageOptions?.parser?.meta.name === 'typescript-eslint/parser'));
    assert.ok(config.some(entry => entry.plugins?.['@typescript-eslint'] === require('@typescript-eslint/eslint-plugin')));
    assert.doesNotThrow(() => require('@typescript-eslint/eslint-plugin'));
    assert.doesNotThrow(() => require('eslint'));
});

test('documented flat config works with the ESLint CLI', t => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), 'eslint-config-vscode-ext-'));
    t.after(() => fs.rmSync(project, { recursive: true, force: true }));
    fs.mkdirSync(path.join(project, 'node_modules'));
    fs.symlinkSync(root, path.join(project, 'node_modules', manifest.name), 'junction');
    fs.mkdirSync(path.join(project, 'src'));
    fs.writeFileSync(path.join(project, 'eslint.config.cjs'), `
module.exports = [
    ...require('eslint-config-vscode-ext'),
    { rules: { eqeqeq: 'off' } }
];
`);
    fs.writeFileSync(path.join(project, 'src', 'example.ts'), 'export const equal: boolean = 1 == 1;\n');
    const cli = path.join(root, 'node_modules', 'eslint', 'bin', 'eslint.js');
    execFileSync(process.execPath, [cli, 'src/**/*.ts'], { cwd: project, encoding: 'utf8' });
    fs.writeFileSync(path.join(project, 'src', 'example.ts'), 'export const value: any = 1;\n');
    const output = execFileSync(process.execPath, [cli, 'src/**/*.ts', '--format', 'json'], {
        cwd: project,
        encoding: 'utf8'
    });
    const [result] = JSON.parse(output);
    assert.ok(result.messages.some(message => message.ruleId === '@typescript-eslint/no-explicit-any' && message.severity === 1));
});

test('published package contains its entry point and documentation', () => {
    const output = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
        cwd: root,
        encoding: 'utf8',
        shell: process.platform === 'win32'
    });
    const [pack] = JSON.parse(output);
    assert.equal(pack.name, manifest.name);
    assert.equal(pack.version, manifest.version);
    const files = pack.files.map(file => file.path);
    for (const required of ['package.json', manifest.main.replace(/^\.\//, ''), 'README.md', 'LICENSE.md']) {
        assert.ok(files.includes(required), `package is missing ${required}`);
    }
    assert.ok(!files.some(file => file.startsWith('test/')), 'tests should not be published');
    assert.ok(!files.some(file => file.startsWith('.github/')), 'CI configuration should not be published');
});
