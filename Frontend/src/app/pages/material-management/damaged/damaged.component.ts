import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

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
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No Datas Available</span>',
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


  ngOnInit(): void {}

  constructor(private http : HttpClient,private allService:AllServicesService,private toastr : ToastrService,private DatePipe: DatePipe){}

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
      field: 'procedure.procedure_list_shortcode',
      headerName:'Procedure Code',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'procedure.procedure_list_shortcode')
    },
    {
      field: 'procedure.created_at',
      headerName:'Procedure Date',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'procedure.created_at')
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
      case 'procedure.procedure_list_shortcode': {
        return params.value;
      }
      case 'procedure.created_at': {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(params.value, 'dd-MM-yyyy');
        return formattedDate || '';
      }
    }
  }

//   cellClicked(headername:any,params:any){
//     switch (headername) {
//       case 'item_name': {
//         this.viewitem?.show();
//       }
//   }
// }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.allService.GetDamagedItems().subscribe({
      next:((res:any)=>{
        if(res.status=='Success'){
          this.damagedGriddata = res.item_damaged_list;
          this.myGrid_Damaged.api?.setRowData(this.damagedGriddata);
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`${res}`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }

  ngAfterViewInit(): void {
      this.myGrid_Damaged.api.sizeColumnsToFit();
  }
}
