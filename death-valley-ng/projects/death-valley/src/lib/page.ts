export interface Page<T> {
  content: T[];
  pageStart: number;
  pageSize: number;
  totalElements: number;
}
