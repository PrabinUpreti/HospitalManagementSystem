import { TestBed, async, inject } from '@angular/core/testing';

import { AuthuserGuard } from './authuser.guard';

describe('AuthuserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthuserGuard]
    });
  });

  it('should ...', inject([AuthuserGuard], (guard: AuthuserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
