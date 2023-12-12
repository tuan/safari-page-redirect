This Safari Web Extension allows you to configure redirection for any website using regular expression.

# Features

- Per-page auto-redirection control. You can have page auto-redirected in the background or manually by clicking the extension icon.
- Clicking a page that has no pre-existing redirection configuration triggers Options page.
- Directly test your matching rules on the Options page.
- Command+Shift+L to trigger manual redirection
- Advanced features:
  - Use regular expressions and capture groups for powerful matching rules.
  - Use $1, $2, etc. in the destination URL to reference captured groups.

# Example redirection rules
|                                         	| Origin                            	| Destination                               	|
|-----------------------------------------	|-----------------------------------	|-------------------------------------------	|
| Wikipedia Homepage -> English Wikipedia 	| `https://(www\.)?wikipedia\.org$` 	| `https://en.wikipedia.org/wiki/Main_Page` 	|
| Facebook Homepage -> Facebook Groups    	| `https://www.facebook.com$`       	| `https://www.facebook.com/groups/feed/`   	|
| Youtube -> Invidious                  	| `https://www.youtube.com/watch\?v=(\w{11})`| `https://yewtu.be/watch?v=$1`           |
| Twitter -> New York Times               	| `https://twitter.com/home`        	| `https://www.nytimes.com`                 	|
| `@reddit` to search reddit.com     | `^https://www.google.com/search\?.*q=(.+?)\+?(?:%40\|&)reddit\b` | `https://www.google.com/search?q=$1+site%3Areddit.com` |
| `@hn` to search hackernews | `^https://www.google.com/search\?.*q=(.+?)\+?(?:%40\|&)hn\b` | `https://www.google.com/search?q=$1+site%3Anews.ycombinator.com` |


# Installation
- Use XCode with Safari App Template to generate an extension project.
- Clone this project and install dependencies with `pnpm i`
- Build the project with `pnpm build`
- Replace the files in XCode Extension's Resource folder with resource  from `dist/` folder
- Run the project in XCode with Command + R

This extension is also available in App Store for a fee to cover App Store Account annual fee.

<a href="https://apps.apple.com/us/app/page-redirect/id6474048733?mt=12&amp;itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-mac-app-store/black/en-us?size=250x83&amp;releaseDate=1702080000" alt="Download on the Mac App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>

# Privacy Policy
This extension does not collect and share your data. The redirection rules configured by you are stored in your browser's local storage.

