import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToCabinetComponent } from './back-to-cabinet.component';

describe('BackToCabinetComponent', () => {
  let component: BackToCabinetComponent;
  let fixture: ComponentFixture<BackToCabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackToCabinetComponent]
    });
    fixture = TestBed.createComponent(BackToCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
