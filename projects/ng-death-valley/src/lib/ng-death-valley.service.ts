import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

import {Observable} from 'rxjs';
import {JAVAX_CONSTRAINT_FACTORIES} from './javax-validations';


export class BeanConstraintBuilder {

  constructor(
    private data: Observable<EntityConstraints>,
    private constraintFactories: Array<FormControlConstraintFactory>) {
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
    this.data.subscribe((entity: EntityConstraints) => {
      entity.fields.filter(fieldConstraint => fieldConstraint.constraints.length > 0)
        .forEach(fieldConstraint => this.applyConstraint(form, fieldConstraint));

      form.updateValueAndValidity();
    });
  }

  applyConstraint(form: FormGroup, fieldConstraint: FieldConstraints) {
    if (form.contains(fieldConstraint.name)) {
      form.controls[fieldConstraint.name].setValidators(fieldConstraint.constraints.map(cnstrnt =>
        this.constraintFactories.find(f => f.name === cnstrnt.name).make(cnstrnt)
      ));
    }
    else {
      console.log('WARN: adding validation without property: ' + fieldConstraint.name);
      // or throw exception
      form.addControl(fieldConstraint.name, new FormControl('', {
        validators: fieldConstraint.constraints.map(cnstrnt =>
          this.constraintFactories.find(f => f.name === cnstrnt.name).make(cnstrnt)
        )
      }));
    }
  }
}

export interface EntityConstraints {
  className: string;
  fields: Array<FieldConstraints>;
}

export interface FieldConstraints {
  name: string;
  constraints: Array<Constraint>;
}

export interface Constraint {
  name: string;
  message: string;
  regex?: string;
  min?: number;
  max?: number;
}


@Injectable()
export class BeanValidatorService {
  constraintFactories = JAVAX_CONSTRAINT_FACTORIES;

  builder(data: Observable<EntityConstraints>) {
    return new BeanConstraintBuilder(data, this.constraintFactories);
  }

  addConstraintFactory<T>(constraint: FormControlConstraintFactory) {
    this.constraintFactories.push(constraint);
  }
}


export interface FormControlConstraintFactory {
  name: string;

  make(constraint: Constraint): (fc: AbstractControl) => { [key: string]: any };
}


