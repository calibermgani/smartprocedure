import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-allitems-grid-view',
  templateUrl: './allitems-grid-view.component.html',
  styleUrls: ['./allitems-grid-view.component.scss']
})
export class AllitemsGridViewComponent implements OnInit{

  @Output() newItemEvent = new EventEmitter<boolean>();
  @ViewChild('setalert', { static: false }) setalert?: ModalDirective;
  @ViewChild('bulkupdate', { static: false }) bulkupdate?: ModalDirective;
  @ViewChild('move', { static: false }) move?: ModalDirective;
  @ViewChild('clone_modal', { static: false }) clone_modal: ModalDirective;
  @ViewChild('add_tag', { static: false }) add_tag: ModalDirective;
  @ViewChild('delete_modal', { static: false }) delete_modal: ModalDirective;
  @ViewChild('edit_modal', { static: false }) edit_modal: ModalDirective;
  Grid_data:any=[];
  folder_structure_value:any = [];
  showEditablefields:boolean = false;
  showDetailedview:boolean = true;

  constructor(private http : HttpClient,private router : Router,private authService : AuthfakeauthenticationService){}

  ngOnInit(): void {
    this.http.get('assets/json/allitem-grid-data.json').subscribe((res:any)=>{
      this.Grid_data = res;
    });

    this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
      this.folder_structure_value = res;
      console.log('response',this.folder_structure_value);
    });

  }

  selectgrid(){
    this.showEditablefields =! this.showEditablefields;
  }

  navigateToDetailedView(data:boolean){
    this.authService.changeViewType(data);
  }
}
