import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsFormComponent } from './patient-details-form.component';

describe('PatientDetailsFormComponent', () => {
  let component: PatientDetailsFormComponent;
  let fixture: ComponentFixture<PatientDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
