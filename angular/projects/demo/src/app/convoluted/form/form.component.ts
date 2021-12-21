import { Component, OnInit } from '@angular/core';
import { ConvolutedRepository } from '../convoluted.repository';
import { DeathValleyService } from 'death-valley';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ex-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
    smallNumber: new FormControl(''),
    largerNumber: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl(''),
    date: new FormControl(''),
  });

  constructor(private convolutedRepository: ConvolutedRepository, private deathValleyService: DeathValleyService) {}

  ngOnInit() {
    this.deathValleyService.builder(this.convolutedRepository.validations()).applyTo(this.form);
  }

  submit() {
    console.log('submit');
  }

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  get smallNumber(): AbstractControl {
    return this.form.get('smallNumber') as AbstractControl;
  }

  get largerNumber(): AbstractControl {
    return this.form.get('largerNumber') as AbstractControl;
  }

  get status(): AbstractControl {
    return this.form.get('status') as AbstractControl;
  }

  get date(): AbstractControl {
    return this.form.get('date') as AbstractControl;
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl;
  }
}
