import { TestBed } from '@angular/core/testing';

import { WeathermapService } from './weathermap.service';

describe('WeathermapService', () => {
  let service: WeathermapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeathermapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
