import { useContext } from 'react';
import { RedirectionsContext } from './RedirectionsContextProvider';
import { useState } from 'react';

const ActionBar = () => {
  const [showSavingIndicator, setShowSavingIndicator] = useState(false);
  const { add, persist } = useContext(RedirectionsContext);

  function handleSave() {
    persist();

    setShowSavingIndicator(true);
    setTimeout(() => {
      setShowSavingIndicator(false);
    }, 250);
  }

  return (
    <div className="flex gap-5 mt-5">
      <button className={styles.button} onClick={add}>
        Add New Rule
      </button>
      <button className={styles.button} onClick={handleSave} disabled={showSavingIndicator}>
        {showSavingIndicator ? 'Saved!' : 'Save'}
      </button>
      <button className={styles.button} onClick={window.close}>
        Close
      </button>
    </div>
  );
};

const styles = {
  button:
    'py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none',
};

export default ActionBar;
