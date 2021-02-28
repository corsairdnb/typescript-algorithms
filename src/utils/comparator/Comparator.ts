import IComparator, { CompareFn, Value } from './IComparator';

export default class Comparator<T extends Value> implements IComparator<T> {
  compare: CompareFn;

  constructor(readonly compareFn?: CompareFn) {
    this.compare = compareFn || this.defaultCompareFn;
  }

  defaultCompareFn(a?: T, b?: T): number {
    if (a === b) {
      return 0;
    }

    if (a && b) {
      return a < b ? -1 : 1;
    }

    return 0;
  }

  equals(a?: T, b?: T): boolean {
    return this.compare(a, b) === 0;
  }

  lessThan(a?: T, b?: T): boolean {
    return this.compare(a, b) < 0;
  }

  greaterThan(a?: T, b?: T): boolean {
    return this.compare(a, b) > 0;
  }

  lessThanOrEqual(a?: T, b?: T): boolean {
    return this.lessThan(a, b) || this.equals(a, b);
  }

  greaterThanOrEqual(a?: T, b?: T): boolean {
    return this.greaterThan(a, b) || this.equals(a, b);
  }

  reverse(): void {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
