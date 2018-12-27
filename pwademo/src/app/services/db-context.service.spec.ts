import { TestBed } from '@angular/core/testing';

import { DbContextService } from './db-context.service';

describe('DbContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbContextService = TestBed.get(DbContextService);
    expect(service).toBeTruthy();
  });
});
