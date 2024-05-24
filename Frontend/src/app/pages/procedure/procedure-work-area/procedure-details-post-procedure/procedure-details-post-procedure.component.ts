import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AddQuantityComponent } from '../add-quantity/add-quantity.component';
import { DropDownButtonComponent } from '../drop-down-button/drop-down-button.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-procedure-details-post-procedure',
  templateUrl: './procedure-details-post-procedure.component.html',
  styleUrls: ['./procedure-details-post-procedure.component.scss']
})
export class ProcedureDetailsPostProcedureComponent {

  @ViewChild('StoreItem_Grid_1') StoreItem_Grid_1: AgGridAngular;
  @ViewChild('StoreItem_Grid_2') StoreItem_Grid_2: AgGridAngular;
  @ViewChild('StoreItem_Grid_3') StoreItem_Grid_3: AgGridAngular;
  @ViewChild('StoreItem_Grid_4') StoreItem_Grid_4: AgGridAngular;
  @ViewChild('viewnote')viewnote:ModalDirective;
  @ViewChild('viewitem')viewitem:ModalDirective;
  @Output() save = new EventEmitter<boolean>();
  @Input() StageValue: any;
  @Input() StageValue: any
  @Input() SelectedIndex : any;;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  myCartData : any = [];
  hideViewOnlyMode : boolean = true;
  StoreItemGridData:any = [];
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
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No rows to show</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: false,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };


  constructor(private http: HttpClient,private allService : AllServicesService, private toastr : ToastrService) { }

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

  columnDefs1: ColDef[] = [];


  cellRendered(headerName: any, params: any) {
    switch (headerName) {
      case'item.item_number':{
        return params.value;
      }
      case 'item.item_name': {
        return params.value;
      }
      case 'item.size': {
        return params.value;
      }
      case 'no_of_qty': {
        return params.value;
      }
      case 'notes': {
        return `<button class="btn-new" style="width: 70px !important;
        height: 26px !important;
        padding: 4px 8px 5px 8px !important;">View Note</button>`
      }
    }
  }

  SelectedItem:any = [];
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'item.item_name':{
        this.viewitem?.show();
        this.OpenModal('')
        break;
      }
      case 'notes':{
        console.log(params.data);
        this.SelectedItem = params.data;
        this.OpenModal('Notes');
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

  ngOnChanges(changes: SimpleChanges) {
    console.log('Post Changes',changes.SelectedIndex.currentValue);
    if(changes.SelectedIndex.currentValue == 4){
      console.log('ininini');
      this.SwitchTab('Used');
      this.hideViewOnlyMode = true;
    }
  }

  SwitchTab(type:any){
    let PatientID = localStorage.getItem('PatientID');
    let procedurename = localStorage.getItem('Procedure');
   switch(type){
     case 'Used':{
      this.columnDefs1 = [
        {
          field: 'item.item_number',
          headerName:'Item No',
          width:100,
          filter: "agTextColumnFilter", suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_number')
        },
        {
          field: 'item.item_name',
          headerName:'Item Name',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_name'),
          onCellClicked:this.cellClicked.bind(this,'item.item_name')
        },
        {
          field: 'item.size',
          headerName:'Size',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.size')
        },
        {
          field: 'no_of_qty',
          headerName:'Quantity',
          width:100,
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'no_of_qty')

        },
        {
          field: 'notes',
          headerName:'Note',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'notes'),
          onCellClicked:this.cellClicked.bind(this,'notes')
        },
      ]

      this.allService.GetPreProcedureUsedGridData(PatientID,procedurename).subscribe({
        next:(res:any)=>{
         if(res.status == 'Success'){
          console.log(res);
          this.StoreItem_Grid_1.api?.setRowData(res.used_data);
          this.StoreItem_Grid_1.api?.sizeColumnsToFit();
         }
        },
        error:(res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      });
      break;
     }
     case 'Returned':{
      this.columnDefs1 = [
        {
          field: 'item.item_number',
          headerName:'Item No',
          width:100,
          filter: "agTextColumnFilter", suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_number')
        },
        {
          field: 'item.item_name',
          headerName:'Item Name',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_name'),
          onCellClicked:this.cellClicked.bind(this,'item.item_name')
        },
        {
          field: 'item.size',
          headerName:'Size',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.size')
        },
        {
          field: 'no_of_qty',
          headerName:'Quantity',
          width:100,
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'no_of_qty')

        },
        {
          field: 'notes',
          headerName:'Note',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'notes'),
          onCellClicked:this.cellClicked.bind(this,'notes')
        },
      ]

      this.allService.GetProcedureReturnedGridData(PatientID,procedurename).subscribe({
        next:(res:any)=>{
         if(res.status == 'Success'){
          console.log(res);
          this.StoreItem_Grid_2.api?.setRowData(res.returned_data);
          this.StoreItem_Grid_2.api?.sizeColumnsToFit();
         }
        },
        error:(res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      })
      break;
     }
     case 'Damaged':{
      this.columnDefs1 = [
        {
          field: 'item.item_number',
          headerName:'Item No',
          width:100,
          filter: "agTextColumnFilter", suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_number')
        },
        {
          field: 'item.item_name',
          headerName:'Item Name',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_name'),
          onCellClicked:this.cellClicked.bind(this,'item.item_name')
        },
        {
          field: 'item.size',
          headerName:'Size',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.size')
        },
        {
          field: 'no_of_qty',
          headerName:'Quantity',
          width:100,
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'no_of_qty')

        },
        {
          field: 'notes',
          headerName:'Note',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'notes'),
          onCellClicked:this.cellClicked.bind(this,'notes')
        },
      ]

      this.allService.GetProcedureDamagedGridData(PatientID,procedurename).subscribe({
        next:(res:any)=>{
         if(res.status == 'Success'){
          console.log(res);
          this.StoreItem_Grid_3.api?.setRowData(res.damaged_data);
          this.StoreItem_Grid_3.api?.sizeColumnsToFit();
         }
        },
        error:(res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      })
      break;
     }
     case 'Waste':{
      this.columnDefs1 = [
        {
          field: 'item.item_number',
          headerName:'Item No',
          width:100,
          filter: "agTextColumnFilter", suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_number')
        },
        {
          field: 'item.item_name',
          headerName:'Item Name',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.item_name'),
          onCellClicked:this.cellClicked.bind(this,'item.item_name')
        },
        {
          field: 'item.size',
          headerName:'Size',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'item.size')
        },
        {
          field: 'no_of_qty',
          headerName:'Quantity',
          width:100,
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'no_of_qty')

        },
        {
          field: 'notes',
          headerName:'Note',
          filter: "agTextColumnFilter",suppressMenu: false,
          cellRenderer: this.cellRendered.bind(this, 'notes'),
          onCellClicked:this.cellClicked.bind(this,'notes')
        },
      ]

      this.allService.GetProcedureWastedGridData(PatientID,procedurename).subscribe({
        next:(res:any)=>{
         if(res.status == 'Success'){
          console.log(res);
          this.StoreItem_Grid_4.api?.setRowData(res.wasted_data);
          this.StoreItem_Grid_4.api?.sizeColumnsToFit();
         }
        },
        error:(res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        }
      })
      break;
     }
   }
  }

  OpenModal(type:any){
    switch(type){
      case 'Notes':{
        this.viewnote?.show();
        break;
      }
      case 'viewItem':{
        this.viewitem?.show();
        break;
      }
    }
  }

  CloseModal(type:any){
    switch(type){
      case 'Notes':{
        this.viewnote?.hide();
        break;
      }
      case 'viewItem':{
        this.viewitem?.hide();
        break;
      }
    }
  }

  ngAfterViewInit(): void {

 }
 onSaveCheckBoxes() {
  if (!this.allService.areAllChecked()) {
    this.toastr.error('Please select all checkboxes before saving.','UnSuccessful',{
      positionClass: 'toast-top-center',
      timeOut: 5000,
    });
  }else{
    this.save.emit(true);
    this.allService.clearCheckBoxes();
  }
}

}
