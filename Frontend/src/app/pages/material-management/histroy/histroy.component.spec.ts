import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistroyComponent } from './histroy.component';

describe('HistroyComponent', () => {
  let component: HistroyComponent;
  let fixture: ComponentFixture<HistroyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistroyComponent]
    });
    fixture = TestBed.createComponent(HistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
