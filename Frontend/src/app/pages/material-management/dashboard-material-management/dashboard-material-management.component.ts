import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

interface MainData {
  mrn_no:string,
  accession_no:string,
  procedure_code:string,
  procedure_date:string,
  sub:SubData[]
}
interface SubData {
  "item_no":string,
  "item_name":string,
  "size":string,
  "qty":string
}

@Component({
  selector: 'app-dashboard-material-management',
  templateUrl: './dashboard-material-management.component.html',
  styleUrls: ['./dashboard-material-management.component.scss'],
})
export class DashboardMaterialManagementComponent implements OnInit {

  material_summary_data: any = [];
  filter_daily_consumed: any = [];
  procedure_list:any = [];
  items_list : any = [];
  DailyConsumedGridData:any = [];
  MaterialUtilizedGridData:any = [];
  columnDefs1: ColDef[];
  showMiniGrid:boolean = false;
  reduceTableSize:boolean = false;
  hideOtherColumns:boolean = false;
  material_type_name:string = '';
  bsconfig= {withTimepicker: false, rangeInputFormat : 'MMMM Do YYYY, h:mm:ss a', dateInputFormat: 'MMMM Do YYYY, h:mm:ss a',adaptivePosition: true,isAnimated:true}
  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('viewitem') viewitem: ModalDirective;
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
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };

  public gridOptionsDailyConsumed:GridOptions = {};
  public gridOptionsMaterialUtilized:GridOptions = {};
  // Nested Detailed Grid


  public themeClass: string ="ag-theme-quartz";
  public daily_consumed_columnDef: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'mrn_no', headerName:'MRN No', cellRenderer: 'agGroupCellRenderer' },
    { field: 'accession_no',headerName:'Accession No' },
    { field: 'procedure_code', headerName:'Procedure code' },
    { field: 'procedure_date',headerName:'Procedure date'},
  ];
  public detailCellRendererParams: any = {
    detailGridOptions: {
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      pagination: false,
      paginationAutoPageSize: false,
      columnDefs: [
        { field: 'item_no',headerName:'Item No'},
        { field: 'item_name',headerName:'Item Name',onCellClicked: this.cellClicked.bind(this, 'item_name') },
        { field: 'size',headerName:'Size' },
        { field: 'qty',headerName:'QTY'},
        { field: 'status',headerName:'Status'}
      ],
      defaultColDef: {
        flex: 1,
        resizable:true,
        width:100
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.sub);
    },
  } as IDetailCellRendererParams<MainData, SubData>;

  public Material_utilized_columnDef : ColDef[] = [
    { field: 'mrn_no', headerName:'MRN No', cellRenderer: 'agGroupCellRenderer' },
    { field: 'accession_no',headerName:'Accession No' },
    { field: 'procedure_code', headerName:'Procedure code' },
    { field: 'procedure_date',headerName:'Procedure date'},
  ]
  public detailCellRendererParams_MaterialUtilized: any = {
    detailGridOptions: {
      rowSelection: 'multiple',
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      pagination: false,
      paginationAutoPageSize: false,

      columnDefs: [
        { field: 'item_name',headerName:'Item Name',onCellClicked: this.cellClicked.bind(this, 'item_name')},
        { field: 'booking',headerName:'Booking' },
        { field: 'pre_procedure',headerName:'Pre procedure' },
        { field: 'intra_procedure',headerName:'Intra procedure' },
        { field: 'post_procedure',headerName:'Post procedure'}
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.sub);
    },
  } as IDetailCellRendererParams<MainData, SubData>;

  constructor(private authfakeauthenticationService: AuthfakeauthenticationService, private Http: HttpClient,private router : Router,private authFakeService : AuthfakeauthenticationService) {
    this.filter_daily_consumed = ['Used','Back to Cabinet','Damaged'];
  }

  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
    this.Http.get('assets/json/material_summary_data.json').subscribe((res: any) => {
      this.material_summary_data = res;
    });
    this.ChangeGrid('Daily consumed');
    // setTimeout(() => {
    //   this.viewitem?.show();
    // }, 1000);
  }

  cellRendered(headername: any, params: any):string {
    switch (headername) {
      case 'item_no': {
        return params.value ? `<span style="font-weight:400 !important;font-size:10px !important">${params.value}</span>` : '-nil-';
      }
      case 'item_name': {
        return params.value ? params.value : '-nil-';
      }
      case 'mrn_no': {
        return params.value ? params.value : '-nil-';
      }
      case 'accession_no': {
        if(this.material_type_name == 'Daily consumed')
        {
          console.log('Daily');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#81D152;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else if(this.material_type_name == 'Damaged')
        {
          console.log('Damaged');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#D7D311;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else if(this.material_type_name == 'Back to cabinet')
        {
          console.log('Back to cabinet');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#FF5347;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else
        {
          return params.value ?params.value: '-nil-';
        }
      }
      case 'expire_date': {
        if(this.material_type_name == 'Near expired')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#FF9D4F;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else
        {
          return params.value ?params.value: '-nil-';
        }
      }
      case 'procedure_code': {
        return params.value ? params.value : '-nil-';
      }
      case 'procedure_date': {
        return params.value ? params.value : '-nil-';
      }
      case 'quantity': {
        if(this.material_type_name == 'Low Stock')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#5B4DB7;border-radius:12px">${params.value}</span>` : '-nil-';
        }
        else if(this.material_type_name == 'Refill to Cabinet')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#A51515;border-radius:12px">${params.value}</span>` : '-nil-';
        }
        else
        return params.value ? params.value : '-nil-';
      }
      case 'lot_no': {
        if(this.material_type_name == 'Recall')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#42ADC7;border-radius:12px">${params.value}</span>` : '-nil-';
        }
        else
        return params.value ? params.value : '-nil-';
      }
      case 'store':{
        if(this.material_type_name == 'Refill to Cabinet')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#A51515;border-radius:12px">${params.value}</span>` : '-nil-';
        }
        else if(this.material_type_name == 'Low Stock')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#5B4DB7;border-radius:12px">${params.value}</span>` : '-nil-';
        }
      }
      case 'vendor_name':{
        return params.value ? params.value : '-nil-';
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


  ChangeGrid(data: any) {
    console.log(data);
    this.material_type_name = data;
    switch(this.material_type_name)
    {
      case 'Daily consumed':{
      //  this.columnDefs1 = [
      //   {
      //     field: 'item_no',
      //     headerName:'Item No',
      //     suppressMenu: false,
      //     cellRenderer: this.cellRendered.bind(this, 'item_no')
      //   },
      //   {
      //     field: 'item_name',
      //     headerName:'Item Name',
      //     filter: "agTextColumnFilter",suppressMenu: false,
      //     cellRenderer: this.cellRendered.bind(this, 'item_name')
      //   },
      //   {
      //     field: 'expire_date',
      //     headerName:'Expiry Date',
      //     filter: "agDateColumnFilter",suppressMenu: false,
      //     cellRenderer: this.cellRendered.bind(this, 'expire_date')
      //   },
      //   {
      //     field: 'procedure',
      //     headerName:'Procedure',
      //     filter: "agTextColumnFilter",suppressMenu: false,
      //     cellRenderer: this.cellRendered.bind(this, 'procedure')
      //   },
      //   {
      //     field: 'quantity',
      //     headerName:'Quantity',
      //     filter: "agTextColumnFilter",suppressMenu: false,
      //     cellRenderer: this.cellRendered.bind(this, 'quantity')
      //   },
      //  ]
      //   this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
      //     this.myGrid_1.api.setRowData(res);
      //     this.gridOptions1.api?.sizeColumnsToFit();
      //   });
        break;
      }
      case 'Damaged':{
        this.columnDefs1 = [
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
            cellRenderer: this.cellRendered.bind(this, 'accession_no'),
            onCellClicked: this.cellClicked.bind(this, 'accession_no')
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
         ]
        this.Http.get('assets/json/damaged_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);this.gridOptions1.api?.sizeColumnsToFit();
        });
        break;
      }
      case 'Back to cabinet':{
        this.columnDefs1 = [
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
            cellRenderer: this.cellRendered.bind(this, 'accession_no'),
            onCellClicked: this.cellClicked.bind(this, 'accession_no')
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
         ]
        this.Http.get('assets/json/damaged_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);this.gridOptions1.api?.sizeColumnsToFit();
        });
        break;
      }
      case 'Near expired':{
        this.columnDefs1 = [
          {
            field: 'item_no',
            headerName:'Item No',
            filter: "agTextColumnFilter", suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_no')
          },
          {
            field: 'item_name',
            headerName:'Item Name',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_name'),
            onCellClicked: this.cellClicked.bind(this, 'item_name')
          },
          {
            field: 'quantity',
            headerName:'Quantity',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'quantity')
          },
          {
            field: 'expire_date',
            headerName:'Expiry Date',
            filter: "agDateColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'expire_date')
          },
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);this.gridOptions1.api?.sizeColumnsToFit();
        });
        break;
      }
      case 'Low Stock':{
        this.columnDefs1 = [
          {
            field: 'item_no',
            headerName:'Item No',
            filter: "agTextColumnFilter", suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_no')
          },
          {
            field: 'item_name',
            headerName:'Item Name',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_name'),
            onCellClicked: this.cellClicked.bind(this, 'item_name')
          },
          {
            field: 'quantity',
            headerName:'Quantity',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'quantity')
          },
          {
            field: 'vendor_name',
            headerName:'Vendor Name',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'vendor_name')
          },
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
          this.gridOptions1.api?.sizeColumnsToFit();
        });
        break;
      }
      case 'Refill to Cabinet':{
        this.columnDefs1 = [
          {
            field: 'item_no',
            headerName:'Item No',
            filter: "agTextColumnFilter", suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_no')
          },
          {
            field: 'item_name',
            headerName:'Item Name',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_name'),
            onCellClicked: this.cellClicked.bind(this, 'item_name')
          },
          {
            field: 'quantity',
            headerName:'Quanity',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'quantity')
          },
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
          this.gridOptions1.api?.sizeColumnsToFit();
        });
        break;
      }
      case 'Recall':{
        this.columnDefs1 = [
          {
            field: 'item_no',
            headerName:'Item No',
            filter: "agTextColumnFilter", suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_no')
          },
          {
            field: 'item_name',
            headerName:'Item Name',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_name'),
            onCellClicked: this.cellClicked.bind(this, 'item_name')
          },
          {
            field: 'lot_no',
            headerName:'Lot No',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'lot_no')
          },
          {
            field: 'expire_date',
            headerName:'Expiry Date',
            filter: "agDateColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'expire_date')
          },
          {
            field: 'quantity',
            headerName:'Quantity',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'quantity')
          }
        ];
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
          this.gridOptions1.api?.sizeColumnsToFit();
        });
        break;
      }
    }
    this.showMiniGrid = true;
    this.reduceTableSize = true;
  }



  ClosematerialGrid()
  {
    this.showMiniGrid = false;
    this.reduceTableSize = false;
  }

  navigateTodetailedView()
  {
    this.router.navigate(['/material-management/viewfullgrid'])
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    console.log('event', params);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    // setTimeout(() => {
    //   params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    // }, 0);
  }
  onGridReady_dailyconsumedgrid(params: GridReadyEvent) {
    this.gridOptionsDailyConsumed = params;
    this.Http.get<MainData[]>(
        'assets/json/daily_consumed_grid.json'
      )
      .subscribe((data) => {
        this.DailyConsumedGridData = data;
        this.gridOptionsDailyConsumed.api?.sizeColumnsToFit();
      });
  }

  onGridReady_materialUtilizedGrid(params: GridReadyEvent) {
    this.gridOptionsMaterialUtilized = params;
    this.Http.get<MainData[]>(
        'assets/json/material_utilized_grid.json'
      )
      .subscribe((data) => {
        this.MaterialUtilizedGridData = data;
        this.gridOptionsMaterialUtilized.api?.sizeColumnsToFit();
      });
  }

  enable_edit:boolean = false;
  Enable_Edit(){
    this.enable_edit =! this.enable_edit;
  }

}
