import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-near-expired',
  templateUrl: './near-expired.component.html',
  styleUrls: ['./near-expired.component.scss']
})
export class NearExpiredComponent {

  @ViewChild('myGrid_nearexpired') myGrid_nearexpired: AgGridAngular;
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
      field: 'item_no',
      headerName: 'Item no',
      cellRenderer: this.cellrendered.bind(this, 'item_no'),
      width:100,
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.cellClicked.bind(this, 'item_name')
    },
    {
      field: 'expiry_date',
      headerName: 'Expiry Date',
      cellRenderer: this.cellrendered.bind(this, 'expiry_date'),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      cellRenderer: this.cellrendered.bind(this, 'quantity')
    },
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case'item_no':{
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'quantity': {
        return params.value;
      }
      case 'expiry_date':{
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
    let x = params.api
    this.http.get('assets/json/damaged-list.json').subscribe((res:any)=>{
      this.damagedGriddata = res;
      this.myGrid_nearexpired.api?.setRowData(this.damagedGriddata);
    })
  }

  ngAfterViewInit(): void {
      this.myGrid_nearexpired.api.sizeColumnsToFit();
  }
}
