import { TestBed, inject } from '@angular/core/testing';

import { JoinAPIService } from './join-api.service';

describe('JoinAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoinAPIService]
    });
  });

  it('should be created', inject([JoinAPIService], (service: JoinAPIService) => {
    expect(service).toBeTruthy();
  }));
});
