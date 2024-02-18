import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemsDetailedViewComponent } from './grid-items-detailed-view.component';

describe('GridItemsDetailedViewComponent', () => {
  let component: GridItemsDetailedViewComponent;
  let fixture: ComponentFixture<GridItemsDetailedViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridItemsDetailedViewComponent]
    });
    fixture = TestBed.createComponent(GridItemsDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
