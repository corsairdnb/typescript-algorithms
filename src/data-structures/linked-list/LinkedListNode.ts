export default class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }

  toString<C extends (value: T) => string>(callback?: C): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
