import { TestBed, inject } from '@angular/core/testing';

import { ToastyService } from './toasty.service';

describe('ToastyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastyService]
    });
  });

  it('should ...', inject([ToastyService], (service: ToastyService) => {
    expect(service).toBeTruthy();
  }));
});
