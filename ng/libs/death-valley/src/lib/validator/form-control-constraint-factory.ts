import {AbstractControl} from "@angular/forms";
import {Constraint} from "./constraint";

export interface FormControlConstraintFactory {
  name: string;

  make(constraint: Constraint): (fc: AbstractControl) => { [key: string]: any } | null;
}
