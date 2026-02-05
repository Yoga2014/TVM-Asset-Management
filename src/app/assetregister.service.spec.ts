import { TestBed } from '@angular/core/testing';

import { AssetregisterService } from './assetregister.service';

describe('AssetregisterService', () => {
  let service: AssetregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
