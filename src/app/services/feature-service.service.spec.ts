import { TestBed, inject } from '@angular/core/testing';

import { FeatureServiceService } from './feature-service.service';

describe('FeatureServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureServiceService]
    });
  });

  it('should be created', inject([FeatureServiceService], (service: FeatureServiceService) => {
    expect(service).toBeTruthy();
  }));
});
