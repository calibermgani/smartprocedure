import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-allitems-grid-view',
  templateUrl: './allitems-grid-view.component.html',
  styleUrls: ['./allitems-grid-view.component.scss']
})
export class AllitemsGridViewComponent implements OnInit{

  @Output() newItemEvent = new EventEmitter<boolean>();
  Grid_data:any=[];
  showEditablefields:boolean = false;
  showDetailedview:boolean = true;

  constructor(private http : HttpClient,private router : Router,private authService : AuthfakeauthenticationService){}

  ngOnInit(): void {
    this.http.get('assets/json/allitem-grid-data.json').subscribe((res:any)=>{
      this.Grid_data = res;
    })
  }

  selectgrid(){
    this.showEditablefields =! this.showEditablefields;
  }

  navigateToDetailedView(data:boolean){
    this.authService.changeViewType(data);
  }
}
