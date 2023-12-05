import { TestBed } from '@angular/core/testing';

import { LoginModuleService } from './login-module.service';

describe('LoginModuleService', () => {
  let service: LoginModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
