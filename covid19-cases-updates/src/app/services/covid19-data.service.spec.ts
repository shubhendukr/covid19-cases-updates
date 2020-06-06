import { TestBed } from '@angular/core/testing';
import { Covid19DataService } from './covid19-data.service';

describe('DataServiceService', () => {
  let service: Covid19DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Covid19DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
