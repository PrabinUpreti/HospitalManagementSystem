import { TestBed, inject } from '@angular/core/testing';

import { LaravelService } from './laravel.service';

describe('LaravelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaravelService]
    });
  });

  it('should be created', inject([LaravelService], (service: LaravelService) => {
    expect(service).toBeTruthy();
  }));
});
