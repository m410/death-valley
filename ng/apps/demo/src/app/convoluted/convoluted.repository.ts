import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Convoluted } from './convoluted';
import { EntityConstraints} from '@m410/death-valley';
import { Page } from '@m410/paging';

@Injectable()
export class ConvolutedRepository {
  private options = { headers: { 'Content-Type': 'application/json' } };

  constructor(private http: HttpClient) {}

  page(
    start: number = 0,
    size: number = 32,
    sort: string = 'name',
    order: string = 'desc',
  ): Observable<Page<Convoluted>> {
    return this.http.get<Page<Convoluted>>('/api/convoluted', {
      params: new HttpParams()
        .set('start', start.toString())
        .set('size', size.toString())
        .set('sort', sort)
        .set('order', order),
    });
  }

  get(id: number): Observable<Convoluted> {
    return this.http.get<Convoluted>(`/api/convoluted/${id}`);
  }

  save(convoluted: Convoluted): Observable<Convoluted> {
    return this.http.post<Convoluted>('/api/convoluted', JSON.stringify(convoluted), this.options);
  }

  update(convoluted: Convoluted): Observable<Convoluted> {
    return this.http.put<Convoluted>(`/api/convoluted/${convoluted.id}`, convoluted, this.options);
  }

  remove(convoluted: Convoluted) {
    return this.http.delete<Convoluted>(`/api/convoluted/${convoluted.id}`);
  }

  timezones(): Observable<string[]> {
    return this.http.get<string[]>('/api/convoluted?timezones');
  }

  statuses(): Observable<string[]> {
    return this.http.get<string[]>('/api/convoluted?statuses');
  }

  destinationSources(): Observable<string[]> {
    return this.http.get<string[]>('/api/convoluted?destinationSources');
  }

  searchDomainNames(search: string, excludeConvolutedId: number = 0) {
    let getParams = new HttpParams().set('search', search);

    if (excludeConvolutedId != null) {
      getParams = getParams.set('excludeid', excludeConvolutedId.toString());
    }

    return this.http.get<Convoluted[]>('/api/convoluted?domains', { params: getParams });
  }

  validations(): Observable<EntityConstraints> {
    return this.http.get<EntityConstraints>('/api/convoluted?validation');
  }
}
