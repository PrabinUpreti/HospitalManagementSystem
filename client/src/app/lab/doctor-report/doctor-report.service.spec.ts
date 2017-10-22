import { TestBed, inject } from '@angular/core/testing';

import { DoctorReportService } from './doctor-report.service';

describe('DoctorReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorReportService]
    });
  });

  it('should be created', inject([DoctorReportService], (service: DoctorReportService) => {
    expect(service).toBeTruthy();
  }));
});
