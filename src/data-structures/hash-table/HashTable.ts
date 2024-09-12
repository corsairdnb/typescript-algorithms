import LinkedList from '../linked-list/LinkedList';
import LinkedListNode from '../linked-list/LinkedListNode';

const defaultSize = 32;

export default class HashTable<V, K extends string> {
  buckets: LinkedList<V>[];

  keys: { [key: string]: number } = {};

  constructor(readonly size = defaultSize) {
    this.buckets = Array(size)
      .fill(null)
      .map(() => new LinkedList<V>()); // TODO: why?
  }

  hash(key: K): number {
    const hash = Array.from(key).reduce((acc, keySymbol) => acc + keySymbol.charCodeAt(0), 0);

    return hash % this.buckets.length;
  }

  set(key: K, value: V): void {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (!node) {
      // Insert new node.
      bucketLinkedList.append({ key, value });
    } else {
      // Update value of existing node.
      node.value.value = value;
    }
  }

  /**
   * @param {string} key
   * @return {*}
   */
  delete(key: K): LinkedListNode<V> | null {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * @param {string} key
   * @return {*}
   */
  get(key: K): V {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {string} key
   * @return {boolean}
   */
  has(key: K): boolean {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * @return {string[]}
   */
  getKeys(): string[] {
    return Object.keys(this.keys);
  }

  /**
   * Gets the list of all the stored values in the hash table.
   *
   * @return {*[]}
   */
  getValues(): V[] {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray().map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}
