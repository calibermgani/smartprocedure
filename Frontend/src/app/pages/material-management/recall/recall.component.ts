import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-recall',
  templateUrl: './recall.component.html',
  styleUrls: ['./recall.component.scss']
})
export class RecallComponent {

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective;
  procedure_list:string[];
  SeacrchRecallgrid:any;
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
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No Rows to show</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    suppressRowClickSelection:true,
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

  constructor(private http : HttpClient,private allservices : AllServicesService,private toastr : ToastrService){}

  columnDefs1: ColDef[] = [
    {
      field: 'item_number',
      headerName: 'Item no',
      cellRenderer: this.cellrendered.bind(this, 'item_number'),
      width:100,
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.cellClicked.bind(this, 'item_name')
    },
    {
      field: 'lot_no',
      headerName: 'Lot no',
      cellRenderer: this.cellrendered.bind(this, 'lot_no')
    },
    // {
    //   field: 'expiry_date',
    //   headerName: 'Expiry Date',
    //   cellRenderer: this.cellrendered.bind(this, 'expiry_date'),
    // },
    {
      field: 'store_qty',
      headerName: 'Quantity',
      cellRenderer: this.cellrendered.bind(this, 'store_qty')
    },
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case'item_number':{
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'store_qty': {
        return params.value;
      }
      case 'lot_no':{
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
    // this.http.get('assets/json/damaged-list.json').subscribe((res:any)=>{
    //   this.damagedGriddata = res;
    //   this.myGrid_1.api?.setRowData(this.damagedGriddata);
    //   this.gridApi_1.sizeColumnsToFit();
    // })
    this.allservices.getItemsRecall().subscribe({
      next:((res:any)=>{
        if(res.status=='Success'){
          // this.toastr.success(`${res.message}`,'Successful',{
          //   positionClass: 'toast-top-center',
          //   timeOut:2000,
          // });
          this.damagedGriddata = res.data;
          this.myGrid_1.api?.setRowData(this.damagedGriddata);
          this.gridApi_1.sizeColumnsToFit();
        }
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  OnSearch(){
    this.gridApi_1.setQuickFilter(this.SeacrchRecallgrid)
  }
  ngAfterViewInit(): void {
      this.myGrid_1.api.sizeColumnsToFit();
  }

}
