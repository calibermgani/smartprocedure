import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillToCabinetComponent } from './refill-to-cabinet.component';

describe('RefillToCabinetComponent', () => {
  let component: RefillToCabinetComponent;
  let fixture: ComponentFixture<RefillToCabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefillToCabinetComponent]
    });
    fixture = TestBed.createComponent(RefillToCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
