import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AddQuantityComponent } from '../add-quantity/add-quantity.component';
import { DropDownButtonComponent } from '../drop-down-button/drop-down-button.component';


@Component({
  selector: 'app-procedure-details-post-procedure',
  templateUrl: './procedure-details-post-procedure.component.html',
  styleUrls: ['./procedure-details-post-procedure.component.scss']
})
export class ProcedureDetailsPostProcedureComponent {

  @ViewChild('StoreItem_Grid') StoreItem_Grid: AgGridAngular;
  @Input() StageValue: any;
  @Output() OpenViewNoteEvent_Postprocedure = new EventEmitter;
  @Output() OpenViewItemEvent_Postprocedure = new EventEmitter;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  myCartData : any = [];
  hideViewOnlyMode : boolean = true;
  openViewModal_Postprocedure:boolean = false;
  openViewNote_Postprocedure:boolean = false;
  StoreItemGridData:any = [
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "quantity":"50",
      "size":"6Fr x 12 cm",
      "note":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "quantity":"50",
      "size":"6Fr x 12 cm",
      "note":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "quantity":"50",
      "size":"6Fr x 12 cm",
      "note":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "quantity":"50",
      "size":"6Fr x 12 cm",
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
    this.http.get('assets/json/main-tabs5.json').subscribe((res: any) => {
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
      field: 'size',
      headerName:'Size',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'size')
    },
    {
      field: 'quantity',
      headerName:'Quantity',
      width:100,
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'quantity')

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
      case 'size': {
        return params.value;
      }
      case 'quantity': {
        return params.value;
      }
      case 'note': {
       if(params.value){
        return `<div class="d-flex"><button class="btn-new" style="width: 70px !important;
        height: 26px !important;
        padding: 4px 8px 5px 8px !important;
        text-align: center;">View Note</button></div>`
       }
      }
    }
  }
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'item_name':{
        this.openViewModal_Postprocedure = true;
        this.OpenViewItemEvent_Postprocedure.emit(this.openViewModal_Postprocedure);
        break;
      }
      case 'note':{
        this.openViewNote_Postprocedure = true;
        this.OpenViewNoteEvent_Postprocedure.emit(this.openViewNote_Postprocedure);
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



  ngAfterViewInit(): void {
    // setTimeout(() => {
      this.StoreItem_Grid.api.sizeColumnsToFit();
    // }, 2000);
 }
}
