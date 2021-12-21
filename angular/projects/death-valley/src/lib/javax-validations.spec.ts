import { NotNullConstraint } from './javax-validations';
import { Constraint } from 'death-valley';
import { FormControl } from '@angular/forms';

describe('Validations', () => {
  it('NotNull', () => {
    const notNull = new NotNullConstraint();
    const constraint = { name: 'name', message: 'Not Null' } as Constraint;
    const validator = notNull.make(constraint);
    const formInput1 = new FormControl('name');
    expect(validator(formInput1)).toBeNull();

    const formInput2 = new FormControl(null);
    expect(validator(formInput2)).toBeTruthy();
  });
});
