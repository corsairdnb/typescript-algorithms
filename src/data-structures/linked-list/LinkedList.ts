import LinkedListNode from './LinkedListNode';

export default class LinkedList<T> {
  public head: LinkedListNode<T> | null = null;

  public tail: LinkedListNode<T> | null = null;

  append(value: T): void {
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
