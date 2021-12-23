import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {FormControlConstraintFactory} from "./form-control-constraint-factory";
import {FieldConstraints} from "./field-constraints";
import {EntityConstraints} from "./entity-constraints";

export class BeanConstraintBuilder {
  constructor(
    private data: Observable<EntityConstraints>,
    private constraintFactories: Array<FormControlConstraintFactory>,
  ) {
  }

  removeConstraint(constraint: FieldConstraints) {
    // todo remove constraint
    return this;
  }

  addConstraint(constraint: FieldConstraints) {
    // todo add custom constraint
    return this;
  }

  ignore(fieldName: string) {
    // todo remove by name
    return this;
  }

  applyTo(form: FormGroup) {
    this.data.subscribe(
      (entity: EntityConstraints) => {
        entity.fields
          .filter(fieldConstraint => fieldConstraint.constraints.length > 0)
          .forEach(fieldConstraint => this.applyConstraint(form, fieldConstraint));
        form.updateValueAndValidity();
      },
      (error: any) => {
        // todo??
        console.error('error applying constraints', error);
      },
    );
  }

  applyConstraint(form: FormGroup, fieldConstraint: FieldConstraints) {
    if (form.contains(fieldConstraint.name)) {
      const control = form.controls[fieldConstraint.name];
      control.setValidators(
        fieldConstraint.constraints.map(cnstrnt => {
          const find = this.constraintFactories.find(f => f.name === cnstrnt.name);

          if (find) {
            return find.make(cnstrnt);
          } else {
            throw Error('No constraint by name:' + fieldConstraint.name);
          }
        }),
      );
      control.updateValueAndValidity({onlySelf: false});
    } else {
      console.warn('WARN: adding validation without property: ' + fieldConstraint.name);

      // todo disabled properties show up here
      // form.addControl(fieldConstraint.name, new FormControl('', {
      //   validators: fieldConstraint.constraints.map(cnstrnt =>
      //     this.constraintFactories.find(f => f.name === cnstrnt.name).make(cnstrnt)
      //   )
      // }));
    }
  }
}
