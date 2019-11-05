import { TestBed } from '@angular/core/testing';

import { CountConfigResolverService } from './count-config-resolver.service';

describe('CountConfigResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountConfigResolverService = TestBed.get(CountConfigResolverService);
    expect(service).toBeTruthy();
  });
});
