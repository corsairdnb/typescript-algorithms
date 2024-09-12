import LinkedList from '../linked-list/LinkedList';

export default class Stack<T> {
  linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  isEmpty(): boolean {
    return Boolean(!this.linkedList.head);
  }

  push(value: T): void {
    this.linkedList.prepend(value);
  }

  pop(): T | null {
    return this.linkedList.deleteHead()?.value || null;
  }

  peek(): T | null {
    return this.linkedList.head?.value || null;
  }

  toArray(): T[] {
    return this.linkedList.toArray().map((node) => node.value);
  }

  toString(callback?: (value: T) => string): string {
    return this.linkedList.toString(callback);
  }
}
