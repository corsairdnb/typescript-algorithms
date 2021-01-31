import LinkedListNode from './LinkedListNode';
import Comparator from './Comparator';
import IComparator, { CompareFn } from './IComparator';

export default class LinkedList<T> {
  public head: LinkedListNode<T> | null = null;

  public tail: LinkedListNode<T> | null = null;

  public compare: IComparator<T>;

  constructor(readonly compareFn?: CompareFn) {
    this.compare = new Comparator<T>(compareFn);
  }

  prepend(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<T>(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  append(value: T): LinkedList<T> {
    const newNode = new LinkedListNode<T>(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    return this;
  }

  find<C extends (value?: T) => string>({
    value,
    callback
  }: {
    value?: T;
    callback?: C;
  }): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let currentNode: LinkedListNode<T> | null = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      if (value !== undefined && this.compare.equals(currentNode.value, value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  delete(value: T): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while (this.compare.equals(this.head?.value, value)) {
      deletedNode = this.head;
      if (this.head) {
        this.head = this.head.next;
      }
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode?.next) {
        if (this.compare.equals(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equals(this.tail?.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  deleteTail(): LinkedListNode<T> | null {
    const deleted = this.tail;
    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
      return deleted;
    }

    let currentNode = this.head;

    while (currentNode?.next) {
      if (!currentNode?.next?.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deleted;
  }

  deleteHead(): LinkedListNode<T> | null {
    const deleted = this.head;

    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
      return deleted;
    }

    if (this.head?.next) {
      this.head = this.head.next;
    }

    return deleted;
  }

  reverse(): LinkedList<T> {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  fromArray(array: T[]): LinkedList<T> {
    array.forEach((value) => this.append(value));
    return this;
  }

  toArray(): LinkedListNode<T>[] {
    let node = this.head;
    const array = [];

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
