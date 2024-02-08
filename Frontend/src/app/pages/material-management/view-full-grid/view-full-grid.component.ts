import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import 'ag-grid-enterprise';

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
  selector: 'app-view-full-grid',
  templateUrl: './view-full-grid.component.html',
  styleUrls: ['./view-full-grid.component.scss']
})
export class ViewFullGridComponent implements OnInit {

  current_Procedure_filters: string[];
  filter_daily_consumed : string[];
  DailyConsumedGridData : any = [];
  columnDefs1:ColDef[];
  UpdatedMaterialValue:any;

  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
  };

    // Nested Detailed Grid


  public gridOptionsMaterialUtilized:GridOptions = {};
  gridOptionsDailyConsumed: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No rows to Show</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination:true,
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
    defaultToolPanel:null,
  };

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
        { field: 'item_name',headerName:'Item Name' },
        { field: 'size',headerName:'Size' },
        { field: 'qty',headerName:'QTY'}
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
        { field: 'item_name',headerName:'Item Name'},
        { field: 'booking',headerName:'Booking' },
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

  ngOnInit(){
  }

  constructor(private http: HttpClient,private router : Router,private AuthFakeService : AuthfakeauthenticationService,private cdr: ChangeDetectorRef) {
    this.current_Procedure_filters = [];
    this.filter_daily_consumed = ['Used','Back to Cabinet','Damaged'];
  }

  cellRendered(headername: any, params: any):string {
    switch (headername) {
      case 'item_no': {
        return params.value ? `<span style="font-weight:400 !important;font-size:10px !important">${params.value}</span>` : '-nil-';
      }
      case 'item_name': {
        if(this.UpdatedMaterialValue == 'Daily consumed')
        {
          console.log('Daily');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#81D152;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else if(this.UpdatedMaterialValue == 'Damaged')
        {
          console.log('Damaged');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#D7D311;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else if(this.UpdatedMaterialValue == 'Returned')
        {
          console.log('Damaged');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#FF5347;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else
        {
          return params.value ?params.value: '-nil-';
        }
      }
      case 'expire_date': {
        if(this.UpdatedMaterialValue == 'Expiry')
        {
          console.log('Daily');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#FF9D4F;border-radius:6px">${params.value}</span>` : '-nil-';
        }
        else
        {
          return params.value ?params.value: '-nil-';
        }
      }
      case 'procedure': {
        return params.value ? params.value : '-nil-';
      }
      case 'quantity': {
        if(this.UpdatedMaterialValue == 'Low Stock')
        {
          console.log('low');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#5B4DB7;border-radius:12px">${params.value}</span>` : '-nil-';
        }
        else
        return params.value ? params.value : '-nil-';
      }
      case 'lot_no': {
        if(this.UpdatedMaterialValue == 'Recall')
        {
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#42ADC7;border-radius:12px">${params.value}</span>` : '-nil-';
        }
        else
        return params.value ? params.value : '-nil-';
      }
    }
  }


  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    // setTimeout(() => {
    //   params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    // }, 0);
  }
  onGridReady_dailyconsumedgrid(params: GridReadyEvent) {
    this.gridOptionsDailyConsumed = params;
    this.http.get<MainData[]>(
        'assets/json/daily_consumed_grid.json'
      )
      .subscribe((data) => {
        this.DailyConsumedGridData = data;
        this.gridOptionsDailyConsumed.api?.sizeColumnsToFit();
      });
  }



  GoBackTodashboard() {
    this.router.navigate(['material-management/dashboard'])
  }

  ngAfterViewInit(): void {

  }
}
