export default class DoublyLinkedListNode<T> {
  constructor(
    public value: T,
    public next: DoublyLinkedListNode<T> | null = null,
    public previous: DoublyLinkedListNode<T> | null = null
  ) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString<C extends (value: T) => string>(callback?: C): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
