import { Component, OnInit } from '@angular/core';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-dashboard-material-management',
  templateUrl: './dashboard-material-management.component.html',
  styleUrls: ['./dashboard-material-management.component.scss']
})
export class DashboardMaterialManagementComponent implements OnInit{

  constructor(private authfakeauthenticationService:AuthfakeauthenticationService) {}

  ngOnInit(): void {
      this.authfakeauthenticationService.changeSideMenu('material-management');

  }
}
