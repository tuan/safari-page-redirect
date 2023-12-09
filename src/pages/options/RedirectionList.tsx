import RedirectionItem from './RedirectionItem';
import { useContext } from 'react';
import { RedirectionsContext } from './RedirectionsContextProvider';
import { Redirection } from '@root/src/shared/types';

const RedirectionList = () => {
  const { update, redirections } = useContext(RedirectionsContext);
  function handleItemChange(index: number, redirection: Partial<Redirection>) {
    update(index, redirection);
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        {redirections.map((redirection, index) => (
          <div key={redirection.id}>
            <RedirectionItem index={index} redirection={redirection} onChange={r => handleItemChange(index, r)} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedirectionList;
