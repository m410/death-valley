import {Component} from '@angular/core';
import {ConvolutedRepository} from '../convoluted.repository';
import {Convoluted} from '../convoluted';
import {catchError, Observable, of} from 'rxjs';
import {Page} from '@m410/paging';

@Component({
  selector: 'ex-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  error: string | null = null;
  convoluteds$ = this.repository.page().pipe(
    catchError(err => {
      this.error = 'No Data, is the server configured?';
      return of({content:[]})
    })
  );

  constructor(private repository: ConvolutedRepository) {
  }
}
