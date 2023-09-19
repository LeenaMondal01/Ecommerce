import { TestBed } from '@angular/core/testing';

import { EcomServService } from './ecom-serv.service';

describe('EcomServService', () => {
  let service: EcomServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcomServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
