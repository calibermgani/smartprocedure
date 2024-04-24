import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';


@Component({
  selector: 'app-wasted',
  templateUrl: './wasted.component.html',
  styleUrls: ['./wasted.component.scss']
})
export class WastedComponent {

  @ViewChild('myGrid_backtocabinet') myGrid_backtocabinet: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective;
  procedure_list:string[];
  WastedGridData:any[];
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

  constructor(private http : HttpClient,private allService:AllServicesService,private toastr : ToastrService){}

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
    this.allService.GetWastedItems().subscribe({
      next:((res:any)=>{
        if(res.status=='Success'){
          this.WastedGridData = res.procedures;
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
    // this.http.get('assets/json/damaged_grid.json').subscribe((res:any)=>{
    //   this.damagedGriddata = res;
    // })
  }

  ngAfterViewInit(): void {
      this.myGrid_backtocabinet.api.sizeColumnsToFit();
  }
}
