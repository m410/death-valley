import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConvolutedRepository} from '../convoluted.repository';
import {ValidatorService} from '@m410/death-valley';
import {of} from 'rxjs';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let convolutedRepo: ConvolutedRepository;
  let deathValleyService: ValidatorService;
  beforeEach(
    waitForAsync(() => {
      convolutedRepo = jasmine.createSpyObj('ConvolutedRepository', ['validations']);
      convolutedRepo.validations = () => of({className: 'any', fields: []});
      deathValleyService = new ValidatorService();

      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [FormComponent],
        providers: [
          {provide: ConvolutedRepository, useValue: convolutedRepo},
          {provide: ValidatorService, useValue: deathValleyService},
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
