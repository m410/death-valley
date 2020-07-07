export interface PageRequest {
  sort: string[];
  order: Order;
  start: number;
  size: number;
}

export enum Order {
  Asc,
  Desc
}
