export interface Convoluted {
  id: number;
  name: string;
  smallNumber: number;
  largerNumber: number;
  status: Status;
  date: Date;
  email: string;
}

export enum Status {
  Open,
  Closed,
  Inbetween,
}
