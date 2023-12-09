import { addToTabHistory, getSecondLastTabInHistory } from '@root/src/shared/tabHistory';
import redirectSettingsStorage from '@root/src/shared/storages/redirectSettingsStorage';
import { computeFinalUrl, getUrl, isEmptyOrWhiteSpace } from '@root/src/shared/utils';
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

async function redirect(tab: browser.tabs.Tab, forceRedirect: boolean = false): Promise<boolean> {
  const redirections = await redirectSettingsStorage.getAllRedirections();
  const currentUrl = getUrl(tab);
  if (isEmptyOrWhiteSpace(currentUrl)) {
    return false;
  }
  const validRedirections = redirections.filter(
    r => !isEmptyOrWhiteSpace(r.pattern) && !isEmptyOrWhiteSpace(r.replacement),
  );

  for (const { pattern, replacement, autoRedirectEnabled } of validRedirections) {
    const regex = new RegExp(pattern);
    if (!regex.test(currentUrl)) {
      continue;
    }

    const destinationUrl = computeFinalUrl(currentUrl, regex, replacement);
    if (regex.test(destinationUrl)) {
      console.warn(`Infinite loop detected. \n Pattern: ${pattern} \n Final URL: ${destinationUrl}`);
      continue;
    }

    if (autoRedirectEnabled || forceRedirect) {
      browser.tabs.update({ url: destinationUrl, active: true });
    }

    // already found a match, it could require manual redirection
    // but we're done, skip all other rules
    return true;
  }
}

function onTabUpdated(_tabId, _changeInfo, tab: browser.tabs.Tab) {
  redirect(tab);
}
browser.tabs.onUpdated.addListener(onTabUpdated);

async function onActionClicked(tab: browser.tabs.Tab) {
  const result = await redirect(tab, true);
  if (!result) {
    browser.runtime.openOptionsPage();
  }
}

browser.action.onClicked.addListener(onActionClicked);

browser.tabs.onActivated.addListener(activeInfo => {
  addToTabHistory(activeInfo.tabId);
});

browser.runtime.onMessage.addListener((message: any, _sender, respond) => {
  if (message.request === 'second_last_tab') {
    const tabId = getSecondLastTabInHistory();
    respond({ tabId });
  }
});
