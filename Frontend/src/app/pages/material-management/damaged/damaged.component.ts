import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-damaged',
  templateUrl: './damaged.component.html',
  styleUrls: ['./damaged.component.scss']
})
export class DamagedComponent implements OnInit{

  @ViewChild('myGrid_Damaged') myGrid_Damaged: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective;
  procedure_list:string[];
  damagedGriddata:any[];
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
    suppressRowClickSelection:true,
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

  constructor(private http : HttpClient){}

  columnDefs1: ColDef[] = [
    {
      field: 'mrn_no',
      headerName:'MRN No',
      filter: "agTextColumnFilter", suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'mrn_no')
    },
    {
      field: 'accession_no',
      headerName:'Accession No',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'accession_no')
    },
    {
      field: 'procedure_code',
      headerName:'Procedure Code',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'procedure_code')
    },
    {
      field: 'procedure_date',
      headerName:'Procedure Date',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'procedure_date')
    },
  ];

  cellRendered(headerName: any, params: any) {
    switch (headerName) {
      case'mrn_no':{
        return params.value;
      }
      case 'accession_no': {
        return params.value;
      }
      case 'procedure_code': {
        return params.value;
      }
      case 'procedure_date': {
        return params.value;
      }
    }
  }

  cellClicked(headername:any,params:any){
    switch (headername) {
      case 'item_name': {
        this.viewitem?.show();
      }
  }
}

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.http.get('assets/json/damaged_grid.json').subscribe((res:any)=>{
      this.damagedGriddata = res;
      this.myGrid_Damaged.api?.setRowData(this.damagedGriddata);
    })
  }

  ngAfterViewInit(): void {
      this.myGrid_Damaged.api.sizeColumnsToFit();
  }
}
