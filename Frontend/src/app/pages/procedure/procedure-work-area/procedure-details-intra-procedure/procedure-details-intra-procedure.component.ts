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
  @Input() SelectedIndex : any;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  myCartData : any = [];
  CurrentPatientDetails : any = [];
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
    suppressRowClickSelection:true,
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Wait</span>',
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


    // if(this.SelectedIndex == 2){
    //   let PatientID = localStorage.getItem('PatientID');
    //   this.allService.GetSpecificPatientDetails(PatientID).subscribe({
    //     next:((res:any)=>{
    //       console.log(res);
    //       if(res.status == 'Success'){
    //        this.CurrentPatientDetails = res.patient;

    //        this.allService.GetIntraProcedureList(PatientID,this.CurrentPatientDetails).subscribe({
    //         next:((res:any)=>{
    //           if(res){
    //             console.log('IntraProcedure',res);
    //           this.StoreItemGridData = res.intra_procedure_index;
    //           this.StoreItem_Grid.api.sizeColumnsToFit();
    //           }
    //         }),
    //         error:((res:any)=>{
    //           this.toastr.error(`Something went wrong`,'UnSuccessful',{
    //             positionClass: 'toast-top-center',
    //             timeOut:2000,
    //           });
    //         })
    //       })


    //       }
    //     }),
    //     error:((res:any)=>{
    //         this.toastr.error(`Something went wrong`,'UnSuccessful',{
    //         positionClass: 'toast-top-center',
    //         timeOut:2000,
    //       });
    //     })
    //   });
    // }

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
      // field: 'qty',
      headerName:'Qty',
      cellRenderer: AddQuantityComponent,
    },
    {
      field: 'total_no_of_qty',
      headerName:'Total Qty',
      cellStyle:(params:any):any=>{
        return {'text-align':'center'};
      },
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'total_no_of_qty')
    },
    {
      // field: 'action',
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

      case 'total_no_of_qty': {
        return params.value;
      }
      case 'note': {
        return `<img src="assets/images/add-new-item.svg" style="width:16px;height:16px" class="pointer">`
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Intra Changes',changes.SelectedIndex.currentValue);
    if(changes.SelectedIndex.currentValue == 3){
      this.hideViewOnlyMode = true;
      let PatientID = localStorage.getItem('PatientID');
      let procedurename = localStorage.getItem('Procedure');
      let MRN_NO = localStorage.getItem('MRN_NO');
      setTimeout(()=>{
        this.allService.GetIntraProcedureList(PatientID,MRN_NO,procedurename).subscribe({
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
      },1000)
    }
  }

  onSelectionChanged(params: any) {
    console.log(this.StoreItem_Grid.api?.getSelectedRows());

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

  // getCellRendererInstances() {
  //   const instances = [];
  //   this.gridApi_1.forEachNode((node) => {
  //     const renderers = this.gridApi_1.getCellRendererInstances({
  //     });
  //     instances.push(renderers[0]);
  //     console.log(renderers);
  //   });
  //   console.log('Cell Renderer Instances:', instances);
  // }


  StoreIntraProcedureCheckOut(){
    let QtyValue = localStorage.getItem('Quantity');
    console.log(parseInt(QtyValue));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.StoreItem_Grid.api.sizeColumnsToFit();
      // this.getCellRendererInstances();
    }, 1000);
 }
}
