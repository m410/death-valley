import {Component, OnInit} from '@angular/core';
import {ConvolutedRepository} from '../convoluted.repository';
import {ValidatorService} from '@m410/death-valley';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Convoluted, Status} from "../convoluted";
import {Router} from "@angular/router";

@Component({
  selector: 'ex-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  readonly form = new FormGroup({
    name: new FormControl(''),
    smallNumber: new FormControl(0),
    largerNumber: new FormControl(0),
    status: new FormControl(Status.Open),
    email: new FormControl(''),
    date: new FormControl(''),
  });

  statusEnum = Status
  statusOptions = Object.keys(this.statusEnum).filter(k => !isNaN(Number(k))).map(k => parseInt(k));
  error?: string

  constructor(
    private router: Router,
    private convolutedRepository: ConvolutedRepository,
    private validator: ValidatorService) {
  }

  ngOnInit() {
    this.validator.builder(this.convolutedRepository.validations()).applyTo(this.form);
  }

  submit() {
    this.convolutedRepository.save(this.form.value as Convoluted).subscribe({
      next: (success) => {
        this.router.navigateByUrl('/convoluted/' + success.id)
      },
      error: error => {
        this.error = error
      }
    })
  }
}
