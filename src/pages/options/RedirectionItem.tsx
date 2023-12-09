import { Redirection } from '@root/src/shared/types';
import { useContext } from 'react';
import TestContext from './TestContext';
import { computeFinalUrl, isEmptyOrWhiteSpace } from '@root/src/shared/utils';
import { RedirectionsContext } from './RedirectionsContextProvider';
import { Icon } from '@iconify/react';

type Props = {
  index: number;
  redirection: Redirection;
  onChange(redirection: Partial<Redirection>): void;
};

const RedirectionItem = ({ redirection, onChange, index }: Props) => {
  const { pattern, replacement, name, autoRedirectEnabled } = redirection;

  const { testUrl } = useContext(TestContext);
  const { remove } = useContext(RedirectionsContext);

  const testResult = computeTestResult(testUrl, pattern, replacement);

  function handleRemove() {
    remove(index);
  }

  return (
    <div className="flex items-center gap-2 justify-between mt-2 bg-gray-100 shadow-md bg-clip-border rounded-md p-1">
      <div className="flex flex-col flex-1 gap-2 mr-2 mb-2">
        <div className="flex flex-row justify-between gap-2 items-center">
          <label htmlFor="name-input">Rule name</label>
          <input
            type="text"
            placeholder="Example: wiki-en"
            value={name}
            id="name-input"
            className={`flex-1 ${styles.input}`}
            onChange={({ target }) => onChange({ name: target.value })}
          />
        </div>
        <div className="flex flex-row justify-between gap-2 items-center">
          <label htmlFor="pattern-input">Origin</label>
          <input
            type="text"
            placeholder="Example: https://www.wikipedia.org"
            value={pattern}
            id="pattern-input"
            className={`flex-1 ${styles.input}`}
            onChange={({ target }) => onChange({ pattern: target.value })}
          />
        </div>
        <div className="flex flex-row justify-between gap-2 items-center">
          <label htmlFor="replacement-input">Destination</label>
          <input
            type="text"
            placeholder="Example: https://en.wikipedia.org/wiki/Main_Page"
            value={replacement}
            id="replacement-input"
            className={`flex-1 ${styles.input}`}
            onChange={({ target }) => onChange({ replacement: target.value })}
          />
        </div>
        <div className="flex flex-row justify-between gap-2 items-center">
          <label htmlFor="autoRedirect-check" className="whitespace-nowrap">
            Auto-redirect
          </label>
          <input
            type="checkbox"
            checked={autoRedirectEnabled}
            id="autoRedirect-check"
            className={`flex-1 ${styles.input}`}
            onChange={({ target }) => onChange({ autoRedirectEnabled: !autoRedirectEnabled })}
          />
        </div>
        {testResult && (
          <p>
            Test URL is redirected to: <b>{testResult}</b>
          </p>
        )}
      </div>
      <button className={`${styles.rounded_button} mr-2`} onClick={handleRemove}>
        <Icon icon="healthicons:x-outline" width="10" height="10" />
      </button>
    </div>
  );
};

function computeTestResult(
  testUrl: string | null,
  pattern: string | null,
  replacement: string | null,
): string | undefined {
  if (isEmptyOrWhiteSpace(pattern) || isEmptyOrWhiteSpace(replacement) || isEmptyOrWhiteSpace(testUrl)) {
    return undefined;
  }

  const regex = getRegex(pattern);
  if (regex == null) {
    return undefined;
  }

  if (!regex.test(testUrl)) {
    return 'Origin does not match test URL';
  }

  const finalUrl = computeFinalUrl(testUrl, regex, replacement);
  if (regex.test(finalUrl)) {
    return 'WARNING: Infinite redirect loop because your Destination matches your Origin';
  }

  return finalUrl;
}

function getRegex(pattern: string): RegExp | null {
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
}

const styles = {
  rounded_button:
    'p-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none',
  button:
    'py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none',
  input:
    'py-1 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
};
export default RedirectionItem;
