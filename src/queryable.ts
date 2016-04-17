enum SortDirection {
  Ascending,
  Descending
}

interface ISortInfo {
  propertyName: string,
  sortDirection: SortDirection;
}

export interface IQueryable<T> {
  where(expression: (item: T) => boolean): IQueryable<T>;
  sortBy(propertyName: string): IOrderedQueryable<T>;
  sortByDescending(propertyName: string): IOrderedQueryable<T>;
  skip(startIndex: number): IQueryable<T>;
  take(itemsToReturn: number): IQueryable<T>;
}

export interface IOrderedQueryable<T> extends IQueryable<T> {
  thenBy(propertyName: string): IOrderedQueryable<T>;
  thenByDescending(propertyName: string): IOrderedQueryable<T>;
}

export class Queryable<T> implements IQueryable<T>, IOrderedQueryable<T> {

  private _data: Array<T>;
  private _startIndex: number = 0;
  private _itemsToReturn: number = null;

  private _sortProperties: Array<ISortInfo> = [];
  private _filterExpressions: Array<(item: T) => boolean> = [];

  public constructor(data: Array<T>) {
    if (data === null || data === undefined) {
      throw new Error("data should not be null or undefined");
    }

    this._data = data;
  }

  public where(expression: (item: T) => boolean): IQueryable<T>{
    this._filterExpressions.push(expression);
    return this;
  }

  public sortBy(propertyName: string): IOrderedQueryable<T> {
    this._sortProperties = [{ propertyName: propertyName, sortDirection: SortDirection.Ascending }];
    return this;
  }

  public sortByDescending(propertyName: string): IOrderedQueryable<T> {
    this._sortProperties = [{ propertyName: propertyName, sortDirection: SortDirection.Descending }];
    return this;
  }

  public thenBy(propertyName: string): IOrderedQueryable<T> {
    this._sortProperties.push({ propertyName: propertyName, sortDirection: SortDirection.Ascending });
    return this;
  }

  public thenByDescending(propertyName: string): IOrderedQueryable<T> {
    this._sortProperties.push({ propertyName: propertyName, sortDirection: SortDirection.Descending });
    return this;
  }

  public skip(startIndex: number): IQueryable<T> {
    this._startIndex = startIndex;
    return this;
  }

  public take(itemsToReturn: number): IQueryable<T> {
    this._itemsToReturn = itemsToReturn;
    return this;
  }

  public toArray(): Array<T> {

    let sortedArray = this._sortArray(this._data);

    if (this._itemsToReturn !== null) {
      return sortedArray.slice(this._startIndex, this._startIndex + this._itemsToReturn);
    }
    return sortedArray.slice(this._startIndex);
  }

  private _sortArray(array: Array<T>): Array<T> {
    let sortedArray = array;

    if (this._sortProperties.length === 0) {
      return array;
    }

    let sortProperty = this._sortProperties[0].propertyName;
    let sortDirection = this._sortProperties[0].sortDirection;

    sortedArray = sortedArray.sort((postA: any, postB: any) => {

      if (postA[sortProperty] > postB[sortProperty]) {
        if (sortDirection === SortDirection.Descending) {
          return -1;
        }
        return 1;
      }
      else if (postA[sortProperty] < postB[sortProperty]) {
        if (sortDirection === SortDirection.Descending) {
          return 1;
        }
        return -1;
      }
      else {
        return 0;
      }
    });

    return sortedArray;
  }
}
