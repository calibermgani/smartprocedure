import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, FirstDataRenderedEvent, GridApi, GridOptions, GridReadyEvent, IDetailCellRendererParams, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
  selector: 'app-daily-consumed',
  templateUrl: './daily-consumed.component.html',
  styleUrls: ['./daily-consumed.component.scss']
})
export class DailyConsumedComponent implements OnInit{

  @ViewChild('viewitem') viewitem: ModalDirective;
  @ViewChild('myGrid') myGrid: AgGridAngular;
  public gridApi_1!: GridApi;
  filter_daily_consumed:string[];
  DailyConsumedGridData:any[];

  ngOnInit(){}

  constructor(private http : HttpClient){
    this.filter_daily_consumed = ['Used','Back to Cabinet','Damaged'];
  }

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

  public gridOptionsDailyConsumed:GridOptions = {
    suppressRowClickSelection:true,
  };
  public gridOptionsMaterialUtilized:GridOptions = {
    suppressRowClickSelection:true,
  };
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

      });
  }

  cellClicked(headername:any,params:any){
    switch (headername) {
      case 'item_name': {
        this.viewitem?.show();
      }
  }
}

ngAfterViewInit(): void {
  this.myGrid.api.sizeColumnsToFit();
}


}
