import { TestBed } from '@angular/core/testing';

import { AssignmentDetailsService } from './assignment-details.service';

describe('AssignmentDetailsService', () => {
  let service: AssignmentDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
