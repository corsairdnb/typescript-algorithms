import LinkedList from '../linked-list/LinkedList';

export default class Queue<T> {
  linkedList: LinkedList<T>;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  isEmpty(): boolean {
    return Boolean(!this.linkedList.head);
  }

  enqueue(value: T): void {
    this.linkedList.append(value);
  }

  dequeue(): T | null {
    return this.linkedList.deleteHead()?.value || null;
  }

  peek(): T | null {
    return this.linkedList.head?.value || null;
  }

  toString(fn?: (value: T) => string): string {
    return this.linkedList.toString(fn);
  }
}
