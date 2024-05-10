import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit{

  @ViewChild('patientListGrid') patientListGrid!: AgGridAngular;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;

  constructor(private allService : AllServicesService,private toastr : ToastrService,private router : Router){}

  ngOnInit(): void {}

  public gridApi_1!: GridApi;
  public apiUrl: any = environment_new.imageUrl;
  patient_list : any = [];
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
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No rows to show</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: true,
    paginationPageSize:15,
    suppressRowClickSelection:true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
    getRowId: (params) => {
      return params.data.id;
    },
  };
  SelectedPatient: any = [];
  ViewPatientData : any = []



  columnMainDefs: ColDef[] = [
    {
      field: 'first_name',
      headerName: 'First name',
      cellRenderer: this.cellrendered.bind(this,'first_name'),
      // cellRenderer: 'agGroupCellRenderer',
      // cellRendererParams:(params:any)=>{
      //   if(params.data.item_entry_status == 'clone'){
      //     return { innerRenderer: (params: any) => `<div class="d-flex justify-content-center align-items-center">
      //     <div class="me-2">${params.data.item_number}</div>
      //     <div style="padding: 2px 4px 2px 4px;
      //     background: #000;
      //     color: #fff;
      //     border-radius: 5px;
      //     height: 17px;
      //     line-height:12px !important;text-align:center;
      //     width: 50px;}">
      //     New</div>
      //     </div>` };
      //   }
      // }
    },
    {
      field: 'middle_name',
      headerName: 'Middle name',
      cellRenderer: this.cellrendered.bind(this, 'middle_name'),
    },
    {
      field: 'surname',
      headerName: 'Surname',
      cellRenderer: this.cellrendered.bind(this, 'surname')
    },
    {
      field: 'name_of_children',
      headerName: 'Name of Children',
      cellRenderer: this.cellrendered.bind(this, 'name_of_children')
    },
    {
      field: 'name_of_partner',
      headerName: 'Name of Partner',
      cellRenderer: this.cellrendered.bind(this, 'name_of_partner')
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      cellRenderer: this.cellrendered.bind(this, 'occupation')
    },
    {
      field: 'dob',
      headerName: 'DOB',
      cellRenderer: this.cellrendered.bind(this, 'dob')
    },
    {
      field: 'age',
      headerName: 'Age',
      cellRenderer: this.cellrendered.bind(this, 'age')
    },
    {
      field: 'gender',
      headerName: 'Gender',
      cellRenderer: this.cellrendered.bind(this, 'gender')
    },
    {
      field: 'marital_status',
      headerName: 'Martial Status',
      cellRenderer: this.cellrendered.bind(this, 'marital_status')
    },
    {
      field: 'language',
      headerName: 'Language',
      cellRenderer: this.cellrendered.bind(this, 'language')
    },
    {
      field: 'referred_by',
      headerName: 'Referred by',
      cellRenderer: this.cellrendered.bind(this, 'referred_by')
    },
    {
      field: 'telephone',
      headerName: 'Primary telephone',
      cellRenderer: this.cellrendered.bind(this, 'telephone')
    },
    {
      field: 'primary_email',
      headerName: 'Primary email',
      cellRenderer: this.cellrendered.bind(this, 'primary_email')
    },
    {
      field: 'address_type',
      headerName: 'Type',
      cellRenderer: this.cellrendered.bind(this, 'address_type')
    },
    {
      field: 'flat_unit_no',
      headerName: 'Flat unit no',
      cellRenderer: this.cellrendered.bind(this, 'flat_unit_no')
    },
    {
      field: 'street_no',
      headerName: 'Street no',
      cellRenderer: this.cellrendered.bind(this, 'street_no')
    },
    {
      field: 'street_name',
      headerName: 'Street Name',
      cellRenderer: this.cellrendered.bind(this, 'street_name')
    },
    {
      field: 'suburb',
      headerName: 'Subrub',
      cellRenderer: this.cellrendered.bind(this, 'suburb')
    },
    {
      field: 'town_city',
      headerName: 'Town city',
      cellRenderer: this.cellrendered.bind(this, 'town_city')
    },
    {
      field: 'state',
      headerName: 'State',
      cellRenderer: this.cellrendered.bind(this, 'state')
    },
    {
      field: 'post_code',
      headerName: 'Post Code',
      cellRenderer: this.cellrendered.bind(this, 'post_code')
    },
    {
      field: 'blood_group',
      headerName: 'Blood group',
      cellRenderer: this.cellrendered.bind(this, 'blood_group')
    },
    {
      field: 'height',
      headerName: 'Height',
      cellRenderer: this.cellrendered.bind(this, 'height')
    },
    {
      field: 'weight',
      headerName: 'Weight',
      cellRenderer: this.cellrendered.bind(this, 'weight')
    },
    {
      field: 'blood_pressure',
      headerName: 'Blood Pressure',
      cellRenderer: this.cellrendered.bind(this, 'blood_pressure')
    },
    {
      field: 'heart_beat',
      headerName: 'Heart beat',
      cellRenderer: this.cellrendered.bind(this, 'heart_beat')
    },
    {
      field: 'temperature',
      headerName: 'Temperature',
      cellRenderer: this.cellrendered.bind(this, 'temperature')
    },
    {
      field: 'spo2',
      headerName: 'SPO2',
      cellRenderer: this.cellrendered.bind(this, 'spo2')
    },
    {
      field: 'respiratory_rate',
      headerName: 'Respiratory rate',
      cellRenderer: this.cellrendered.bind(this, 'respiratory_rate')
    },
    {
      field: 'specialty',
      headerName: 'Speciality',
      cellRenderer: this.cellrendered.bind(this, 'specialty')
    },
    {
      field: 'priority',
      headerName: 'Priority',
      cellRenderer: this.cellrendered.bind(this, 'priority')
    },
    {
      field: 'view',
      width:10,
      resizable:false,
      filter:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'view'),
      onCellClicked: this.CellClicked.bind(this, 'view')
    },
    {
      field: 'edit',
      width:10,
      filter:false,
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'edit'),
      onCellClicked: this.CellClicked.bind(this, 'edit')
    },
    {
      field: 'delete',
      width:20,
      resizable:false,
      filter:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'delete'),
      onCellClicked: this.CellClicked.bind(this, 'delete')
    },
    // {
    //   field: 'note',
    //   width:130,
    //   resizable:false,
    //   filter:false,
    //   pinned:"right",
    //   cellRenderer: this.cellrendered.bind(this, 'note'),
    //   onCellClicked: this.CellClicked.bind(this, 'note')
    // },
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'first_name': {
        return params.value ? params.value : '-';
      }
      case 'middle_name': {
        return params.value ? params.value : '-';
      }
      case 'surname': {
        return params.value ? params.value : '-';
      }
      case 'name_of_children': {
        return params.value ? params.value : '-';
      }
      case 'name_of_partner': {
        return params.value ? params.value : '-';
      }
      case 'occupation': {
        // let newArray :any = [];
        // params.value.forEach(element => {
        //   newArray.push(element.procedure_name);
        // });
        // if(newArray.length>0){return `${newArray}`;}
        // else{return '-';}
        return params.value ? params.value : '-';
      }
      case 'dob': {
        return params.value ? params.value : '-';
      }
      case 'age': {
        return params.value ? params.value : '-';
      }
      case 'gender': {
        return params.value ? params.value : '-';
      }
      case 'marital_status': {
        return params.value ? params.value : '-';
      }
      case 'language': {
        return params.value ? params.value : '-';
      }
      case 'referred_by': {
        return params.value ? params.value : '-';
      }
      case 'telephone': {
        return params.value ? params.value : '-';
      }
      case 'primary_email': {
        return params.value ? params.value : '-';
      }
      case 'address_type': {
        return params.value ? params.value : '-';
      }
      case 'flat_unit_no': {
        return params.value ? params.value : '-';
      }
      case 'street_no': {
        return params.value ? params.value : '-';
      }
      case 'street_name': {
        return params.value ? params.value : '-';
      }
      case 'suburb': {
        return params.value ? params.value : '-';
      }
      case 'town_city': {
        return params.value ? params.value : '-';
      }
      case 'state': {
        return params.value ? params.value : '-';
      }
      case 'post_code': {
        return params.value ? params.value : '-';
      }
      case 'blood_group': {
        return params.value ? params.value : '-';
      }
      case 'height': {
        return params.value ? params.value : '-';
      }
      case 'weight': {
        return params.value ? params.value : '-';
      }
      case 'blood_pressure': {
        return params.value ? params.value : '-';
      }
      case 'heart_beat': {
        return params.value ? params.value : '-';
      }
      case 'temperature': {
        return params.value ? params.value : '-';
      }
      case 'spo2': {
        return params.value ? params.value : '-';
      }
      case 'respiratory_rate': {
        return params.value ? params.value : '-';
      }
      case 'specialty': {
        return params.value ? params.value : '-';
      }
      case 'priority': {
        return params.value ? params.value : '-';
      }
      case 'view':{
        return `<div class="d-flex justify-content-center">
        <div><i class="mdi mdi-eye-outline" style="color:#855EDB;font-size:18px"></i></div></div>`
      }
      case 'edit':{
        return `<div class="d-flex justify-content-center"><div><i class="mdi mdi-pencil-outline" style="color:#000;font-size:18px"></i></div></div>`
      }
      case 'delete':{
        return `<div class="d-flex justify-content-center"><div><i class="mdi mdi-trash-can-outline" style="color:red;font-size:18px"></i></div></div>`
      }
      // case 'note':{
      //   return `<div style="width:100% !important;height:100% important;"><button class="btn-new" style="width:83px !important;padding:0px 0px 3px 0px !important;height:31px !important">view note</button></div>`
      // }
    }
  }

  CellClicked(headerName: any, params: any) {
    switch (headerName) {
      case 'first_name':{
        break;
      }
      case 'view':{
        console.log(params.data);
        this.SelectedPatient = params.data;
        this.allService.GetSpecificPatientDetails(this.SelectedPatient.id).subscribe({
          next:((res:any)=>{
            if(res.status == 'Success'){
              this.ViewPatientData = res.patient;
              this.OpenModal('viewitem');
            }
          }),
          error:((res:any)=>{
            this.toastr.error(`${res.message}`, 'UnSuccessful', {
              positionClass: 'toast-top-center',
              timeOut: 2000,
            });
          })
        })
        break;
      }
      case 'edit':{
        this.SelectedPatient = params.data;
        localStorage.setItem('Patient_ID',params.data.id);
        this.router.navigateByUrl('/patient-registration/register');
        break;
      }
      case 'delete':{
        break;
      }
      case 'note':{
        break;
      }
    }
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedNodes: any = event.api.getSelectedRows();
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.allService.GetPatientList().subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          console.log(res);
          this.patient_list = res.patient_list;
          this.patientListGrid?.api?.setRowData(this.patient_list);
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`${res.message}`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  GoToRegisterPage(){
    this.router.navigateByUrl('patient-registration/register');
  }

  CloseModal(modalName : any){
    switch(modalName){
      case 'viewitem':{
        this.viewitem?.hide();
        break;
      }
    }
  }

  OpenModal(modalName : any){
    switch(modalName){
      case 'viewitem':{
        this.viewitem?.show();
        break;
      }
    }
  }

  GoToProcedureWorkArea(){}


  ReloadPatientList(){
    this.allService.GetPatientList().subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          console.log(res);
          this.patient_list = res.patient_list;
          this.patientListGrid?.api?.setRowData(this.patient_list);
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`${res.message}`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  selectedFile: any;
  SelectedFilePatientList(event:any){
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.allService.ImportPatientExcel(this.selectedFile).subscribe({
      next: ((res: any) => {
        console.log(res);
        if (res.status == 'Success') {
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.allService.GetPatientList().subscribe({
            next:((res:any)=>{
              if(res.status == 'Success'){
                console.log(res);
                this.patient_list = res.patient_list;
                this.patientListGrid?.api?.setRowData(this.patient_list);
              }
            }),
            error:((res:any)=>{
              this.toastr.error(`${res.message}`, 'UnSuccessful', {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              });
            })
          })
        }
      }),
      error: ((res: any) => {
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  SearchPatientList:any
  OnSearchpatientList(){
    this.patientListGrid.api?.setQuickFilter(this.SearchPatientList);
  }
}
