import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearExpiredComponent } from './near-expired.component';

describe('NearExpiredComponent', () => {
  let component: NearExpiredComponent;
  let fixture: ComponentFixture<NearExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearExpiredComponent]
    });
    fixture = TestBed.createComponent(NearExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
