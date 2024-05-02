import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AddQuantityComponent } from '../add-quantity/add-quantity.component';
import { DropDownButtonComponent } from '../drop-down-button/drop-down-button.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { ToastrService } from 'ngx-toastr';



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
  hideViewOnlyMode : boolean = true;
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
    suppressRowClickSelection:true,
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


  constructor(private http: HttpClient,private allService : AllServicesService,private toastr : ToastrService) { }

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
    });


    let PatientID = localStorage.getItem('PatientID');

    this.allService.GetIntraProcedureList(PatientID).subscribe({
      next:((res:any)=>{
        if(res){
          console.log('IntraProcedure',res);
        this.StoreItemGridData = res.intra_procedure_index;
        this.StoreItem_Grid.api.sizeColumnsToFit();
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
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
      field: 'intra_procedure_items.item_number',
      headerName:'Item No',
      filter: "agTextColumnFilter", suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'intra_procedure_items.item_number')
    },
    {
      field: 'intra_procedure_items.item_name',
      headerName:'Item Name',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'intra_procedure_items.item_name'),
      onCellClicked:this.cellClicked.bind(this,'intra_procedure_items.item_name')
    },
    {
      field: 'qty',
      headerName:'Qty',
      cellRenderer: AddQuantityComponent,
    },
    {
      field: 'quantity',
      headerName:'Total Qty',
      cellStyle:(params:any):any=>{
        return {'text-align':'center'};
      },
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'quantity')
    },
    {
      field: 'action',
      headerName:'Action',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: DropDownButtonComponent,
    },
    {
      field: 'note',
      headerName:'Note',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'note'),
      onCellClicked:this.cellClicked.bind(this,'note')
    },
  ];


  cellRendered(headerName: any, params: any) {
    switch (headerName) {
      case'intra_procedure_items.item_number':{
        return params.value;
      }
      case 'intra_procedure_items.item_name': {
        return params.value;
      }

      case 'quantity': {
        return params.value;
      }
      case 'note': {
        return `<img src="assets/images/add-new-item.svg" style="width:16px;height:16px">`
      }
    }
  }
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'intra_procedure_items.item_name':{
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
    let PatientID = localStorage.getItem('PatientID');

    this.allService.GetIntraProcedureList(PatientID).subscribe({
      next:((res:any)=>{
        console.log('IntraProcedure',res);

        this.StoreItem_Grid.api.sizeColumnsToFit();
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
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
    setTimeout(() => {
      this.StoreItem_Grid.api.sizeColumnsToFit();
    }, 1000);
 }
}
