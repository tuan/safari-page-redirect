import React from 'react';
import redirectSettingsStorage from '@root/src/shared/storages/redirectSettingsStorage';
import useStorage from '@root/src/shared/hooks/useStorage';
import RedirectionList from './RedirectionList';
import TestContextProvider from './TestContextProvider';
import Test from './Test';
import { RedirectionsContextProvider } from './RedirectionsContextProvider';
import ActionBar from './ActionBar';

const Options: React.FC = () => {
  const { redirections } = useStorage(redirectSettingsStorage);

  return (
    <TestContextProvider>
      <RedirectionsContextProvider initialRedirections={redirections}>
        <div className="flex flex-col p-5">
          <RedirectionList />
          <Test />
          <ActionBar />
        </div>
      </RedirectionsContextProvider>
    </TestContextProvider>
  );
};

export default Options;
