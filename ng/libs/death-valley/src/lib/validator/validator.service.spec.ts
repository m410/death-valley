import { inject, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { ValidatorService } from './validator.service';
import { FormControlConstraintFactory } from './form-control-constraint-factory';
import {FieldConstraints} from "./field-constraints";
import {EntityConstraints} from "./entity-constraints";

function makeResponse() {
  return of({
    className: 'com.some.Clazz',
    fields: [
      {
        name: 'name',
        constraints: [{ name: 'NotBlank', message: 'Cannot be blank' }],
      },
    ],
  } as EntityConstraints);
}

describe('ValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ValidatorService, FormBuilder],
    });
  });

  it('should be created', inject([ValidatorService], (service: ValidatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should find validator', inject([ValidatorService], (service: ValidatorService) => {
    const builder = service.builder(makeResponse());
    expect(builder).toBeTruthy();
    let callForm = null;
    let callConstraint = null;

    builder.applyConstraint = (form: FormGroup, fieldConstraint: FieldConstraints) => {
      callForm = form;
      callConstraint = fieldConstraint;
    };

    const formGroup = new FormGroup({ name: new FormControl() });
    builder.applyTo(formGroup);

    expect(callForm).toBeTruthy();
    expect(callConstraint).toBeTruthy();
  }));

  it('should pass NotBlank check', inject([ValidatorService], (service: ValidatorService) => {
    const form = new FormGroup({ name: new FormControl() });
    service.builder(makeResponse()).applyTo(form);
    form.setValue({ name: 'value' });
    const ctrl = form.get('name');
    expect(ctrl).toBeTruthy();

    if (ctrl) {
      expect(ctrl.valid).toBeTruthy();
    }
    expect(form.valid).toBeTruthy();
  }));

  it('should fail NotBlank validation', inject([ValidatorService], (service: ValidatorService) => {
    const form = new FormGroup({ name: new FormControl('') });
    service.builder(makeResponse()).applyTo(form);
    const ctrl = form.get('name');
    expect(ctrl).toBeTruthy();

    if (ctrl) {
      ctrl.setValue(null);
      expect(ctrl.valid).toBeFalsy();
      expect(form.valid).toBeFalsy();

      if (ctrl.errors) {
        expect(ctrl.errors['notBlank'].message).toBe('Cannot be blank');
      } else {
        fail('no form errors');
      }
    }
  }));

  it('should make NotBlank validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'NotBlank') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'NotBlank', message: 'Can not be Blank' });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl());
    expect(validationResult).toBeTruthy(); // has error

    const validationResult2 = validationFn(new FormControl('test'));
    expect(validationResult2).toBeFalsy(); // no error
  }));

  it('should make Size validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'Size') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'Size', message: 'Can not be null', min: 2, max: 6 });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl('a'));
    expect(validationResult).toBeTruthy(); // has error

    const validationResult2 = validationFn(new FormControl('test'));
    expect(validationResult2).toBeFalsy(); // no error

    const validationResult3 = validationFn(new FormControl('a-test-test'));
    expect(validationResult3).toBeTruthy(); // has error
  }));

  it('should make Past validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'Past') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'Past', message: 'Can not be null' });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl('01/01/2025'));
    expect(validationResult).toBeTruthy(); // has error

    const validationResult2 = validationFn(new FormControl('01/01/2017'));
    expect(validationResult2).toBeFalsy(); // no error
  }));

  it('should make Future validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'Future') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'Future', message: 'Can not be null' });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl('01/01/2017'));
    expect(validationResult).toBeTruthy();

    const validationResult2 = validationFn(new FormControl('01/01/2025'));
    expect(validationResult2).toBeFalsy();
  }));

  it('should make Pattern validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'Pattern') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'Pattern', message: 'Can not be null', regex: '^[a-z]+$' });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl('123'));
    expect(validationResult).toBeTruthy(); // has error

    const validationResult2 = validationFn(new FormControl('ab ab cd'));
    expect(validationResult2).toBeTruthy(); // has error

    const validationResult3 = validationFn(new FormControl('abc'));
    expect(validationResult3).toBeFalsy(); // no error
  }));

  it('should make Email validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'Email') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'Email', message: 'Can not be null' });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl('something'));
    expect(validationResult).toBeTruthy(); // has error

    const validationResult2 = validationFn(new FormControl('something@somewhere.com'));
    expect(validationResult2).toBeFalsy(); // no error
  }));

  it('should make Digits validator', inject([ValidatorService], (service: ValidatorService) => {
    const factory = service.constraintFactories.find(fac => fac.name === 'Digits') as FormControlConstraintFactory;
    expect(factory).toBeTruthy();

    const validationFn = factory.make({ name: 'Digits', message: 'Can not be null' });
    expect(validationFn).toBeTruthy();

    const validationResult = validationFn(new FormControl('123a'));
    expect(validationResult).toBeTruthy(); // has error

    const validationResult2 = validationFn(new FormControl('123,123.00'));
    expect(validationResult2).toBeFalsy(); // no error
  }));
});
