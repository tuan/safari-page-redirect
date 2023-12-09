import redirectSettingsStorage from '@root/src/shared/storages/redirectSettingsStorage';
import { Redirection } from '@root/src/shared/types';
import { PropsWithChildren } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

type RedirectionContext = {
  redirections: Redirection[];
  add(): void;
  remove(index: number): void;
  update(index: number, r: Partial<Redirection>): void;
  persist(): void;
};

export const RedirectionsContext = createContext<RedirectionContext | null>(null);

export type AddAction = {
  type: 'ADD';
  params: {};
};

export type RemoveAction = {
  type: 'REMOVE';
  params: {
    index: number;
  };
};

export type UpdateAction = {
  type: 'UPDATE';
  params: {
    index: number;
    redirection: Partial<Redirection>;
  };
};

export type RedirectionContextAction = AddAction | RemoveAction | UpdateAction;

function reducer(state: Redirection[], { type, params }: RedirectionContextAction): Array<Redirection> {
  switch (type) {
    case 'ADD':
      return state.concat({ name: '', pattern: '', replacement: '', autoRedirectEnabled: false, id: Date.now() });
    case 'REMOVE': {
      const before = state.slice(0, params.index);
      const after = state.slice(params.index + 1);
      return [...before, ...after];
    }
    case 'UPDATE': {
      const before = state.slice(0, params.index);
      const after = state.slice(params.index + 1);
      const current = { ...state[params.index], ...params.redirection };
      return [...before, current, ...after];
    }
    default:
      return state;
  }
}

type Props = PropsWithChildren & {
  initialRedirections: Redirection[];
};

export function RedirectionsContextProvider({ initialRedirections, children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialRedirections);
  const context: RedirectionContext = {
    redirections: state,
    add() {
      dispatch({ type: 'ADD', params: {} });
    },
    remove(index) {
      dispatch({ type: 'REMOVE', params: { index } });
    },
    update(index, redirection) {
      dispatch({ type: 'UPDATE', params: { index, redirection } });
    },
    persist() {
      redirectSettingsStorage.saveRedirections(state);
    },
  };

  return <RedirectionsContext.Provider value={context}>{children}</RedirectionsContext.Provider>;
}
