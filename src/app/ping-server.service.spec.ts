import { TestBed, inject } from '@angular/core/testing';

import { PingServerService } from './ping-server.service';

describe('PingServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PingServerService]
    });
  });

  it('should be created', inject([PingServerService], (service: PingServerService) => {
    expect(service).toBeTruthy();
  }));
});
