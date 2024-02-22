import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AddQuantityComponent } from '../add-quantity/add-quantity.component';
import { DropDownButtonComponent } from '../drop-down-button/drop-down-button.component';
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-procedure-details-intra-procedure',
  templateUrl: './procedure-details-intra-procedure.component.html',
  styleUrls: ['./procedure-details-intra-procedure.component.scss']
})
export class ProcedureDetailsIntraProcedureComponent {
  @ViewChild('StoreItem_Grid') StoreItem_Grid: AgGridAngular;
  @ViewChild('addnewtem') addnewtem : ModalDirective;
  @ViewChild('addnote') addnote : ModalDirective;
  @ViewChild('viewitem') viewitem : ModalDirective;
  @Input() StageValue: any;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  myCartData : any = [];
  hideViewOnlyMode : boolean = false;
  StoreItemGridData:any = [
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "total_qty":"40",
      "action":true,
      "note":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "total_qty":"20",
      "action":true,
      "note":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "total_qty":"90",
      "action":true,
      "note":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "total_qty":"28",
      "action":true,
      "note":true
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
    this.http.get('assets/json/main-tabs4.json').subscribe((res: any) => {
      this.mainTabsValue = res;
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
      cellRenderer: this.cellRendered.bind(this, 'item_name'),
      onCellClicked:this.cellClicked.bind(this,'item_name')
    },
    {
      field: 'qty',
      headerName:'Qty',
      width:100,
      cellRenderer: AddQuantityComponent,
    },
    {
      field: 'total_qty',
      headerName:'Total Qty',
      width:100,
      cellStyle:(params:any):any=>{
        return {'text-align':'center'};
      },
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'total_qty')
    },
    {
      field: 'action',
      headerName:'Action',
      width:100,
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: DropDownButtonComponent,
    },
    {
      field: 'note',
      headerName:'Note',
      width:100,
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'note'),
      onCellClicked:this.cellClicked.bind(this,'note')
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

      case 'total_qty': {
        return params.value;
      }
      case 'note': {
       if(params.value){
        return `<img src="assets/images/add-new-item.svg" style="width:16px;height:16px">`
       }
      }
      case 'action': {
        return params.value;
       }
    }
  }
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'item_name':{
        this.viewitem?.show();
        break;
      }
      case 'note':{
        this.addnote.show();
        break;
      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;

  }

  onSelectionChanged(params: any) {

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

  OpenAddNewItemModal(){
    this.addnewtem?.show();
  }


  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.StoreItem_Grid.api.sizeColumnsToFit();
    // }, 2000);
 }
}
