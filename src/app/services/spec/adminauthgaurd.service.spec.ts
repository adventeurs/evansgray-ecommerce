import { TestBed } from '@angular/core/testing';

import { AdminauthgaurdService } from '../adminauthgaurd.service';

describe('AdminauthgaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminauthgaurdService = TestBed.get(AdminauthgaurdService);
    expect(service).toBeTruthy();
  });
});
