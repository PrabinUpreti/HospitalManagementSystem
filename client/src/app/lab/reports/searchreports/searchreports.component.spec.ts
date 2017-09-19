import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchreportsComponent } from './searchreports.component';

describe('SearchreportsComponent', () => {
  let component: SearchreportsComponent;
  let fixture: ComponentFixture<SearchreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
