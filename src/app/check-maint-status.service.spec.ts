import { TestBed, inject } from '@angular/core/testing';

import { CheckMaintStatusService } from './check-maint-status.service';

describe('CheckMaintStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckMaintStatusService]
    });
  });

  it('should be created', inject([CheckMaintStatusService], (service: CheckMaintStatusService) => {
    expect(service).toBeTruthy();
  }));
});
