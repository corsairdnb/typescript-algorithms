export type Value = any;
export type CompareFn = (a: Value, b: Value) => number;

export default abstract class IComparator<T extends Value> {
  compare: CompareFn;

  protected constructor(readonly compareFn?: CompareFn) {
    this.compare = compareFn || this.defaultCompareFn;
  }

  abstract defaultCompareFn(a?: T, b?: T): number;

  abstract equals(a?: T, b?: T): boolean;
}
