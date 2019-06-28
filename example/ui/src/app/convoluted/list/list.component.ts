import { Component, OnInit } from '@angular/core';
import {ConvolutedRepository} from "../convoluted.repository";

@Component({
  selector: 'ex-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  constructor(private repository: ConvolutedRepository) { }

  ngOnInit() {
  }

}
