import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SelectionChangedEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

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
  CurrentPatientDetails : any = [];
  MyCartform : UntypedFormGroup;
  Addtofavourite_bool:boolean = false;
  hideViewOnlyMode : boolean = false;
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

  constructor(private http: HttpClient,private allService : AllServicesService,private toastr : ToastrService,private formbuilder : UntypedFormBuilder) { }

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

    // this.http.get('assets/json/mycart-data.json').subscribe((res:any)=>{
    //   this.myCartData = res;
    // })

    let PatientID = localStorage.getItem('PatientID');
    this.allService.GetSpecificPatientDetails(PatientID).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
         this.CurrentPatientDetails = res.patient;
        }
        return 0;
      }),
      error:((res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    });

    this.allService.GetMyCartDetails(this.CurrentPatientDetails).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          console.log(res);
          this.myCartData = res.my_cart.procedure_item;
          this.CreateGroup();
        }
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
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
      field: 'item_number',
      headerName:'Item No',
      width:110,
      filter: "agTextColumnFilter", suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'item_number')
    },
    {
      field: 'item_name',
      headerName:'Item Name',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'item_name')
    },
    {
      field: 'store_qty',
      headerName:'Qty',
      width:100,
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'store_qty')
    },
    {
      field: 'action',
      headerName:'',
      width:100,
      pinned:"right",
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'action'),
      onCellClicked:this.cellClicked.bind(this,'action')
    },
  ];

  cellRendered(headerName: any, params: any) {
    switch (headerName) {
      case'item_number':{
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'store_qty': {
        return params.value;
      }
      case 'action': {
        return `<div class="pointer" style="position:relative;right:8px"><img src="assets/images/storeItem.svg" style="width:16px;height:16px"></div>`
      }
    }
  }
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'action':{
        let SelectedRow = this.gridApi_1.getSelectedRows()
        let item_details : Object = {};
        console.log(this.StoreItemGridData);
        this.StoreItemGridData.forEach((element,index) => {
          if(element.id == SelectedRow[0].id){
            this.StoreItemGridData.splice(index,1)
          }
        });
        console.log(this.StoreItemGridData);
        this.StoreItem_Grid.api?.setRowData(this.StoreItemGridData);
       console.log(SelectedRow[0]);
       console.log(this.myCartData.length);
       item_details = { 'item_id': SelectedRow[0].id,'item_details' : SelectedRow[0]};
       console.log(item_details);

       this.myCartData.push(item_details);
       console.log(this.myCartData);
       this.CreateGroup();
      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    // this.http.get('assets/json/damaged_grid.json').subscribe((res:any)=>{
    //   this.StoreItemGridData = res;
    // })
  }

  SelectedRowData:any = [];
  OnGridSelection(event:SelectionChangedEvent){
    this.SelectedRowData = this.gridApi_1.getSelectedRows();
    console.log(this.SelectedRowData);
  }

  AddToCart(){
    let item_details : Object = {};
    this.SelectedRowData.forEach((element,index) => {
      console.log(element,index);
      item_details = { 'item_id': element.id,'item_details' : element};
      this.myCartData.push(item_details);
      this.StoreItemGridData.splice(index,1);
    });
    console.log(this.myCartData);
    this.StoreItem_Grid.api?.setRowData(this.StoreItemGridData);
    this.CreateGroup();
  }

  CheckOutSchedulling(formData:any){
    console.log(formData.value);
    let ItemId : any = [];
    let Quantity : any = [];
    this.myCartData.forEach((element,index) => {
      ItemId.push(element.item_id);
      Quantity.push(this.MyCartform.get('increasefield'+index).value);
    });

    console.log(ItemId);
    console.log(Quantity);


    this.allService.StoreShoppingCartSchedulling(this.CurrentPatientDetails,ItemId,Quantity,'Pre-procedure').subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          console.log(res);
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
        }
        this.myCartData.forEach((element,index) => {
          this.MyCartform.get('increasefield'+index).setValue(0);
        });
        // this.stepper.next();
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })

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

  DecreaseItemCount(fieldName:any){
    let x = this.MyCartform.get(fieldName).value;
    if(x>0){
      this.MyCartform.get(fieldName).setValue(x-1);
    }
  }

  IncreseItemCount(fieldName:any){
    let x = this.MyCartform.get(fieldName).value;
    if(x>=0){
      this.MyCartform.get(fieldName).setValue(x+1);
    }
  }


  ngAfterViewInit(): void {
    this.allService.GetAllItemsGrid().subscribe({
      next:((res:any)=>{
        this.StoreItemGridData = res.data;
        this.StoreItem_Grid.api?.setRowData(this.StoreItemGridData);
        console.log(this.StoreItemGridData);
        // this.tempGridData = this.all_Items_gridData;
        return;
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
    this.StoreItem_Grid.api?.sizeColumnsToFit();
 }

 createObject : Object;
 fields: any[] = [];
 CreateGroup(){
  this.createObject = {};
  this.fields = [];
  this.myCartData.forEach((element, index) => {
    if (element) {
      this.createObject['increasefield' + index] = '';
    }
  });

  console.log('CreateObject',this.createObject);
  Object.keys(this.createObject).forEach((field, index) => {
    if(field == 'increasefield'+index){
      this.createObject[field] = new FormControl('');
    }
    // this.createObject[field] = new FormControl("",[Validators.minLength(0)]);
    this.fields.push(field);
  });

  console.log('Fields',this.fields);

    this.MyCartform = this.formbuilder.group(this.createObject);
    console.log(this.MyCartform);
    this.myCartData.forEach((element,index) => {
      this.MyCartform?.get('increasefield' + index).setValue(0);
    });
  }


}
