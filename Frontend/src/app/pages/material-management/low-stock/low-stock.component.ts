import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-low-stock',
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.scss']
})
export class LowStockComponent implements OnInit{

  vendor_values:string[];
  procedure_values:string[];
  lowStock:any = [];

  @ViewChild('myGrid_LowStock') myGrid_LowStock: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective
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

  constructor(private http : HttpClient){
    this.vendor_values=[];this.procedure_values=[];
  }

  ngOnInit(): void {
  }

  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      resizable:false,
      width:10
    },
    {
      field: 'item_no',
      headerName: 'Item No',
      cellRenderer: this.cellrendered.bind(this, 'item_no'),
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.cellClicked.bind(this, 'item_name')
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      cellRenderer: this.cellrendered.bind(this, 'quantity')
    },
    {
      field: 'vendor_name',
      headerName: 'Vendor Name',
      cellRenderer: this.cellrendered.bind(this, 'vendor_name')
    }
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'item_no': {
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'quantity': {
        return params.value;
      }
      case 'vendor_name': {
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

  }

  ngAfterViewInit(): void {
    this.http.get('assets/json/low-stock.json').subscribe((res:any)=>{
      this.lowStock = res;
      this.gridOptions1.api?.sizeColumnsToFit();
      this.myGrid_LowStock.api?.setRowData(this.lowStock);
    })
  }
}
