# eslint-config-vscode-ext

This module is an ESLint [shareable config](https://eslint.org/docs/developer-guide/shareable-configs.html) for TypeScript to be used in VS Code extensions.

## Installation

```
$ npm install --save-dev eslint eslint-config-vscode-ext @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## Usage

Add some ESLint config to your package.json (or `.eslintrc`):

```json
{
	"name": "my-vscode-extension",
	"eslintConfig": {
		"extends": [
			"vscode-ext"
		]
	}
}
```

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