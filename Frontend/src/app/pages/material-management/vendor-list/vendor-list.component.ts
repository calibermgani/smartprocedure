import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  vendor_name:string[];
  contact_person:string[];
  status:string[];
  vendorList:string[];

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('edit_vendor', { static: true }) edit_vendor: ModalDirective;
  public gridApi_1!: GridApi;
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
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Go back to Material Dashboard Page</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns Visibility',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: false,
          suppressColumnSelectAll: false,
        },
      } as ToolPanelDef,
    ],
    defaultToolPanel: null,
  };

  ngOnInit(): void {}

  constructor(private http : HttpClient) {
    this.vendor_name=[];this.contact_person=[];this.status=[];
  }

  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10
    },
    {
      field: 'id',
      headerName: 'S.no',
      cellRenderer: this.cellrendered.bind(this, 'id'),
      width:100,
    },
    {
      field: 'vendor_name',
      headerName: 'Vendor Name',
      cellRenderer: this.cellrendered.bind(this, 'vendor_name'),
      onCellClicked: this.CellClicked.bind(this, 'vendor_name')
    },
    {
      field: 'vendor_email',
      headerName: 'Vendor Email',
      cellRenderer: this.cellrendered.bind(this, 'vendor_email')
    },
    {
      field: 'vendor_contactno',
      headerName: 'Vendor Contact No',
      cellRenderer: this.cellrendered.bind(this, 'vendor_contactno')
    },
    {
      field: 'vendor_address',
      headerName: 'Vendor Address',
      cellRenderer: this.cellrendered.bind(this, 'vendor_address')
    },
    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: this.cellrendered.bind(this, 'status')
    },
    {
      field: 'contact_person',
      headerName: 'Contact Person',
      cellRenderer: this.cellrendered.bind(this, 'contact_person')
    },
    {
      field: 'added_by',
      headerName: 'Added By',
      cellRenderer: this.cellrendered.bind(this, 'added_by')
    },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: this.cellrendered.bind(this, 'action'),
      onCellClicked: this.CellClicked.bind(this, 'action')

    }
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case'id':{
        return params.value;
      }
      case 'vendor_name': {
        return params.value;
      }
      case 'vendor_email': {
        return params.value;
      }
      case 'vendor_contactno': {
        return params.value;
      }
      case 'vendor_address': {
        return params.value;
      }
      case 'status': {
        if(params.value == 'Active')
        {
          return `<span style="color:#3BAC13">${params.value}</span>`;
        }
        else if(params.value == 'InActive')
        {
          return `<span style="color:#E31E1E">${params.value}</span>`;
        }
        else
        {
          return '-Nil-';
        }

      }
      case 'contact_person': {
        return params.value;
      }
      case 'added_by': {
        return params.value;
      }
      case 'action': {
        if(params.value)
        {
          return `<div class="d-flex flex-row">
          <i class="mdi mdi-pencil-outline me-3 edit-row" style="color:#000;font-size:18px;cursor:pointer"></i>
          <i class="mdi mdi-trash-can-outline me-3 delete-row" style="color:red;font-size:18px;cursor:pointer"></i>
          </div>`
        }
      }
    }
  }

  CellClicked(headerName: any, params: any) {
    switch(headerName){
      case 'action':{
        const editIcons = document.querySelectorAll('.edit-row');
        // Add click event listeners to edit icons
        editIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
              this.edit_vendor?.show();
                console.log('Edit icon clicked');
            });
        });

        const deleteIcons = document.querySelectorAll('.delete-row');
        // Add click event listeners to edit icons
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                console.log('Delete icon clicked');
            });
        });
        break;
      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.http.get('assets/json/vendor-list.json').subscribe((res:any)=>{
      this.vendorList = res;
      this.myGrid_1.api?.setRowData(this.vendorList);

      setTimeout(() => {
        const editIcons = document.querySelectorAll('.edit-row');
        const deleteIcons = document.querySelectorAll('.delete-row');

        // Add click event listeners to edit icons
        editIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
               this.edit_vendor?.show();
                console.log('Edit icon clicked');
            });
        });
        // Add click event listeners to delete icons
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                // Your delete logic here
                console.log('Delete icon clicked');
            });
        });
      }, 100);
    });
  }

}
