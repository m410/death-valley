import {Component, OnInit} from '@angular/core';
import {ConvolutedRepository} from '../convoluted.repository';
import {DeathValleyService} from 'death-valley';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ex-form',
  templateUrl: './form.component.html'
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

  constructor(
    private convolutedRepository: ConvolutedRepository,
    private deathValleyService: DeathValleyService
  ) {
  }

  ngOnInit() {
    this.deathValleyService.builder(this.convolutedRepository.validations()).applyTo(this.form);
  }

  submit() {
    console.log('submit');
  }

  get name() {
    return this.form.get('name');
  }

  get smallNumber() {
    return this.form.get('smallNumber');
  }

  get largerNumber() {
    return this.form.get('largerNumber');
  }

  get status() {
    return this.form.get('status');
  }

  get date() {
    return this.form.get('date');
  }

  get email() {
    return this.form.get('email');
  }
}
