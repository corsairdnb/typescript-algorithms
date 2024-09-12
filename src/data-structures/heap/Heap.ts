import Comparator from '../../utils/comparator/Comparator';

export default class Heap<T extends number> {
  compare: Comparator<T>;

  constructor(comparatorFunction: Comparator<T>) {
    if (new.target === Heap) {
      throw new Error('Cannot create Heap directly');
    }

    this.compare = new Comparator(comparatorFunction);
  }

  peek(): T | null {
    return null;
  }

  isEmpty(): boolean {
    return true;
  }
}
