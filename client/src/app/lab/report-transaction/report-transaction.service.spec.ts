import { TestBed, inject } from '@angular/core/testing';

import { ReportTransactionService } from './report-transaction.service';

describe('ReportTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTransactionService]
    });
  });

  it('should be created', inject([ReportTransactionService], (service: ReportTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
