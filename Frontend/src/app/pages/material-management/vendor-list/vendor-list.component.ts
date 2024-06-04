import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  VendorForm:UntypedFormGroup;
  ReasonForm:UntypedFormGroup;
  vendor_name:string[];
  contact_person:string[];
  status:string[];
  vendorList:string[];
  ItemStatus:any = [];
  search_vendorlist:any;

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('addvendor', { static: true }) addvendor: ModalDirective;
  @ViewChild('delete_modal', { static: true }) delete_modal: ModalDirective;
  @ViewChild('confirmation', { static: true }) confirmation: ModalDirective;
  @Input() Updategrid : boolean = false;
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };
  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Add Vendors</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: true,
    suppressRowClickSelection:true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };

  ngOnInit(): void {}

  constructor(private http : HttpClient,private allServices : AllServicesService,private toastr : ToastrService,private formbuilder : FormBuilder) {
    this.vendor_name=[];this.contact_person=[];this.status=[];
    this.ItemStatus= [
      { id: 1, label: "Active" },
      { id: 2, label: "Inactive" }
    ]

    this.VendorForm  = this.formbuilder.group({
      VendorName:['',Validators.required],
      VendorEmail:['',[Validators.required,Validators.email]],
      VendorContactNo:['',[Validators.required,Validators.pattern("([0-9]{10}$)")]],
      VendorAddress:[],
      Status:[]
    });
    this.ReasonForm = this.formbuilder.group({
      reason1:[],
      reason2:[]
    });
  }

  OpenModal(modalName:any){
    switch(modalName){
      case 'addvendor':{
        this.addvendor?.show();
        this.ReasonForm.reset();
      }
    }
  }

  CloseModal(modalName:any){
    switch(modalName){
      case 'addvendor':{
        this.VendorForm.reset();
        this.addvendor?.hide();
      }
    }
  }

  columnDefs1: ColDef[] = [
    // {
    //   field: '',
    //   checkboxSelection: true,
    //   resizable:false,
    //   headerCheckboxSelection: true,
    //   width:10
    // },
    // {
    //   field: 'id',
    //   headerName: 'S.no',
    //   cellRenderer: this.cellrendered.bind(this, 'id'),
    //   width:100,
    // },
    {
      field: 'VendorName',
      headerName: 'Vendor Name',
      cellRenderer: this.cellrendered.bind(this, 'VendorName')
      // onCellClicked: this.CellClicked.bind(this, 'VendorName')
    },
    {
      field: 'VendorEmail',
      headerName: 'Vendor Email',
      cellRenderer: this.cellrendered.bind(this, 'VendorEmail')
    },
    {
      field: 'VendorContactNo',
      headerName: 'Vendor Contact No',
      cellRenderer: this.cellrendered.bind(this, 'VendorContactNo')
    },
    {
      field: 'VendorAddress',
      headerName: 'Vendor Address',
      cellRenderer: this.cellrendered.bind(this, 'VendorAddress')
    },
    {
      field: 'status',
      headerName: 'Status',
      cellRenderer: this.cellrendered.bind(this, 'status')
    },
    // {
    //   field: 'ContactPerson',
    //   headerName: 'Contact Person',
    //   cellRenderer: this.cellrendered.bind(this, 'ContactPerson')
    // },
    // {
    //   field: 'Added_by',
    //   headerName: 'Added By',
    //   cellRenderer: this.cellrendered.bind(this, 'Added_by')
    // },
    {
      field: 'edit',
      width:20,
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'edit'),
      onCellClicked: this.CellClicked.bind(this, 'edit')
    },
    {
      field: 'delete',
      width:20,
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'delete'),
      onCellClicked: this.CellClicked.bind(this, 'delete')
    },
  ];

  Serial_no:number = 1;
  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      // case'id':{
      //   return this.Serial_no++;
      // }
      case 'VendorName': {
        return params.value;
      }
      case 'VendorEmail': {
        return params.value;
      }
      case 'VendorContactNo': {
        return params.value;
      }
      case 'VendorAddress': {
        return params.value;
      }
      case 'status': {
        if(params.value == 'Active')
        {
          return `<span style="color:#3BAC13">${params.value}</span>`;
        }
        else if(params.value == 'Inactive')
        {
          return `<span style="color:#E31E1E">${params.value}</span>`;
        }
        else
        {
          return '-Nil-';
        }

      }
      case 'ContactPerson': {
        return params.value;
      }
      case 'Added_by': {
        return params.value;
      }
      case 'edit':{
        return `<i class="mdi mdi-pencil-outline  edit-row" style="color:#000;font-size:18px;cursor:pointer;padding:5px"></i>`
      }
      case 'delete':{
        return `<i class="mdi mdi-trash-can-outline delete-row" style="color:red;font-size:18px;cursor:pointer;padding:5px"></i>`
      }
    }
  }

  SelectedVendorId:number;
  CellClicked(headerName: any, params: any) {
    switch(headerName){
      case 'edit':{
        this.SelectedVendorId = params.data.id;
        this.allServices.ViewVendor(params.data).subscribe({
          next:((res:any)=>{
            if(res.status == 'Success'){
              this.VendorForm.patchValue({
                VendorName : res.data.VendorName,
                VendorEmail : res.data.VendorEmail,
                VendorContactNo : res.data.VendorContactNo,
                VendorAddress : res.data.VendorAddress,
                Status : res.data.status
              })
            }
          }),
          error:((res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            })
          })
        })
        this.OpenModal('addvendor');
        break;
      }
      case 'delete':{
        this.SelectedVendorId = params.data.id;
        this.delete_modal?.show();
        break;
      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.allServices.GetVendorList().subscribe({
      next:((res:any)=>{
        this.vendorList = res.data;
        this.myGrid_1.api?.setRowData(this.vendorList);
      }),
      error:((res:any)=>[
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        })
      ])
    })
  }

  UpdateVendorfn(data:any){
    if(data.valid){
      this.allServices.EditVendor(data,this.SelectedVendorId,this.ReasonForm.value).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.toastr.success(`${res.message}`, 'Successful', {
              positionClass: 'toast-top-center',
              timeOut: 2000,
            });
            this.CloseModal('addvendor');
            this.GetVendor();
          }
        }),
        error:((res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          })
        })
      })
    }
  }

  DeleteVendor(data:any){
    this.allServices.DeleteVendor(this.SelectedVendorId,data).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.delete_modal?.hide();
          this.GetVendor();
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        })
      })
    })
  }

  GetVendor(){
    this.Serial_no = 1;
    this.allServices.GetVendorList().subscribe({
      next:((res:any)=>{
        this.vendorList = res.data;
        this.myGrid_1.api?.setRowData(this.vendorList);
      }),
      error:((res:any)=>[
        this.toastr.error(`Something went wrong`,'UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        })
      ])
    });
  }

  ChangingStatus(event:any){
    console.log(event);
    if(event == 'Inactive'){
      this.addvendor?.hide();
      this.confirmation?.show();
    }
  }
  CloseConfirmation(){
    this.addvendor?.show();
    this.confirmation?.hide();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.myGrid_1.api?.sizeColumnsToFit();
    }, 1000);
  }

  onSearch(){
    console.log(this.search_vendorlist);
    this.Serial_no = 1;
    this.myGrid_1.api?.setQuickFilter(this.search_vendorlist);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.Updategrid.currentValue){
      this.GetVendor();
    }
  }

}
