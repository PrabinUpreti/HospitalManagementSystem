import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillReportComponent } from './fill-report.component';

describe('FillReportComponent', () => {
  let component: FillReportComponent;
  let fixture: ComponentFixture<FillReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
