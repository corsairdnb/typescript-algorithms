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

  prepend(value: T): DoublyLinkedList<T> {
    const node = new DoublyLinkedListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return this;
    }
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
    return this;
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

  delete(value: T): DoublyLinkedListNode<T> | null {
    let deleted: DoublyLinkedListNode<T> | null = null;
    let currentNode = this.head;
    while (currentNode) {
      if (this.compare.equals(currentNode.value, value)) {
        deleted = currentNode;
        if (currentNode.previous) {
          currentNode.previous.next = currentNode.next;
        } else {
          this.head = currentNode.next;
        }
        if (currentNode.next) {
          currentNode.next.previous = currentNode.previous;
        } else {
          this.tail = currentNode.previous;
        }
      }
      currentNode = currentNode.next;
    }
    return deleted;
  }

  deleteTail(): DoublyLinkedListNode<T> | null {
    if (!this.tail) {
      return null;
    }
    if (this.tail === this.head) {
      const deletedNode = this.tail;
      this.tail = null;
      this.head = null;
      return deletedNode;
    }
    const deletedNode: DoublyLinkedListNode<T> = this.tail;
    this.tail = this.tail.previous;
    if (this.tail) {
      this.tail.next = null;
    }
    return deletedNode;
  }

  deleteHead(): DoublyLinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }
    if (this.head === this.tail) {
      const deletedNode = this.head;
      this.head = null;
      this.tail = null;
      return deletedNode;
    }
    const deletedNode = this.head;
    this.head = this.head.next;
    if (this.head) {
      this.head.previous = null;
    }
    return deletedNode;
  }

  fromArray(array: T[]): DoublyLinkedList<T> {
    array.forEach((value) => {
      this.append(value);
    });
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
