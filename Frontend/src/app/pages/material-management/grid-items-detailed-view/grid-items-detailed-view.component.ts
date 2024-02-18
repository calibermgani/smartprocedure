import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-grid-items-detailed-view',
  templateUrl: './grid-items-detailed-view.component.html',
  styleUrls: ['./grid-items-detailed-view.component.scss']
})
export class GridItemsDetailedViewComponent implements OnInit{

  @ViewChild('GridItems_Detailedgrid') GridItems_Detailedgrid: AgGridAngular;
  GridItemsDetailedGrid:any=[];
  public gridApi_GridItems!: GridApi;
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

  ngOnInit(): void {
  }
  constructor(private authService:AuthfakeauthenticationService,private http : HttpClient){}

  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10
    },
    {
      field: 'item_no',
      headerName: 'Item no',
      cellRenderer: this.cellrendered.bind(this, 'item_no'),
      width:100,
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name')
    },
    {
      field: 'item_category',
      headerName: 'Item Category',
      cellRenderer: this.cellrendered.bind(this, 'item_category'),
    },
    {
      field: 'item_description',
      headerName: 'Item Description',
      cellRenderer: this.cellrendered.bind(this, 'item_description'),
    },
    {
      field: 'procedure',
      headerName: 'procedure',
      cellRenderer: this.cellrendered.bind(this, 'procedure')
    },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: this.cellrendered.bind(this, 'action')
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
      case 'item_category': {
        return params.value;
      }
      case 'item_description':{
        return params.value;
      }
      case 'procedure':{
        return params.value;
      }
      case 'action':{
        if(params.value)
        {
          return `<div class="d-flex flex-row">
          <i class="mdi mdi-eye-outline me-3" style="color:#855EDB;font-size:18px"></i>
          <i class="mdi mdi-pencil-outline me-3" style="color:#000;font-size:18px"></i>
          <i class="mdi mdi-trash-can-outline me-3" style="color:red;font-size:18px"></i>
          </div>`
        }
      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_GridItems = params.api;
    let x = params.api
    this.http.get('assets/json/Grid_data_allItems_grid.json').subscribe((res:any)=>{
      this.GridItemsDetailedGrid = res;
      this.GridItems_Detailedgrid.api?.setRowData(this.GridItemsDetailedGrid);
    })
  }

  BacktoGridView(data:boolean){
    this.authService.changeViewType(data);
  }

  ngAfterViewInit(): void {
    this.GridItems_Detailedgrid.api?.sizeColumnsToFit();
  }
}
