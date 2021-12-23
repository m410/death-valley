import {Constraint} from "./constraint";

export interface FieldConstraints {
  name: string;
  constraints: Array<Constraint>;
}
