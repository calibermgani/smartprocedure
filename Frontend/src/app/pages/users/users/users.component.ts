import { Component, ViewChild } from '@angular/core';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;
  sortBy_Users: string[];
  sortBy_ActiveAndInactive: string[];
  constructor(){
    this.sortBy_Users = ['All', 'IR Doctor', 'IR Booking', 'IR Tech', 'IR Nurse', 'MRP', 'Anesthesia', 'Ward Nurse', 'Escot', 'House Keeper', 'Billing'];
    this.sortBy_ActiveAndInactive = ['Active', 'Inactive'];
  }

  ngOnInit(){

  }

  
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    // floatingFilter: true,
  };

  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No rows to show</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: true,
    paginationPageSize:15,
    suppressRowClickSelection:true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
    getRowId: (params) => {
      return params.data.id;
    },
  };

  columnUserDefs: ColDef[] = [
    {
      field: 'staff_name',
      headerName: 'Staff name'
    }, {
      field: 'scfhs_registration',
      headerName: 'SCFHS Registration'
    }, {
      field: 'beep_number',
      headerName: 'Beep number'
    }, {
      field: 'contact_number',
      headerName: 'Contact number'
    }, {
      field: 'email',
      headerName: 'Email'
    }, {
      field: 'specialty',
      headerName: 'Specialty'
    }, {
      field: 'extension_number',
      headerName: 'Extension number'
    }, {
      field: 'job_title',
      headerName: 'job title'
    }

  ]
  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }

  onGridReady_1(params: GridReadyEvent) {
   
  }
}
