// Highly customized version of fixed length Dequeu
// to be used in this extension
export class Deque<T> {
  private items: T[];
  constructor(private maxlen: number) {
    this.items = [];
  }

  public push(item: T) {
    if (this.maxlen === 0) {
      return;
    }

    if (this.items.length == this.maxlen) {
      this.items.shift();
    }

    this.items.push(item);
  }

  public getSecondLast(): T | null {
    if (this.items.length < 2) {
      return null;
    }

    return this.items[this.items.length - 2];
  }
}
