import{TestBed}from'@angular/core/testing';

import {ArduinoVarijableService}from './arduino-varijable.service';

describe('ArduinoVarijableService', () => {
  let service: ArduinoVarijableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArduinoVarijableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
