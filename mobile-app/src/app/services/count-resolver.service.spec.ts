import { TestBed } from '@angular/core/testing';

import { CountResolverService } from './count-resolver.service';

describe('CountResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountResolverService = TestBed.get(CountResolverService);
    expect(service).toBeTruthy();
  });
});
