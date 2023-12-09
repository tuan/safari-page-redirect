export async function redirect(url: string) {
  browser.tabs.update({ url, active: true });
}

export function computeFinalUrl(url: string, regex: RegExp, replacement: string): string {
  const [matched] = regex.exec(url);

  return matched.replace(regex, replacement);
}

export function isEmptyOrWhiteSpace(str: string) {
  return str === null || str.trim().length === 0;
}

// this removes trailing `/` ,e.g https://google.com/
export function getUrl(tab: browser.tabs.Tab | null): string | null {
  return (tab?.url ?? '').endsWith('/') ? tab.url.slice(0, -1) : tab.url;
}
