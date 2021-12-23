export interface Constraint {
  name: string;
  message: string;
  regex?: string;
  min?: number;
  max?: number;
}
