import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

import moment from 'moment';


export class BeanConstraintBuilder {

  constructor(
    private uri: string,
    private client: HttpClient,
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
    this.client.get(this.uri).subscribe((entity: EntityConstraints) => {
      entity.fields
        .filter(fieldConstraint => fieldConstraint.constraints.length > 0)
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
      console.log('WARN: adding form property: ' + fieldConstraint.name);
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

export interface FormControlConstraintFactory {
  name: string;

  make(constraint: Constraint): (fc: AbstractControl) => { [key: string]: any };
}

export class NotNullConstraint implements FormControlConstraintFactory {
  name = 'NotNull';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value == null ? {'notNull': {message: constraint.message}} : null;
    };
  }
}

export class NullConstraint implements FormControlConstraintFactory {
  name = 'Null';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value != null ? {'null': {message: constraint.message}} : null;
    };
  }
}

export class AssertTrueConstraint implements FormControlConstraintFactory {
  name = 'AssertTrue';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value === true ? {assertTrue: {message: constraint.message}} : null;
    };
  }
}

export class AssertFalseConstraint implements FormControlConstraintFactory {
  name = 'AssertFalse';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value === false ? {assertFalse: {message: constraint.message}} : null;
    };
  }
}

export class MinConstraint implements FormControlConstraintFactory {
  minValue = 0;
  name = 'Min';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value < this.minValue ? {min: {message: constraint.message}} : null;
    };
  }
}

export class MaxConstraint implements FormControlConstraintFactory {
  name = 'Max';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value > constraint.max ? {max: {message: constraint.message}} : null;
    };
  }
}

export class DecimalMinConstraint implements FormControlConstraintFactory {
  name = 'DecimalMin';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value < constraint.min ? {decimalMin: {message: constraint.message}} : null;
    };
  }
}

export class DecimalMaxConstraint implements FormControlConstraintFactory {
  name = 'DecimalMax';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return ctl.value > constraint.max ? {decimalMax: {message: constraint.message}} : null;
    };
  }
}

export class NegativeConstraint implements FormControlConstraintFactory {
  name = 'Negative';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return 0 >= ctl.value ? {negative: {message: constraint.message}} : null;
    };
  }
}

export class NegativeOrZeroConstraint implements FormControlConstraintFactory {
  name = 'NegativeOrZero';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return 0 > ctl.value ? {negativeOrZero: {message: constraint.message}} : null;
    };
  }
}

export class PositiveConstraint implements FormControlConstraintFactory {
  name = 'Positive';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return 0 <= ctl.value ? {positive: {message: constraint.message}} : null;
    };
  }
}

export class PositiveOrZeroConstraint implements FormControlConstraintFactory {
  name = 'PositiveOrZero';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return 0 < ctl.value ? {positiveOrZero: {message: constraint.message}} : null;
    };
  }
}

export class SizeConstraint implements FormControlConstraintFactory {
  name = 'Size';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value == null || ctl.value.toString().length < constraint.min || ctl.value.toString().length > constraint.max;
      return bad ? {size: {message: constraint.message}} : null;
    };
  }
}

export class DigitsConstraint implements FormControlConstraintFactory {
  name = 'Digits';
  private regexp = /^[0-9,.]+$/;

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return !this.regexp.test(ctl.value) ? {digits: {message: constraint.message}} : null;
    };
  }
}

export class PastConstraint implements FormControlConstraintFactory {
  name = 'Past';
  dateFormat: string;
  strict: boolean;

  constructor(dateFormat: string = 'DD/MM/YYYY', strict: boolean = true) {
    this.dateFormat = dateFormat;
    this.strict = strict;
  }

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = !moment().isAfter(moment(ctl.value, this.dateFormat, this.strict));
      return bad ? {past: {message: constraint.message}} : null;
    };
  }
}

export class PastOrPresentConstraint implements FormControlConstraintFactory {
  name = 'PastOrPresent';
  dateFormat: string;
  strict: boolean;

  constructor(dateFormat: string = 'DD/MM/YYYY', strict: boolean = true) {
    this.dateFormat = dateFormat;
    this.strict = strict;
  }

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = !moment().isSameOrAfter(moment(ctl.value, this.dateFormat, this.strict));
      return bad ? {pastOrPresent: {message: constraint.message}} : null;
    };
  }
}

export class FutureConstraint implements FormControlConstraintFactory {
  name = 'Future';
  dateFormat: string;
  strict: boolean;

  constructor(dateFormat: string = 'DD/MM/YYYY', strict: boolean = true) {
    this.dateFormat = dateFormat;
    this.strict = strict;
  }

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = !moment().isBefore(moment(ctl.value, this.dateFormat, this.strict));
      return bad ? {future: {message: constraint.message}} : null;
    };
  }
}

export class FutureOrPresentConstraint implements FormControlConstraintFactory {
  name = 'FutureOrPresent';
  dateFormat: string;
  strict: boolean;

  constructor(dateFormat: string = 'DD/MM/YYYY', strict: boolean = true) {
    this.dateFormat = dateFormat;
    this.strict = strict;
  }

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = !moment().isSameOrBefore(moment(ctl.value, this.dateFormat, this.strict));
      return bad ? {futureOrPresent: {message: constraint.message}} : null;
    };
  }
}

export class PatternConstraint implements FormControlConstraintFactory {
  name = 'Pattern';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const matches = new RegExp(constraint.regex).test(ctl.value);
      return !matches ? {pattern: {message: constraint.message}} : null;
    };
  }
}

export class NotEmptyConstraint implements FormControlConstraintFactory {
  name = 'NotEmpty';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value == null || ctl.value.toString().length === 0;
      return bad ? {notEmpty: {message: constraint.message}} : null;
    };
  }
}

export class NotBlankConstraint implements FormControlConstraintFactory {
  name = 'NotBlank';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value == null || ctl.value.toString().length === 0 || /^\s+$/.test(ctl.value.toString());
      return bad ? {notBlank: {message: constraint.message}} : null;
    };
  }
}

export class EmailConstraint implements FormControlConstraintFactory {
  name = 'Email';
  regEx = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}' +
    '\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      return !this.regEx.test(ctl.value.toString()) ? {email: {message: constraint.message}} : null;
    };
  }
}

@Injectable()
export class DeathValleyService {
  constraintFactories: Array<FormControlConstraintFactory> = [
    new NotNullConstraint(),
    new NullConstraint(),
    new AssertTrueConstraint(),
    new AssertFalseConstraint(),
    new MinConstraint(),
    new MaxConstraint(),
    new DecimalMinConstraint(),
    new DecimalMaxConstraint(),
    new NegativeConstraint(),
    new NegativeOrZeroConstraint(),
    new PositiveConstraint(),
    new PositiveOrZeroConstraint(),
    new SizeConstraint(),
    new DigitsConstraint(),
    new PastConstraint(),
    new PastOrPresentConstraint(),
    new FutureOrPresentConstraint(),
    new FutureConstraint(),
    new PatternConstraint(),
    new NotEmptyConstraint(),
    new NotBlankConstraint(),
    new EmailConstraint()
  ];

  constructor(
    private client: HttpClient) {
  }

  builder(uri: string) {
    return new BeanConstraintBuilder(uri, this.client, this.constraintFactories);
  }

  addConstraintFactory<T>(constraint: FormControlConstraintFactory) {
    this.constraintFactories.push(constraint);
  }
}

