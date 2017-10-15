import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReportComponent } from './doctor-report.component';

describe('DoctorReportComponent', () => {
  let component: DoctorReportComponent;
  let fixture: ComponentFixture<DoctorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
