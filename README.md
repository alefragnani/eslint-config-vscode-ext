# eslint-config-vscode-ext

This module is an ESLint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs.html) for TypeScript, to be used with VS Code extensions.

## Installation

Requires Node.js `^20.19.0`, `^22.13.0`, or `>=24` and ESLint 10.

```sh
npm install --save-dev eslint@^10 eslint-config-vscode-ext @typescript-eslint/parser@^8.71.1 @typescript-eslint/eslint-plugin@^8.71.1 typescript@^5.3.3
```

## Usage

Create an `eslint.config.cjs` in your project root:

```js
module.exports = [
    ...require('eslint-config-vscode-ext')
];
```

Add a script to your `package.json`, replacing `src` with your source folder:

```json
{
    "scripts": {
        "lint": "eslint \"src/**/*.ts\""
    }
}
```

Run it with `npm run lint`. This flat config replaces the legacy `.eslintrc` / `eslintConfig` setup and exports an array; spread it into your config before any project-specific overrides.

## Development

Install dependencies with `npm ci` and run the test suite with `npm test`.

## Support

If you find it useful, please consider supporting it.

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=BR&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani