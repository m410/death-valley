import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './convoluted/list/list.component';
import { FormComponent } from './convoluted/form/form.component';
import { DetailComponent } from './convoluted/detail/detail.component';
import { ConvolutedRepository } from './convoluted/convoluted.repository';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let convoluted: ConvolutedRepository;

  beforeEach(
    waitForAsync(() => {
      convoluted = jasmine.createSpyObj('ConvolutedRepository', ['page']);
      convoluted.page = () =>
        of({
          content: [],
          pageStart: 0,
          pageSize: 0,
          totalElements: 0,
        });
      TestBed.configureTestingModule({
        declarations: [AppComponent, ListComponent, FormComponent, DetailComponent],
        providers: [{ provide: ConvolutedRepository, useValue: convoluted }],
      }).compileComponents();
    }),
  );
  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
  );
  it(
    `should have as title 'ex'`,
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('ex');
    }),
  );
  it(
    'should render title in a h1 tag',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('Death Valley Form Validation Example');
    }),
  );
});
