import { TestBed, inject } from '@angular/core/testing';

import { TestbookingTransactionService } from './testbooking-transaction.service';

describe('TestbookingTransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestbookingTransactionService]
    });
  });

  it('should be created', inject([TestbookingTransactionService], (service: TestbookingTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
