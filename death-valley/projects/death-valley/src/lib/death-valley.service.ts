import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

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

  populate(form: FormGroup, formData: Observable<any>) {
    // todo experimental
    return this;
  }

  applyTo(form: FormGroup) {
    this.data.subscribe((entity: EntityConstraints) => {
      entity.fields.filter(fieldConstraint => fieldConstraint.constraints.length > 0)
        .forEach(fieldConstraint => this.applyConstraint(form, fieldConstraint));
      form.updateValueAndValidity();
    }, (error: any) => {
      console.error('error applying constraints', error);
    });
  }

  applyConstraint(form: FormGroup, fieldConstraint: FieldConstraints): void {
    if (form.contains(fieldConstraint.name)) {
      form.controls[fieldConstraint.name].setValidators(fieldConstraint.constraints.map(cnstrnt =>
        // @ts-ignore
        this.constraintFactories.find(f => f.name === cnstrnt.name).make(cnstrnt)
      ));
    } else {
      console.warn('Validation without FormControl: ' + fieldConstraint.name);
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
export class DeathValleyService {
  constraintFactories = JAVAX_CONSTRAINT_FACTORIES;

  builder(data: Observable<EntityConstraints>) {
    return new BeanConstraintBuilder(data, this.constraintFactories);
  }

  addConstraintFactory<T>(constraint: FormControlConstraintFactory) {
    this.constraintFactories.push(constraint);
  }
}

export type ConstraintValidator = (fc: AbstractControl) => { [key: string]: any } | null;

export interface FormControlConstraintFactory {
  name: string;

  make(constraint: Constraint): ConstraintValidator;
}

