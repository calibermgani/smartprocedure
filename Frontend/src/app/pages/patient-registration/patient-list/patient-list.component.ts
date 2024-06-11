import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SelectionChangedEvent, ITooltipParams} from 'ag-grid-community';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit{

  @ViewChild('patientListGrid') patientListGrid!: AgGridAngular;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;

  constructor(private allService : AllServicesService,private toastr : ToastrService,private router : Router,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {}

  public gridApi_1!: GridApi;
  public apiUrl: any = environment_new.imageUrl;
  patient_list : any = [];
  public tooltipShowDelay = 0;
  public tooltipHideDelay = 2000;
  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter:true,
    tooltipComponent: CustomTooltipComponent,
  };
  gridOptions1: GridOptions | any = {
    suppressMenuHide: false,
    rowHeight: 35,
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No rows to show</span>',
    rowSelection: 'multiple',
    suppressRowClickSelection:true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    pagination: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: true,
    getRowId: (params) => {
      return params.data.id;
    }
  };
  SelectedPatient: any = [];
  ViewPatientData : any = [];
  patient_Info : string;
  pageSize : number;

  SelectedPatientType:string;
  SelectedBloodGroup:string;
  SelectedSpeciality:string;
  SelectedPriority:string;


  columnMainDefs: ColDef[] = [
    {
      field: 'mrn_no',
      headerName: 'MRN Number',
      cellRenderer: this.cellrendered.bind(this,'mrn_no'),
      onCellClicked: this.CellClicked.bind(this, 'mrn_no')
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
      field: 'first_name',
      headerName: 'Patient Name',
      tooltipValueGetter: (p: ITooltipParams) =>
        "Create any fixed message, e.g. This is the Athlete’s Age ",
      headerTooltip: "Tooltip for Age Column Header",
      cellRenderer: this.cellrendered.bind(this, 'first_name'),
    },
    {
      field: 'surname',
      headerName: 'Surname',
      cellRenderer: this.cellrendered.bind(this, 'surname')
    },
    {
      field: 'gender',
      headerName: 'Gender',
      cellRenderer: this.cellrendered.bind(this, 'gender'),

    },
    {
      field: 'patient_type',
      headerName: 'Type',
      cellRenderer: this.cellrendered.bind(this, 'patient_type')
    },
    {
      field: 'blood_group',
      headerName: 'blood Group',
      cellRenderer: this.cellrendered.bind(this, 'blood_group')
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
      field: 'edit',
      headerName: 'Edit',
      cellRenderer: this.cellrendered.bind(this, 'edit'),
      onCellClicked: this.CellClicked.bind(this, 'edit')
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
      case 'mrn_no':{
        return params.value ? params.value : '-';
      }
      case 'first_name': {
        let data = params.node.data;
        let middleName = data.middle_name;
        let surName = data.surname;
        let x = params.value +' '+ middleName +' '+ surName;
        return x;
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
      case 'patient_type':{
        return params.value ? params.value : '-';
      }
      case 'view':{
        return `<div class="d-flex justify-content-center">
        <div><i class="mdi mdi-eye-outline" style="color:#855EDB;font-size:18px"></i></div></div>`
      }
      case 'edit':{
        return `<div class="d-flex justify-content-center"><img src="assets/New_Images/Vector.svg" style="color:#000;font-size:18px"></imgs=></div>`
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
        this.allService.SendPatientProcedureRequest(params.data.id).subscribe({
          next:((res:any)=>{
            this.toastr.success(`${res.message}`, 'Successful', {
              positionClass: 'toast-top-center',
              timeOut: 2000,
            });
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

  Patient_type : any[] = [];
  Blood_Group : any[] = [];
  Speciality : any[] = [];
  Priority : any [] = [];
  TempGriddata : any = [];

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.allService.GetPatientList().subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          console.log(res);
          this.patient_list = res.patient_list;
          this.TempGriddata = this.patient_list;
          this.patientListGrid?.api?.setRowData(this.patient_list);

          const patient_Type = 'patient_type';
          const ArrayForPatientType = [...new Map(this.patient_list.map(item => [item[patient_Type], item])).values()];
          console.log('ArrayForPatientType', ArrayForPatientType);
          this.Patient_type = ArrayForPatientType.map(item => item[patient_Type]);
          console.log('Patient_type', this.Patient_type);

          const Bloodgroup = 'blood_group';
          const ArrayForBloodGroup = [...new Map(this.patient_list.map(item => [item[Bloodgroup], item])).values()];
          console.log('ArrayForBloodGroup', ArrayForBloodGroup);
          this.Blood_Group = ArrayForBloodGroup.map(item => item[Bloodgroup])
          console.log('Blood_Group', this.Blood_Group);

          const Speciality = 'specialty'
          const ArrayForSpeciality = [...new Map(this.patient_list.map(item => [item[Speciality], item])).values()];
          console.log('ArrayForSpeciality', ArrayForSpeciality);
          this.Speciality = ArrayForSpeciality.map(item => item[Speciality]);
          console.log('Speciality', this.Speciality);

          const priority = 'priority'
          const ArrayForPriority = [...new Map(this.patient_list.map(item => [item[priority], item])).values()];
          console.log('ArrayForSpeciality', ArrayForPriority);
          this.Priority = ArrayForPriority.map(item => item[priority]);
          console.log('Priority', this.Priority);


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


  SearchBy(PatientType:any,BloodGroup:any,Speciality:any,Priority:any){
    // console.log(PatientType);
    // console.log(BloodGroup);
    // console.log(Speciality);
    // console.log(Priority);
    let GridData = [];
    let count = 0;
    if(PatientType == undefined){
      console.log('in1');
      count = count+1;
    }
    if(BloodGroup == undefined){
      console.log('in2');
      count = count+1;
    }
    if(Speciality == undefined){
      console.log('in3');
      count = count+1;
    }
    if(Priority == undefined){
      console.log('in4');
      count = count+1;
    }
    // console.log(count);

    switch(count){
      case 3: {
        this.patient_list.map(item => {
          if (count == 3) {
            if (PatientType == item['patient_type'] || BloodGroup == item['blood_group'] || Speciality == item['specialty'] || Priority == item['priority']) {
              GridData.push(item);
            }
          }
        });
        this.patientListGrid?.api?.setRowData(GridData);
        break;
      }
      case 1: {
        this.patient_list.map(item => {
          if (PatientType == null) {
            if (BloodGroup == item['blood_group'] && Speciality == item['specialty'] && Priority == item['priority']) {
              GridData.push(item);
            }
          }
          else if (BloodGroup == null) {
            if (PatientType == item['patient_type'] && Speciality == item['specialty'] && Priority == item['priority']) {
              GridData.push(item);
            }
          }
          else if (Speciality == null) {
            if (PatientType == item['patient_type'] && BloodGroup == item['blood_group'] && Priority == item['priority']) {
              GridData.push(item);
            }
          }
          else if (Priority == null) {
            if (PatientType == item['patient_type'] && BloodGroup == item['blood_group'] && Speciality == item['specialty']) {
              GridData.push(item);
            }
          }
        });
        this.patientListGrid?.api?.setRowData(GridData);
        break;
      }
      case 2:{
        this.patient_list.map(item => {
          if(PatientType == null && BloodGroup == null){
            if (Speciality == item['specialty'] && Priority == item['priority']){
                    GridData.push(item);
              }
          }
          else if(PatientType == null && Speciality ==null){
            if (BloodGroup == item['blood_group'] && Priority == item['priority']){
                  GridData.push(item);
              }
          }
          else if(PatientType == null && Priority == null){
            if (BloodGroup == item['blood_group'] && Speciality == item['specialty']) {
                GridData.push(item);
              }
          }
          else if(BloodGroup == null && Speciality==null){
            if (PatientType == item['patient_type'] &&  Priority == item['priority']) {
                  GridData.push(item);
              }
          }
          else if(BloodGroup == null && Priority == null){
            if (PatientType == item['patient_type'] && Speciality == item['specialty'] ) {
              GridData.push(item);
            }
          }
          else if(Speciality == null && Priority == null){
            if (PatientType == item['patient_type'] && BloodGroup == item['blood_group']) {
              GridData.push(item);
            }
          }
        });
        this.patientListGrid?.api?.setRowData(GridData);
        break;
      }
      case 4 :{
        this.patientListGrid?.api?.setRowData(this.TempGriddata);
        break;
      }
    }

    // this.patient_list.map(item => {
    //   if(PatientType == null){
    //     if(BloodGroup == item['blood_group'] && Speciality == item['specialty'] && Priority == item['priority']){
    //       GridData.push(item);
    //     }
    //   }
    //   else if(BloodGroup == null){
    //     if (PatientType == item['patient_type']  && Speciality == item['specialty'] && Priority == item['priority']) {
    //       GridData.push(item);
    //     }
    //   }
    //   else if(Speciality == null){
    //     if (PatientType == item['patient_type'] && BloodGroup == item['blood_group']  && Priority == item['priority']) {
    //       GridData.push(item);
    //     }
    //   }
    //   else if(Priority == null){
    //     if (PatientType == item['patient_type'] && BloodGroup == item['blood_group'] && Speciality == item['specialty']) {
    //       GridData.push(item);
    //     }
    //   }
    //   else if(PatientType == null && BloodGroup == null){
    //     if (Speciality == item['specialty'] && Priority == item['priority']) {
    //       GridData.push(item);
    //     }
    //   }
    //   else if(BloodGroup == null && Priority == null){
    //     if (PatientType == item['patient_type']  && Priority == item['priority']) {
    //       GridData.push(item);
    //     }
    //   }
    //   else if(Speciality == null  && Priority == null){
    //     if (PatientType == item['patient_type'] && BloodGroup == item['blood_group'] && Speciality == item['specialty'] && Priority == item['priority']) {
    //       GridData.push(item);
    //     }
    //   }
    //   else{
    //     if (PatientType == item['patient_type'] && BloodGroup == item['blood_group'] && Speciality == item['specialty'] && Priority == item['priority']) {
    //       GridData.push(item);
    //     }
    //   }


    //   if (count == 3) {
    //     if (PatientType == item['patient_type'] || BloodGroup == item['blood_group'] || Speciality == item['specialty'] || Priority == item['priority']) {
    //       GridData.push(item);
    //       console.log(item);
    //     }
    //   }

    // });
    // this.patientListGrid?.api?.setRowData(GridData);
  }

  ResetFilter(){
    this.SelectedPatientType = null;
    this.SelectedBloodGroup = null;
    this.SelectedSpeciality = null;
    this.SelectedPriority = null;
    this.patientListGrid?.api?.setRowData(this.TempGriddata);
  }

  SearchbyPatientType(event:any){
    const Bloodgroup = 'patient_type';
    let gridData = [];
    if (event != undefined) {
      this.patient_list.map(item => {
        if (event == item[Bloodgroup]) {
          gridData.push(item)
        }
      });
      console.log(gridData);
      this.patientListGrid?.api?.setRowData(gridData);
    }
    else {
      this.patientListGrid?.api?.setRowData(this.TempGriddata);
    }
  }

  SearchByBloodGroup(event:any){
    const Bloodgroup = 'blood_group';
    let gridData = [];
    if (event != undefined) {
      this.patient_list.map(item => {
        if (event == item[Bloodgroup]) {
          gridData.push(item)
        }
      });
      console.log(gridData);
      this.patientListGrid?.api?.setRowData(gridData);
    }
    else {
      this.patientListGrid?.api?.setRowData(this.TempGriddata);
    }
  }

  SearchBySpeciality(event:any){
    const Bloodgroup = 'specialty';
    let gridData = [];
    if (event != undefined) {
      this.patient_list.map(item => {
        if (event == item[Bloodgroup]) {
          gridData.push(item)
        }
      });
      console.log(gridData);
      this.patientListGrid?.api?.setRowData(gridData);
    }
    else {
      this.patientListGrid?.api?.setRowData(this.TempGriddata);
    }
  }

  SearchByPriority(event:any){
    const Bloodgroup = 'priority';
    let gridData = [];
    if (event != undefined) {
      this.patient_list.map(item => {
        if (event == item[Bloodgroup]) {
          gridData.push(item)
        }
      });
      console.log(gridData);
      this.patientListGrid?.api?.setRowData(gridData);
    }
    else {
      this.patientListGrid?.api?.setRowData(this.TempGriddata);
    }
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

  PatientListGridSearch(){
    this.patientListGrid?.api.setQuickFilter(this.patient_Info);
  }

  setpaginationSize(){
    this.patientListGrid?.api.paginationSetPageSize(this.pageSize);
  }


  ReloadPatientList(){
    this.SearchPatientList='';
    this.patientListGrid.api?.setQuickFilter(this.SearchPatientList);
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
  OnSearchpatientList(data:any){
    this.patientListGrid.api?.setQuickFilter(this.SearchPatientList);
  }

  onRowClicked(events){
    const rowData = events.data;
    this.router.navigateByUrl('patient-registration/patient-view');
  }
  ngAfterViewInit(): void {
    this.patientListGrid?.api.sizeColumnsToFit();
  }

  GridCSVExport(){
    this.gridApi_1.exportDataAsCsv();
  }

}
