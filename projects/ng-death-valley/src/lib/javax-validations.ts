import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import {Constraint, FormControlConstraintFactory} from './bean-validator.service';


export class NotNullConstraint implements FormControlConstraintFactory {
  name = 'NotNull';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value == null;
      return bad ? {'notNull': {message: constraint.message}} : null;
    };
  }
}

export class NullConstraint implements FormControlConstraintFactory {
  name = 'Null';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value != null;
      return bad ? {'null': {message: constraint.message}} : null;
    };
  }
}

export class AssertTrueConstraint implements FormControlConstraintFactory {
  name = 'AssertTrue';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value === true;
      return bad ? {assertTrue: {message: constraint.message}} : null;
    };
  }
}

export class AssertFalseConstraint implements FormControlConstraintFactory {
  name = 'AssertFalse';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value === false;
      return bad ? {assertFalse: {message: constraint.message}} : null;
    };
  }
}

export class MinConstraint implements FormControlConstraintFactory {
  minValue = 0;
  name = 'Min';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value < this.minValue;
      return bad ? {min: {message: constraint.message}} : null;
    };
  }
}

export class MaxConstraint implements FormControlConstraintFactory {
  name = 'Max';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value > constraint.max;
      return bad ? {max: {message: constraint.message}} : null;
    };
  }
}

export class DecimalMinConstraint implements FormControlConstraintFactory {
  name = 'DecimalMin';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value < constraint.min;
      return bad ? {decimalMin: {message: constraint.message}} : null;
    };
  }
}

export class DecimalMaxConstraint implements FormControlConstraintFactory {
  name = 'DecimalMax';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = ctl.value > constraint.max;
      return bad ? {decimalMax: {message: constraint.message}} : null;
    };
  }
}

export class NegativeConstraint implements FormControlConstraintFactory {
  name = 'Negative';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = 0 >= ctl.value;
      return bad ? {negative: {message: constraint.message}} : null;
    };
  }
}

export class NegativeOrZeroConstraint implements FormControlConstraintFactory {
  name = 'NegativeOrZero';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = 0 > ctl.value;
      return bad ? {negativeOrZero: {message: constraint.message}} : null;
    };
  }
}

export class PositiveConstraint implements FormControlConstraintFactory {
  name = 'Positive';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = 0 <= ctl.value;
      return bad ? {positive: {message: constraint.message}} : null;
    };
  }
}

export class PositiveOrZeroConstraint implements FormControlConstraintFactory {
  name = 'PositiveOrZero';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = 0 < ctl.value;
      return bad ? {positiveOrZero: {message: constraint.message}} : null;
    };
  }
}

export class SizeConstraint implements FormControlConstraintFactory {
  name = 'Size';

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const good = ctl.value == null || (ctl.value.toString().length > constraint.min && ctl.value.toString().length < constraint.max);
      return !good ? {size: {message: constraint.message}} : null;
    };
  }
}

export class DigitsConstraint implements FormControlConstraintFactory {
  name = 'Digits';
  private regexp = /^[0-9,.]+$/;

  make(constraint: Constraint) {
    return (ctl: AbstractControl) => {
      const bad = this.regexp.test(ctl.value);
      return !bad ? {digits: {message: constraint.message}} : null;
    };
  }
}

export class PastConstraint implements FormControlConstraintFactory {
  name = 'Past';
  dateFormat: string;
  strict: boolean;

  // todo change default date format: 2018-09-04T10:52:25+00:00
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

  // todo change default date format: 2018-09-04T10:52:25+00:00
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

  // todo change default date format: 2018-09-04T10:52:25+00:00
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

  // todo change default date format: 2018-09-04T10:52:25+00:00
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
      const bad = this.regEx.test(ctl.value.toString());
      return !bad ? {email: {message: constraint.message}} : null;
    };
  }
}


export const JAVAX_CONSTRAINT_FACTORIES: Array<FormControlConstraintFactory> = [
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


