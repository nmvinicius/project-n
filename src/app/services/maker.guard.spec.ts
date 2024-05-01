import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { makerGuard } from './maker.guard';

describe('makerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => makerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
