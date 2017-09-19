import { TestBed, inject } from '@angular/core/testing';

import { ModifyService } from './modify.service';

describe('ModifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyService]
    });
  });

  it('should be created', inject([ModifyService], (service: ModifyService) => {
    expect(service).toBeTruthy();
  }));
});
