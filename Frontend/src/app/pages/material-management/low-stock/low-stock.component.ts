import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';

@Component({
  selector: 'app-low-stock',
  templateUrl: './low-stock.component.html',
  styleUrls: ['./low-stock.component.scss']
})
export class LowStockComponent implements OnInit{

  vendor_values:string[];
  procedure_values:string[];
  lowStock:any = [];
  TempLowStockData:any = [];

  @ViewChild('myGrid_LowStock') myGrid_LowStock: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective
  public apiUrl: any = environment_new.imageUrl;
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };
  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No Datas to show.</span>',
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


  constructor(private http : HttpClient,private allService:AllServicesService,private toastr : ToastrService) {
    this.vendor_values=[];this.procedure_values=[];
  }

  ngOnInit(): void {
  }

  columnDefs1: ColDef[] = [
    // {
    //   field: '',
    //   checkboxSelection: true,
    //   headerCheckboxSelection: true,
    //   resizable:false,
    //   width:10
    // },
    {
      field: 'item_number',
      headerName: 'Item No',
      cellRenderer: this.cellrendered.bind(this, 'item_number'),
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.cellClicked.bind(this, 'item_name')
    },
    {
      field: 'store_qty',
      headerName: 'Quantity',
      cellRenderer: this.cellrendered.bind(this, 'store_qty')
    },
    {
      field: 'item_vendor.VendorName',
      headerName: 'Vendor Name',
      cellRenderer: this.cellrendered.bind(this, 'item_vendor.VendorName')
    }
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'item_number': {
        return params.value ? params.value : '-';
      }
      case 'item_name': {
        return params.value ? params.value : '-';
      }
      case 'store_qty': {
        return params.value ? params.value : '-';
      }
      case 'item_vendor.VendorName': {
        return params.value ? params.value : '-';
      }
    }
  }

  ViewItemData:any = [];
  cellClicked(headername:any,params:any){
    switch (headername) {
      case 'item_name': {
        this.allService.ViewItem(params.data.id).subscribe({
          next:(res:any)=>{
            if(res.status == 'Success'){
              this.ViewItemData = res.data;
            }
          },
          error:(res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          }
        })
        this.OpenModal('viewitem');
        break;
      }
  }
}

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.allService.GetLowStockItems().subscribe({
      next:((res:any)=>{
        if(res.status=='Success'){
          this.lowStock = res.data;
          this.TempLowStockData = res.data;
          this.myGrid_LowStock.api?.setRowData(this.lowStock);
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  CloseModal(type:any){
    switch(type){
      case 'viewitem':{
        this.viewitem?.hide();
        break;
      }
    }
  }
  OpenModal(type:any){
    switch(type){
      case 'viewitem':{
        this.viewitem?.show();
        break;
    }
  }
}

  disableNextPatientButton: boolean = false;
  disablePrevoiusPatientButton: boolean = false;
  GoToNextItem(data: any) {
    this.disablePrevoiusPatientButton = false;
    for (let i = 0; i < this.TempLowStockData.length; i++) {
      if (data.id == this.TempLowStockData[i].id) {
        if (this.TempLowStockData[i + 1]) {
          this.ViewItemData = this.TempLowStockData[i + 1];
          // console.log(this.ViewItemData.item_procedures.length);
          // console.log(this.ViewItemData);
          // console.log(this.ViewItemData);
          break;
        }
        else {
          this.disableNextPatientButton = true;
        }
      }
    }
  }

  GoToPreviousItem(data: any) {
    console.log(this.TempLowStockData);
    this.disableNextPatientButton = false;
    for (let i = 0; i < this.TempLowStockData.length; i++) {
      if (data.id == this.TempLowStockData[i].id) {
        console.log(this.TempLowStockData[i - 1]);
        if (this.TempLowStockData[i - 1]) {
          // console.log(this.TempLowStockData[i - 1].item_procedures.length);
          // console.log(this.TempLowStockData[i - 1]);
          this.ViewItemData = this.TempLowStockData[i - 1];
          break;
        }
        else {
          this.disablePrevoiusPatientButton = true;
        }
      }
    }
  }


  ngAfterViewInit(): void {
    this.gridOptions1.api?.sizeColumnsToFit();
  }
}
