import { TestBed } from '@angular/core/testing';

import { LoginModalService } from '../login-modal.service';

describe('LoginModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginModalService = TestBed.get(LoginModalService);
    expect(service).toBeTruthy();
  });
});
