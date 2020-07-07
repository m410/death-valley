import { Component, OnInit } from '@angular/core';
import {ConvolutedRepository} from '../convoluted.repository';
import {Convoluted} from '../convoluted';
import {Observable} from 'rxjs';
import {Page} from "death-valley";

@Component({
  selector: 'ex-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  convoluteds: Observable<Page<Convoluted>>;
  constructor(private repository: ConvolutedRepository) { }

  ngOnInit() {
  }
}
