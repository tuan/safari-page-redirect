import { PropsWithChildren } from 'react';
import { useState } from 'react';
import TestContext from './TestContext';
import { useEffect } from 'react';
import { SecondLastTabRequestMessage } from '@root/src/shared/types';
import { getUrl } from '@root/src/shared/utils';

type Props = PropsWithChildren & {};
const TestContextProvider = ({ children }: Props) => {
  const [testUrl, setTestUrl] = useState('');

  useEffect(() => {
    const secondLastTabRequest: SecondLastTabRequestMessage = {
      request: 'second_last_tab',
    };
    browser.runtime
      .sendMessage(secondLastTabRequest)
      .then(({ tabId }) => {
        if (tabId == null) {
          return null;
        }

        return browser.tabs.get(tabId);
      })
      .then(tab => {
        setTestUrl(getUrl(tab));
      });
  }, []);

  return <TestContext.Provider value={{ testUrl, setTestUrl }}>{children}</TestContext.Provider>;
};

export default TestContextProvider;
