import { TestBed } from '@angular/core/testing';

import { Wyszukiwarka } from './wyszukiwarka';

describe('Wyszukiwarka', () => {
  let service: Wyszukiwarka;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wyszukiwarka);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
