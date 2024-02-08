import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedComponent } from './damaged.component';

describe('DamagedComponent', () => {
  let component: DamagedComponent;
  let fixture: ComponentFixture<DamagedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DamagedComponent]
    });
    fixture = TestBed.createComponent(DamagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
