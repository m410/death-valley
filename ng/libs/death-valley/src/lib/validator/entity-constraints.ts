import {FieldConstraints} from "./field-constraints";

export interface EntityConstraints {
  className: string;
  fields: Array<FieldConstraints>;
}
