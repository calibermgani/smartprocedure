import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';

@Component({
  selector: 'app-procedure-details-pre-procedure',
  templateUrl: './procedure-details-pre-procedure.component.html',
  styleUrls: ['./procedure-details-pre-procedure.component.scss']
})
export class ProcedureDetailsPreProcedureComponent {


  @ViewChild('StoreItem_Grid') StoreItem_Grid: AgGridAngular;
  @Input() StageValue: any;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  myCartData : any = [];
  Addtofavourite_bool:boolean = false;
  hideViewOnlyMode : boolean = false;
  StoreItemGridData:any = [
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    }
  ];
  isFirstOpen: boolean = false;
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: false,
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
    pagination: false,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/json/main-tabs3.json').subscribe((res: any) => {
      this.mainTabsValue = res;
      // this.mainTabsValue.forEach((element,index) => {
      //   this.subTabs.push(element[index].subtabs);
      // });
      for(let i=0;i<res.length;i++)
      {
        if (res[i].subtabs) {
          this.subTabs.push(res[i].subtabs);
        }
      }
    });

    this.http.get('assets/json/viewOnlyMode.json').subscribe((res: any) => {
      this.header_viewOnlymode = res;
    });

    this.http.get('assets/json/mycart-data.json').subscribe((res:any)=>{
      this.myCartData = res;
    })

  }

  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10
    },
    {
      field: 'item_no',
      headerName:'Item No',
      width:100,
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
      field: 'qty',
      headerName:'Qty',
      width:100,
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'qty')
    },
    {
      field: 'action',
      headerName:'Action',
      width:100,
      pinned:"right",
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'action'),
      onCellClicked:this.cellClicked.bind(this,'action')
    },
  ];

  cellRendered(headerName: any, params: any) {
    switch (headerName) {
      case'item_no':{
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'qty': {
        return params.value;
      }
      case 'action': {
       if(params.value){
        return `<img src="assets/images/storeItem.svg" style="width:16px;height:16px">`
       }
      }
    }
  }
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'action':{

      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    // this.http.get('assets/json/damaged_grid.json').subscribe((res:any)=>{
    //   this.StoreItemGridData = res;
    // })
  }


  AddToFavourite(index:number,value:boolean){
    this.myCartData[index].fav = !value;
  }
  HideViewOnlyArea(){
    this.hideViewOnlyMode = true;
  }
  ShowViewOnlyArea(){
    this.hideViewOnlyMode = false
  }


  ngAfterViewInit(): void {
    // this.StoreItem_Grid.api?.sizeColumnsToFit();
 }

}
