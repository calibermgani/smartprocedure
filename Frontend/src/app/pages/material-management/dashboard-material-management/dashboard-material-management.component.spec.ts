import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMaterialManagementComponent } from './dashboard-material-management.component';

describe('DashboardMaterialManagementComponent', () => {
  let component: DashboardMaterialManagementComponent;
  let fixture: ComponentFixture<DashboardMaterialManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMaterialManagementComponent]
    });
    fixture = TestBed.createComponent(DashboardMaterialManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
