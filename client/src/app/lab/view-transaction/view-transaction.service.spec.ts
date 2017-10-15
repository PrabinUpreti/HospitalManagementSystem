import { TestBed, inject } from '@angular/core/testing';

import { ViewTransactionService } from './view-transaction.service';

describe('ViewTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewTransactionService]
    });
  });

  it('should be created', inject([ViewTransactionService], (service: ViewTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
