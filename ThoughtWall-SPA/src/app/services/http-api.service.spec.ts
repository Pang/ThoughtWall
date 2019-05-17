import { TestBed } from '@angular/core/testing';

import { HttpApiService } from './http-api.service';

describe('HttpApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpApiService = TestBed.get(HttpApiService);
    expect(service).toBeTruthy();
  });
});
