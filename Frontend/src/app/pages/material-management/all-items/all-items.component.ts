import { AuthfakeauthenticationService } from './../../../core/services/authfake.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit{

  constructor(private authfakeauthenticationService:AuthfakeauthenticationService) {}

  ngOnInit(): void {
      this.authfakeauthenticationService.changeSideMenu('material-management');

  }
}
