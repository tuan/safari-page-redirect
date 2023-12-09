This Safari Web Extension allows you to configure redirection for any website using regular expression.

# Features

- Per-page auto-redirection control. You can have page auto-redirected in the background or manually by clicking the extension icon.
- Clicking a page that has no pre-existing redirection configuration triggers Options page.
- Directly test your matching rules on the Options page.
- Advanced features:
  - Use regular expressions and capture groups for powerful matching rules.
  - Use $1, $2, etc. in the destination URL to reference captured groups.

# Example redirection rules
|                                         	| Origin                          	| Destination                             	|
|-----------------------------------------	|---------------------------------	|-----------------------------------------	|
| Wikipedia Homepage -> English Wikipedia 	| `https://(www\.)?wikipedia\.org$` 	| `https://en.wikipedia.org/wiki/Main_Page` 	|
| Facebook Homepage -> Facebook Groups    	| `https://www.facebook.com$`       	| `https://www.facebook.com/groups/feed/`   	|
| Twitter -> New York Times               	| `https://twitter.com/home`        	| `https://www.nytimes.com`                 	|


# Installation
- Use XCode with Safari App Template to generate an extension project.
- Clone this project and install dependencies with `pnpm i`
- Build the project with `pnpm build`
- Replace the files in XCode Extension's Resource folder with resource  from `dist/` folder
- Run the project in XCode with Command + R

This extension is also available in App Store for a fee to cover App Store Account annual fee.

# Privacy Policy
This extension does not collect and share your data. The redirection rules configured by you are stored in your browser's local storage.

