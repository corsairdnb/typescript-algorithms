import LinkedList from '../linked-list/LinkedList';

const defaultSize = 32;

export default class HashTable<T, K extends string, Item extends { key: K; value: T }> {
  buckets: LinkedList<Item>[];

  constructor(readonly size = defaultSize) {
    this.buckets = Array(size).fill(new LinkedList<Item>());
  }

  hash(key: K): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  get(key: K): T {
    const hash = this.hash(key);
  }

  set(key: K, value: T): void {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];
    const node = bucket.find({value, callback: (item) => item.key === key});
    if (node) {
      node.value.value = value;
    } else {
      bucket.append({ key, value });
    }
  }

  has(key: K): boolean {
    const hash = this.hash(key);
    return Boolean(this.buckets[hash]);
  }

  delete(key: K): T {}
}
