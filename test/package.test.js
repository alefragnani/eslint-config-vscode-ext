'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const manifest = require('../package.json');

test('package entry point and dependencies resolve', () => {
    assert.equal(manifest.name, 'eslint-config-vscode-ext');
    assert.ok(manifest.main, 'package must declare an entry point');
    const config = require(root);
    assert.equal(config.parser, require.resolve('@typescript-eslint/parser'));
    assert.ok(config.plugins.includes('@typescript-eslint'));
    assert.doesNotThrow(() => require('@typescript-eslint/eslint-plugin'));
    assert.doesNotThrow(() => require('eslint'));
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
