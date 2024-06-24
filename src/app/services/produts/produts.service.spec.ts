import { TestBed } from '@angular/core/testing';

import { ProdutsService } from './produts.service';

describe('ProdutsService', () => {
  let service: ProdutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
