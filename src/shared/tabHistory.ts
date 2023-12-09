import { Deque } from './history';

const history = new Deque<number>(2);

export function addToTabHistory(tabId: number) {
  history.push(tabId);
}

export function getSecondLastTabInHistory(): number | null {
  return history.getSecondLast();
}
