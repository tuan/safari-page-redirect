import { useContext } from 'react';
import TestContext from './TestContext';

const Test = () => {
  const { testUrl, setTestUrl } = useContext(TestContext);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label htmlFor="test-input">Enter a test URL to test all your rules: </label>
      <input
        type="text"
        placeholder="Example: https://www.wikipedia.org"
        name="test-input"
        id="test-input"
        value={testUrl}
        onChange={({ target }) => setTestUrl(target.value)}
        className={`flex-1 ${styles.input} `}
      />
    </div>
  );
};

const styles = {
  input:
    'py-1 px-2 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none',
};

export default Test;
