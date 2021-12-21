import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Convoluted } from '../convoluted';
import { ConvolutedRepository } from '../convoluted.repository';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ex-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  convoluted!: Observable<Convoluted>;
  constructor(private activatedRoute: ActivatedRoute, private convolutedRepository: ConvolutedRepository) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.convoluted = this.convolutedRepository.get(params['id']);
    });
  }
}
