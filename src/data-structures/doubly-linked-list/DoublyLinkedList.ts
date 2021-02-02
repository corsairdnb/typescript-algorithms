import DoublyLinkedListNode from './DoublyLinkedListNode';
import IComparator, { CompareFn } from '../linked-list/IComparator';
import Comparator from '../linked-list/Comparator';

export default class DoublyLinkedList<T> {
  public head: DoublyLinkedListNode<T> | null = null;

  public tail: DoublyLinkedListNode<T> | null = null;

  public compare: IComparator<T>;

  constructor(readonly compareFn?: CompareFn) {
    this.compare = new Comparator<T>(compareFn);
  }

  append(value: T): DoublyLinkedList<T> {
    const node = new DoublyLinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }
    if (!this.head.next) {
      this.head.next = node;
      this.tail = node;
      this.tail.previous = this.head;
    } else {
      if (this.tail) {
        node.previous = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
    }
    return this;
  }

  toArray(): DoublyLinkedListNode<T>[] {
    let node = this.head;
    const array: DoublyLinkedListNode<T>[] = [];
    while (node) {
      array.push(node);
      node = node.next;
    }
    return array;
  }

  toString<C extends (value: T) => string>(callback?: C): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }
}
