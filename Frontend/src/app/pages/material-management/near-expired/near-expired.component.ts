import { AllServicesService } from 'src/app/core/services/all-services.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment_new } from 'src/environments/environment';

@Component({
  selector: 'app-near-expired',
  templateUrl: './near-expired.component.html',
  styleUrls: ['./near-expired.component.scss']
})
export class NearExpiredComponent {

  @ViewChild('myGrid_nearexpired') myGrid_nearexpired: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective;
  public apiUrl: any = environment_new.imageUrl;
  procedure_list:string[];
  damagedGriddata:any[];
  ViewItemData:any = [];
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

  constructor(private http : HttpClient,private allService : AllServicesService,private toastr : ToastrService){}

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
      // onCellClicked: this.cellClicked.bind(this, 'item_name')
    },
    {
      field: 'expired_date',
      headerName: 'Expiry Date',
      cellRenderer: this.cellrendered.bind(this, 'expired_date'),
    },
    {
      field: 'total_store_qty',
      headerName: 'Quantity',
      cellRenderer: this.cellrendered.bind(this, 'total_store_qty')
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
      case 'expired_date': {
        return params.value;
      }
      case 'total_store_qty':{
        return params.value;
      }
    }
  }

  cellClicked(headername:any,params:any){
    switch (headername) {
      case 'item_name': {
        this.viewitem?.show();
        console.log(params);
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
    this.allService.GetNearExpiredItems().subscribe({
      next: ((res: any) => {
        if (res.status == 'Success') {
          this.damagedGriddata = res.data;
          this.myGrid_nearexpired.api?.setRowData(this.damagedGriddata);
        }
      }),
      error: ((error: any) => {
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  tempGridData:any = [];
  disableNextPatientButton:boolean = false;
  disablePrevoiusPatientButton : boolean = false;
  GoToNextItem(data: any) {
    this.disablePrevoiusPatientButton = false;
    for (let i = 0; i < this.tempGridData.length; i++) {
      if (data.id == this.tempGridData[i].id) {
        if (this.tempGridData[i + 1]) {
          this.ViewItemData = this.tempGridData[i + 1];
          console.log(this.ViewItemData.item_procedures.length);
          console.log(this.ViewItemData);
          console.log(this.ViewItemData);
          break;
        }
        else {
          this.disableNextPatientButton = true;
        }
      }
    }
  }

  GoToPreviousItem(data: any) {
    console.log(this.tempGridData);
    this.disableNextPatientButton = false;
    for (let i = 0; i < this.tempGridData.length; i++) {
      if (data.id == this.tempGridData[i].id) {
        console.log(this.tempGridData[i-1]);
        if (this.tempGridData[i - 1]) {
          console.log(this.tempGridData[i - 1].item_procedures.length);
          console.log(this.tempGridData[i - 1]);
          this.ViewItemData = this.tempGridData[i - 1];
          break;
        }
        else {
          this.disablePrevoiusPatientButton = true;
        }
      }
    }
  }

  SearchbyNearItems:any = ''
  SearchNearItems_OnChange(){
    // this.gridApi_1.setQuickFilter(this.SearchbyNearItems)
    this.myGrid_nearexpired.api?.setQuickFilter(this.SearchbyNearItems);
  }

  ngAfterViewInit(): void {
      this.myGrid_nearexpired.api.sizeColumnsToFit();
  }
}
