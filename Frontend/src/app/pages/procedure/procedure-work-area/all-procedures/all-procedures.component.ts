import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-all-procedures',
  templateUrl: './all-procedures.component.html',
  styleUrls: ['./all-procedures.component.scss']
})
export class AllProceduresComponent implements OnInit {

  @ViewChild('addnote') addnote:ModalDirective;
  @ViewChild('addnewtem') addnewtem:ModalDirective;
  @ViewChild('viewitem') viewitem:ModalDirective;
  @ViewChild('viewnote') viewnote:ModalDirective;
  @ViewChild('StoreItem_Grid') StoreItem_Grid: AgGridAngular;
  stepperData: any;
  VettingCondition:boolean = false;
  BookingCondition:boolean = false;
  PreProcedureCondition:boolean = false;
  IntraProcedureCondition:boolean = false;
  PostProcedureCondition:boolean = false;
  procedureAlertsData:any;
  myCartData: any = [];
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

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('assets/json/procedure-stage.json').subscribe((res: any) => {
      this.stepperData = res;
      console.log(this.stepperData);
      this.stepperData.forEach(element => {
        if(element.title == 'Vetting'){
          this.VettingCondition = true;
        }
        else if(element.title == 'Booking'){
          this.BookingCondition = true;
        }
        else if(element.title == 'Pre-procedure'){
          this.PreProcedureCondition = true;
        }
        else if(element.title == 'Intra-procedure'){
          this.IntraProcedureCondition = true;
        }
        else if(element.title == 'Post-procedure'){
          this.PostProcedureCondition = true;
        }
      });
    });
    this.http.get('assets/json/procedure-alerts.json').subscribe((res:any)=>{
      this.procedureAlertsData = res;
    });

    this.http.get('assets/json/mycart-data.json').subscribe((res:any)=>{
      this.myCartData = res;
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
  }




  OpenViewNote_Modal(value:boolean){
    if(value){
      console.log(value);

      this.addnote?.show();
    }
    else{
      this.addnote.hide();
    }
  }

  OpenAddItem_Modal(value:boolean){
    if(value){
      this.addnewtem?.show();
    }
    else{
      this.addnewtem.hide();
    }
  }

  OpenViewItem_Modal(value:boolean){
    if(value){
      console.log(value);

      this.viewitem?.show();
    }
    else{
      this.viewitem.hide();
    }
  }
  OpenViewItemModal_Postprocedure(value:boolean){
    if(value){
      this.viewitem?.show();
    }
    else{
      this.viewitem.hide();
    }
  }

  OpenViewNoteModal_Postprocedure(value:boolean){
    if(value){
      this.viewnote?.show();
    }
    else{
      this.viewnote.hide();
    }
  }

  AddToFavourite(index:number,value:boolean){
    this.myCartData[index].fav = !value;
  }
}
