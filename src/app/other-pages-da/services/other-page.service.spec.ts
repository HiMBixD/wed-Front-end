import { TestBed } from '@angular/core/testing';

import { OtherPageService } from './other-page.service';

describe('OtherPageService', () => {
  let service: OtherPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
