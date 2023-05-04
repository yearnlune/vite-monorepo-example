export type UUID36 = string;

export type Nullable<T> = T | null;

export interface SortBase {
  property: string;
  direction: 'asc' | 'desc';
}
