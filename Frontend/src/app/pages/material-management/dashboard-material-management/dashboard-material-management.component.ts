import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-dashboard-material-management',
  templateUrl: './dashboard-material-management.component.html',
  styleUrls: ['./dashboard-material-management.component.scss'],
})
export class DashboardMaterialManagementComponent implements OnInit {

  material_summary_data: any = [];
  recent_activities: any = [];
  stock_levels: any = [];
  materialUsed:any = [];
  columnDefs1: ColDef[];

  showMiniGrid:boolean = false;
  reduceTableSize:boolean = false;
  hideOtherColumns:boolean = false;
  material_type_name:string = '';

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
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };

  constructor(private authfakeauthenticationService: AuthfakeauthenticationService, private Http: HttpClient,private router : Router,private authFakeService : AuthfakeauthenticationService) { }

  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
    this.Http.get('assets/json/material_summary_data.json').subscribe((res: any) => {
      this.material_summary_data = res;
    })
    this.Http.get('assets/json/recent_activities.json').subscribe((res: any) => {
      this.recent_activities = res;
    });
    this.Http.get('assets/json/stock_levels.json').subscribe((res: any) => {
      this.stock_levels = res;
    })
    this.Http.get('assets/json/material_used.json').subscribe((res: any) => {
      console.log('Response Grid', res)
      this.materialUsed = res;
    })
  }

  cellRendered(headername: any, params: any):string {
    switch (headername) {
      case 'item_no': {
        return params.value ? `<span style="font-weight:400 !important;font-size:10px !important">${params.value}</span>` : '-nil-';
      }
      case 'item_name': {
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
        else if(this.material_type_name == 'Returned')
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
        if(this.material_type_name == 'Expiry')
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
        if(this.material_type_name == 'Low Stock')
        {
          console.log('low');
          return params.value ? `<span style="padding:2px 10px 2px 10px;color:#fff;background:#5B4DB7;border-radius:12px">${params.value}</span>` : '-nil-';
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
    }
  }


  ChangeGrid(data: any) {
    console.log(data);
    this.material_type_name = data;
    switch(this.material_type_name)
    {
      case 'Daily consumed':{
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
       ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
        });
        console.log(this.columnDefs1);

        break;
      }
      case 'Damaged':{
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
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
        });
        break;
      }
      case 'Expiry':{
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
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
        });
        break;
      }
      case 'Returned':{
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
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
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
          {
            field: 'lot_no',
            headerName:'LOT No',
            filter: "agTextColumnFilter",suppressMenu: false,
            cellRenderer: this.cellRendered.bind(this, 'lot_no')
          }
        ];
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
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
         ]
        this.Http.get('assets/json/material_summary_grid.json').subscribe((res: any) => {
          this.myGrid_1.api.setRowData(res);
        });
        break;
      }
    }
    this.showMiniGrid = true;
    this.reduceTableSize = true;
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    console.log('event', params);
  }

  ClosematerialGrid()
  {
    this.showMiniGrid = false;
    this.reduceTableSize = false;
  }

  go()
  {
    this.authFakeService.UpdatingMaterialfn(this.material_type_name);
    this.authFakeService.UpdatingColumnDeffn(this.columnDefs1);
    this.router.navigate(['/material-management/viewfullgrid'])
  }

  ngOnDestroy() {
    // Clean up the AG-Grid instance
    // if (this.gridOptions1.api) {
    //   this.gridOptions1.api.destroy();
    // }
    // if (this.myGrid_1) {
    //   this.gridApi_1.destroy();
    //   this.gridApi_1 = null; // Ensure to clear the reference
    // }
  }
}
