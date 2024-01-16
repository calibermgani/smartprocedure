import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-view-full-grid',
  templateUrl: './view-full-grid.component.html',
  styleUrls: ['./view-full-grid.component.scss']
})
export class ViewFullGridComponent implements OnInit {

  current_Procedure_filters: string[];
  columnDefs1:ColDef[];
  UpdatedMaterialValue:any;

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
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

  ngOnInit(){
  }

  constructor(private http: HttpClient,private router : Router,private AuthFakeService : AuthfakeauthenticationService,private cdr: ChangeDetectorRef) {
    this.current_Procedure_filters = [];
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
  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    console.log('event', params);
  }

  GoBackTodashboard() {
    this.router.navigate(['material-management/dashboard'])
  }

  ngAfterViewInit(): void {
    this.AuthFakeService.UpdatedColumnDef.subscribe((res:any)=>{
      this.columnDefs1 = res;
      console.log('res',res);
      console.log('columnDefs1',this.columnDefs1);
      if(this.columnDefs1.length>0)
      {
        console.log('1');
        this.columnDefs1 = res;
        this.http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
          this.gridOptions1.api?.sizeColumnsToFit();
        });
      }
      else
      {
        this.columnDefs1 = [
          {
            field: 'item_no',
            headerName:'Item No',
            suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_no')
          },
          {
            field: 'item_name',
            headerName:'Item Name',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'item_name')
          },
          {
            field: 'expire_date',
            headerName:'Expiry Date',
            filter: "agDateColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'expire_date')
          },
          {
            field: 'procedure',
            headerName:'Procedure',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'procedure')
          },
          {
            field: 'quantity',
            headerName:'Quantity',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'quantity')
          },
        ];
        this.gridOptions1.api?.sizeColumnsToFit();
        this.myGrid_1.api.setRowData(null);
      }
      this.cdr.detectChanges();
    });
    this.AuthFakeService.UpdatedMaterialValue.subscribe((res:any)=>{
      this.UpdatedMaterialValue = res;
      console.log('Updatedmaterialvalue',this.UpdatedMaterialValue);
    });
  }
}
