import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { environment_new } from 'src/environments/environment';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';


interface kizintabValues {
  "tabs": string,
  "id": number,
  "template": string,
  "active": boolean,
  "content": string,
  "imgPath": string,
  "activeimg": string,
  "removable": boolean,
  "disabled": boolean,
}

interface ProcedureStageList {
  "id": number,
  "stage": string,
  "status": string,
  "accord_open": boolean,
  "list": Task[]
}

interface Task {
  "id": number,
  "task": string,
  "completed_date_time": string,
  "status": string,
  "role": string,
  "owner": string
}

interface timeline {
  "id": number,
  "data": string,
  "time": string,
  "procedure_status": string,
  "description": string,
  "owner": string,
  "role": string
}

interface TabData {
  "id": number,
  "headername": string,
  "header_data": tableData[],
}
interface tableData {
  "data": string
}
interface careteam {
  "id": number,
  "owner": string,
  "role": string,
  "icon": string
}
interface AlertData {
  "id": number,
  "path_img": string,
  "alert_name": string,
  "accord_open": boolean
  "input_value": string,
}
interface AlertValueDropDown
{
  value:string;
}

interface TaskNotes{
  "id":number,
  "Procedure_Stage":string,
  "order_by":string,
  "comments":Comments[]
}
interface Comments
{
  "Author":string,
  "comments":string
}

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WorkAreaComponent implements OnInit {

  tableForm: FormGroup;
  tableFormIndication: FormGroup;
  tableFormPostdiagonis: FormGroup;
  tablelab: FormGroup;
  @ViewChild('delete_modal', { static: false }) delete_modal?: ModalDirective;
  @ViewChild('delete_indication_modal', { static: false }) delete_indication_modal?: ModalDirective;
  @ViewChild('delete_post_modal', { static: false }) delete_post_modal?: ModalDirective;
  @ViewChild('delete_lab_modal', { static: false }) delete_lab_modal?: ModalDirective;
  public apiUrl: any = environment_new.apiUrl;
  public clinicalDiagnosis: any = environment_new.clinicalDiagnosis;
  public patientLabDelete: any = environment_new.patientLabDelete;
  public saveDataLab1: any = environment_new.saveDataLab;
  public getLabDetails1:  any = environment_new.getLabDetails;
  public deletePostDiagnol1: any = environment_new.deletePostDiagnol;
  public saveDatapostDiagnosis1: any = environment_new.saveDatapostDiagnosis;
  public clinicalPostDiagnosis: any = environment_new.clinicalPostDiagnosis;
  public deleteIndicationData: any = environment_new.deleteIndicationData;
  public saveDataIndication1: any = environment_new.saveDataIndication;
  public clinicalHistoryIndication: any = environment_new.clinicalHistoryIndication;
  public deletePreDiagnosis: any = environment_new.deletePreDiagnosis;
  public saveData1: any = environment_new.saveData;
  miniList_details: any;
  procedureAlertsData: any;
  CurrentPatientDetails : any = [];
  kizintabValues: any = [];
  taskList: any = [];
  procedureStagelist: any = [];
  timeline_data: any = [];
  clinical_history: any = [];
  clinical_history_indication_data: any = [];
  clinical_history_postdiagonis_data: any = [];

  lab_data: any = [];
  careteam_data: any = [];
  Alert_data: any = [];
  Alert_dropdown_values:any = [];
  tasklist_notes:any = [];
  comments_for_tasklist :any = [];
  isFirstOpen: boolean = true;
  show_patient_details: boolean = false;
  fall_alert: string = '';
  isolation_alert: string = '';
  pregnant_alert: string = '';
  covid_alert: string = '';
  // Editable Field
  pre_diagnosis_editable_field: boolean = false;
  indication_editable_field: boolean = false;
  post_diagnosis_editable_field: boolean = false;
  lab_editable_field: boolean = false;
  medication_editable_field: boolean = false;
  careteam_editable_field: boolean = false;
  // Main Tabs
  active_tabs_clinical_history: any = false;
  active_tabs_lab: boolean = false;
  active_tabs_medication: boolean = false;
  active_tabs_care_team: boolean = false;
  // Sub Tabs
  active_tabs_pre_diagnosis: boolean = false;
  active_tabs_indication: boolean = false;
  active_tabs_post_diagnosis: boolean = false;


  active_status: any = 'clinical_histroy';
  active_sub_status: any = 'pre_diagnosis';

  modalRef?: BsModalRef;
  activeTab = 1;
  activeTab_Modal = 1;

  itemsPerSlide = 4;
  singleSlideOffset = true;

  patient_id : any= localStorage.getItem('PatientID')
  mrn_number : any = localStorage.getItem('MRN_NO');
  delete_pre_diagonis_id : number;
  delete_indication_id : number;
  delete_postdiagonis_id : number;
  delete_lab_id : number;

  slides = [
    { "image": 'assets/images/fall_fill.svg',"name":'Fall',"tooltip":'Fall 19-25' },
    { "image": 'assets/images/isolation_fill.svg',"name":'Isolation',"tooltip":'Isolation 14-23' },
    { "image": 'assets/images/pregnant_fill.svg',"name":'Pregnant',"tooltip":'Pregnant 10-20' },
    { "image": 'assets/images/covid_fill.svg',"name":'Covid',"tooltip":'Covid 16-25' },
  ];

  //slider variables
  edit_alert_range_value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100,
    showSelectionBar: true,
    getPointerColor: (value: number): string => {
      return '#855EDB';
    }
  };

  Alert_name: any;


  @ViewChild('centerDataModal', { static: false }) centerDataModal?: ModalDirective;
  @ViewChild('addNotesModal', { static: false }) addNotesModal?: ModalDirective;

  constructor(private http: HttpClient, private modalService: BsModalService,private router : Router,private allService : AllServicesService,private authService : AuthfakeauthenticationService,private toastr : ToastrService,private formBuilder: FormBuilder,private datePipe: DatePipe) {
  }
  currentDateTime: string;

  ngOnInit() {
    this.addNotesModal?.show();
    this.tableForm = this.formBuilder.group({
      rows: this.formBuilder.array([])

    });
    this.tableFormIndication = this.formBuilder.group({
      rows: this.formBuilder.array([])

    });
    this.tableFormPostdiagonis = this.formBuilder.group({
      rows: this.formBuilder.array([])

    });

    this.tablelab = this.formBuilder.group({
      rows: this.formBuilder.array([])

    });

    this.currentDateTime = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');



    this.http.get('assets/json/mini-list.json').subscribe((res: any) => {
      // this.miniList_details = res;
    });

    this.http.get('assets/json/procedure-alerts.json').subscribe((res: any) => {
      this.procedureAlertsData = res;
    });

    this.http.get<kizintabValues>('assets/json/kizin-main-tabs.json').subscribe((res: any) => {
      this.kizintabValues = res;
    });

    this.http.get<ProcedureStageList>('assets/json/procedure-stage-list.json').subscribe((res: any) => {
      this.procedureStagelist = res;
      for (let i = 0; i < res.length; i++) {
        if (res[i].list) {
          this.taskList.push(res[i].list);
        }
      }
    });

    this.allService.GetAllCheckList().subscribe({
      next:((res:any)=>{
        console.log(res);
      }),
      error:((res:any)=>{
        console.log(res);
      })
    })

    this.http.get<timeline>('assets/json/timeline.json').subscribe((res: any) => {
      this.timeline_data = res;
    });


   /** Patient Clinical History Table Stat API By Gani */
   this.Clinical_history().subscribe((response:any)=>{
    this.clinical_history = response.data;
    //console.log('Clinical History Response : ',this.clinical_history);
   })

   /** Patient Clinical History Table End API By Gani */





   /*  this.http.get<TabData>('assets/json/lab_data.json').subscribe((res: any) => {
      this.lab_data = res;
    }); */
    this.http.get<careteam>('assets/json/care_team_member.json').subscribe((res: any) => {
      this.careteam_data = res;
    });
    this.http.get<AlertData>('assets/json/Alert_data.json').subscribe((res: any) => {
      this.Alert_data = res;
    });

    this.http.get<AlertValueDropDown>('assets/json/Alerts_dropdown.json').subscribe((res: any) => {
      this.Alert_dropdown_values = res;
    });

    this.http.get<TaskNotes>('assets/json/task_notes.json').subscribe((res: any) => {
      this.tasklist_notes = res;
      this.comments_for_tasklist = res[0].comments;
    });

    let PatientID = localStorage.getItem('PatientID');

    if(PatientID){

        this.allService.GetSpecificPatientProcedureDetails(PatientID).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            console.log(res);
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
    }

  }

  toggleTabIcon(index: number) {
    console.log('index', index);
    this.kizintabValues[index].active = !this.kizintabValues[index].active;
    for (let i = 0; i < 3; i++) {
      if (i != index) {
        this.kizintabValues[i].active = false;
      }
    }
  }

  onPatientDetailsButtonClicked() {
    this.show_patient_details = true;
  }
  go_back_to_Kizin() {
    this.show_patient_details = false;
  }

  changeAlerts(data: any) {
    switch (data) {
      case 'fall': {
        this.fall_alert = data;
      }
      case 'allergies': {
        this.isolation_alert = data;
      }
      case 'pregnant': {
        this.pregnant_alert = data;
      }
      case 'covid': {
        this.covid_alert = data;
      }
    }
  }

  setActiveTab(index: number) {
    this.activeTab = index;
    console.log('Main Tab',index)
    if(index===2){
      this.GetLab();
    }
  }
  setActiveTabModal(index: number) {
    this.activeTab_Modal = index;
  }

  edit_field(data: any) {
    switch (data) {
      case 'pre_diagnosis':
        {
          this.pre_diagnosis_editable_field = true;
          break;
        }
      case 'indication': {
        this.indication_editable_field = true;

        break;
      }
      case 'post_diagnosis': {
        this.post_diagnosis_editable_field = true;
        break;
      }
      case 'lab': {
        this.lab_editable_field = true;
        break;
      }
      case 'medication': {
        this.medication_editable_field = true;
        break;
      }
      case 'care_team': {
        this.careteam_editable_field = true;
        break;
      }
    }
  }

  showModal() {
    this.tab_active('clinical_history')
    this.tab_Subactive('pre_diagnosis')
    //Fields
    this.pre_diagnosis_editable_field = false;
    this.indication_editable_field = false;
    this.post_diagnosis_editable_field = false;
    this.lab_editable_field = false;
    this.medication_editable_field = false;
    this.careteam_editable_field = false;

    this.centerDataModal?.show();
  }
  closeModal() {
    //Fields
    this.pre_diagnosis_editable_field = false;
    this.indication_editable_field = false;
    this.post_diagnosis_editable_field = false;
    this.lab_editable_field = false;
    this.medication_editable_field = false;
    this.careteam_editable_field = false;
    this.centerDataModal?.hide();
  }
  showEditableModal(data: any) {

    switch (data) {

      case 'pre_diagnosis':
        {
          this.tab_active('clinical_history');
          this.tab_Subactive(data);
          this.pre_diagnosis_editable_field = true;
          this.centerDataModal?.show();
          break;
        }
      case 'indication': {

        this.tab_active('clinical_history');
        this.tab_Subactive(data);

        this.indication_editable_field = true;
        this.centerDataModal?.show();
        break;
      }
      case 'post_diagnosis': {
        this.tab_active('clinical_history');
        this.tab_Subactive(data);
        this.post_diagnosis_editable_field = true;
        this.centerDataModal?.show();
        break;
      }
      case 'lab': {
        this.active_status = 'lab';
        this.lab_editable_field = true;
        this.tab_active(data);

        this.active_tabs_lab = true;
        this.centerDataModal?.show();
        break;
      }
      case 'medication': {
        this.active_status = 'medication';
        this.tab_active(data);
        this.medication_editable_field = true;
        this.centerDataModal?.show();
        break;
      }
      case 'care_team': {
        this.tab_active(data);
        this.careteam_editable_field = true;
        this.active_status = 'care_team';
        this.centerDataModal?.show();
        break;
      }
    }
  }

  tab_active(data: any) {

    this.active_status = data;

    switch(data){
      case 'lab':{
        this.GetLab();
        console.log('Popup Datas',data)
      }
    }




  }
  tab_Subactive(data: any) {

    switch(data){
      case 'indication':{
        if(this.clinical_history_indication_data.length == 0){
          this.GetClinicalIndication();
         }
      }
      case 'post_diagnosis':{
        if(this.clinical_history_postdiagonis_data.length == 0){
        this.GetClinicalPostdiagonis();
        }

      }

    }
    this.active_sub_status = data;

  }
  ClinicalHistorySubTab(tabsactive : any){
  switch (tabsactive) {
    case 'indication': {
     if(this.clinical_history_indication_data.length == 0){
      this.GetClinicalIndication();
     }

    }
    case 'post_diagnosis':{
      if(this.clinical_history_postdiagonis_data.length == 0){
      this.GetClinicalPostdiagonis();
      }

    }

   /*  case 'allergies': {
      this.isolation_alert = data;
    }
    case 'pregnant': {
      this.pregnant_alert = data;
    }
    case 'covid': {
      this.covid_alert = data;
    } */
  }

  }

  customHeaderClick(event: Event) {
    event.stopPropagation();
  }

  enableAlert(name: any, event: any) {
    if (event.target.checked) { this.Alert_name = name; }
    else { this.Alert_name = '' }
  }

  AddNotes(stage: any) {
    this.addNotesModal?.show();
  }

  reply_id:number;
  hide_comment_field:boolean = true;
  reply_notes(id:number){
    this.reply_id  = id;
    this.hide_comment_field = false;
  }
  SaveNotes(){
    this.reply_id = null;
    this.hide_comment_field = true
  }

  GoBackToProcedureList()
  {
    localStorage.removeItem('PatientID');
    localStorage.removeItem('Procedure');
    localStorage.removeItem('MRN_NO');
    localStorage.removeItem('ExamStatus');
    localStorage.removeItem('Stage Type');
    this.router.navigateByUrl('/procedure');
  }

  Clinical_history() {
    let payload:Object = {};
    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    let patient_id = localStorage.getItem('PatientID')
    let mrn_number = localStorage.getItem('MRN_NO');
    payload["mrn_number"]=mrn_number;
    payload["patient_id"]=patient_id;

    // return null;
    console.log('Call Clinical History API');
    return this.http.post(`${this.apiUrl}${this.clinicalDiagnosis}`,payload); 
  }


  /* Clinical History Pre-diagonis add row code by Gani */

  get rowControls() {
    return (this.tableForm.get('rows') as FormArray).controls;
  }

  addRow() {
    const newRow = this.formBuilder.group({
      diagnosis: '',
      code: '',
      date:''
    });
   // (this.tableForm.get('rows') as FormArray).push(newRow);
    (this.tableForm.get('rows') as FormArray).insert(0, newRow);

  }

  deleteRow(index: number) {
    (this.tableForm.get('rows') as FormArray).removeAt(index);
  }

  saveData() {
    const rowData = this.tableForm.value.rows;
    let patient_id = localStorage.getItem('PatientID')
    let mrn_number = localStorage.getItem('MRN_NO');
    console.log('MRN Number',mrn_number);
    console.log(rowData); // Save the data as needed
    let payload:Object = {};

    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["stage_type"]='Requesting';
    payload["mrn_number"]= localStorage.getItem('MRN_NO');
    payload["patient_id"]=localStorage.getItem('PatientID');
    payload['diagones_data'] = rowData;
    payload['created_by'] = 1;
    payload['added_by'] = 1;

    
    this.http.post(`${this.apiUrl}${this.saveData1}`, payload).subscribe((response:any) => {
      console.log('Data saved successfully:', response);
      this.toastr.success(`${response.message}`,'Successfull', {
        positionClass: 'toast-top-center',
        timeOut: 1000,
      })
      this.GetClinicalHistory();
      this.tableForm.reset();
      (this.tableForm.get('rows') as FormArray).clear();


    }, error => {
      console.error('Error saving data:', error);
    });


  }
  /* Clinical History Pre-diagonis add row code by Gani */


  /** Delete Diagonis Details */

  deletePreDiagoanis(id:number) {
    this.delete_pre_diagonis_id = id;
    this.delete_modal?.show();

  }

  CloseModal(modalname:string){
    this.delete_modal?.hide();
  }

  DeletePrediagonis() {
    let payload:Object = {};

    payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
    payload["id"]= this.delete_pre_diagonis_id;
    payload["mrn_number"]= this.mrn_number;
    payload["patient_id"]= this.patient_id;
    payload['deleted_by'] = 1;

    this.http.post(`${this.apiUrl}${this.deletePreDiagnosis}`, payload).subscribe((response:any) => {
      console.log('Data saved successfully:', response);



      this.toastr.success(`${response.message}`,'Successfull', {
        positionClass: 'toast-top-center',
        timeOut: 2000,
      })
      this.delete_modal?.hide();
      this.GetClinicalHistory();
    }, error => {
      console.error('Error saving data:', error);
    });


  }


  /** Fetch The Clinical History Pre-diagonis tab */

  GetClinicalHistory(){
    this.Clinical_history().subscribe((response:any)=>{
      this.clinical_history = response.data;
      //console.log('Clinical History Response : ',this.clinical_history);
     })
  }

 /** Clinical History Indication Sub Tab */
 GetClinicalIndication(){
  this.Clinical_history_indication().subscribe((response:any)=>{
    this.clinical_history_indication_data = response.data;
    //console.log('Clinical History Indication Response : ',response.data);
   })
}


Clinical_history_indication() {
  let payload:Object = {};
  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["stage_type"]='Requesting';
  payload["mrn_number"]=this.mrn_number;
  payload["patient_id"]=this.patient_id;

  // return null;
  //console.log('Call Clinical History Indication API');
  return this.http.post(`${this.apiUrl}${this.clinicalHistoryIndication}`,payload);
  
} 


get rowControls1() {
  return (this.tableFormIndication.get('rows') as FormArray).controls;
}

addRowIndication() {
  const newRow = this.formBuilder.group({
    diagnosis: '',
    code: '',
    date:''
  });
 // (this.tableForm.get('rows') as FormArray).push(newRow);
  (this.tableFormIndication.get('rows') as FormArray).insert(0, newRow);

}

deleteRowIndication(index: number) {
  (this.tableFormIndication.get('rows') as FormArray).removeAt(index);
}


saveDataIndication() {
  const rowData = this.tableFormIndication.value.rows;
  let patient_id = localStorage.getItem('PatientID')
  let mrn_number = localStorage.getItem('MRN_NO');
  console.log('MRN Number',mrn_number);
  console.log(rowData); // Save the data as needed
  let payload:Object = {};

  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["stage_type"]='Requesting';
  payload["mrn_number"]= localStorage.getItem('MRN_NO');
  payload["patient_id"]=localStorage.getItem('PatientID');
  payload['indication_data'] = rowData;
  payload['created_by'] = 1;
  payload['added_by'] = 1;

  
  this.http.post(`${this.apiUrl}${this.saveDataIndication1}`, payload).subscribe((response:any) => {
    console.log('Data saved successfully:', response);
    this.toastr.success(`${response.message}`,'Successfull', {
      positionClass: 'toast-top-center',
      timeOut: 1000,
    })
    this.GetClinicalIndication();
    this.tableFormIndication.reset();
    (this.tableFormIndication.get('rows') as FormArray).clear();


  }, error => {
    console.error('Error saving data:', error);
  });


}



deleteIndication(id:number) {
  this.delete_indication_id = id;
  this.delete_indication_modal?.show();

}

CloseModaldeleteIndication(modalname:string){
  this.delete_indication_modal?.hide();
}

DeleteIndicationData() {
  let payload:Object = {};

  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["id"]= this.delete_indication_id;
  payload["mrn_number"]= this.mrn_number;
  payload["patient_id"]= this.patient_id;
  payload['deleted_by'] = 1;

  this.http.post(`${this.apiUrl}${this.deleteIndicationData}`, payload).subscribe((response:any) => {
    console.log('Data saved successfully:', response);



    this.toastr.success(`${response.message}`,'Successfull', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    })
    this.delete_indication_modal?.hide();
    this.GetClinicalIndication();
  }, error => {
    console.error('Error saving data:', error);
  });


}

 /** Clinical History Indication Sub Tab End */



 /** Clinical History POST Diagonis Tab Start */

 GetClinicalPostdiagonis(){
  this.Clinical_history_postdiagonis().subscribe((response:any)=>{
    this.clinical_history_postdiagonis_data = response.data;
    //console.log('Clinical History Indication Response : ',response.data);
   })
}


Clinical_history_postdiagonis() {
  let payload:Object = {};
  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["stage_type"]='Requesting';
  payload["mrn_number"]=this.mrn_number;
  payload["patient_id"]=this.patient_id;

  // return null;
  //console.log('Call Clinical History Indication API');
  return this.http.post(`${this.apiUrl}${this.clinicalPostDiagnosis}`,payload);
  
} 

get rowControls2() {
  return (this.tableFormPostdiagonis.get('rows') as FormArray).controls;
}

addRowPostDiagonis() {
  const newRow = this.formBuilder.group({
    diagnosis: '',
    code: '',
    date:''
  });
 // (this.tableForm.get('rows') as FormArray).push(newRow);
  (this.tableFormPostdiagonis.get('rows') as FormArray).insert(0, newRow);

}


deleteRowPostDiagonis(index: number) {
  (this.tableFormPostdiagonis.get('rows') as FormArray).removeAt(index);
}


saveDataPostDiagonis() {
  const rowData = this.tableFormPostdiagonis.value.rows;
  let patient_id = localStorage.getItem('PatientID')
  let mrn_number = localStorage.getItem('MRN_NO');
  console.log('MRN Number',mrn_number);
  console.log(rowData); // Save the data as needed
  let payload:Object = {};

  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["stage_type"]='Requesting';
  payload["mrn_number"]= localStorage.getItem('MRN_NO');
  payload["patient_id"]=localStorage.getItem('PatientID');
  payload['post_diagnosis_data'] = rowData;
  payload['created_by'] = 1;
  payload['added_by'] = 1;

  
  this.http.post(`${this.apiUrl}${this.saveDatapostDiagnosis1}`, payload).subscribe((response:any) => {
    console.log('Data saved successfully:', response);
    this.toastr.success(`${response.message}`,'Successfull', {
      positionClass: 'toast-top-center',
      timeOut: 1000,
    })
    this.GetClinicalPostdiagonis();
    this.tableFormPostdiagonis.reset();
    (this.tableFormPostdiagonis.get('rows') as FormArray).clear();


  }, error => {
    console.error('Error saving data:', error);
  });


}



deletePostdiagonis(id:number) {
  this.delete_postdiagonis_id = id;
  this.delete_post_modal?.show();

}

CloseModaldeletePostdiagonis(modalname:string){
  this.delete_post_modal?.hide();
}

DeletePostDiagonis() {
  let payload:Object = {};

  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["id"]= this.delete_postdiagonis_id;
  payload["mrn_number"]= this.mrn_number;
  payload["patient_id"]= this.patient_id;
  payload['deleted_by'] = 1;

  this.http.post(`${this.apiUrl}${this.deletePostDiagnol1}`, payload).subscribe((response:any) => {
    console.log('Data saved successfully:', response);



    this.toastr.success(`${response.message}`,'Successfull', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    })
    this.delete_post_modal?.hide();
    this.GetClinicalPostdiagonis();
  }, error => {
    console.error('Error saving data:', error);
  });


}




/** Clinical History POST Diagonis Tab End */


/** Lab Details Tab Start */

GetLab(){
  this.GetLabDetails().subscribe((response:any)=>{
    this.lab_data = response.data;
    //console.log('Clinical History Indication Response : ',response.data);
   })
}


GetLabDetails() {
  let payload:Object = {};
  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["stage_type"]='Requesting';
  payload["mrn_number"]=this.mrn_number;
  payload["patient_id"]=this.patient_id;

  // return null;
  //console.log('Call Clinical History Indication API');
  return this.http.post(`${this.apiUrl}${this.getLabDetails1}`,payload);
  
} 

get rowControlslab() {
  return (this.tablelab.get('rows') as FormArray).controls;
}

addRowLab() {
  const newRow = this.formBuilder.group({
    test_name: '',
    result: '',
    date:''
  });
 // (this.tableForm.get('rows') as FormArray).push(newRow);
  (this.tablelab.get('rows') as FormArray).insert(0, newRow);

}

deleteRowLab(index: number) {
  (this.tablelab.get('rows') as FormArray).removeAt(index);
}


saveDataLab() {
  const rowData = this.tablelab.value.rows;
  let patient_id = localStorage.getItem('PatientID')
  let mrn_number = localStorage.getItem('MRN_NO');
  console.log('MRN Number',mrn_number);
  console.log(rowData); // Save the data as needed
  let payload:Object = {};

  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["stage_type"]='Requesting';
  payload["mrn_number"]= localStorage.getItem('MRN_NO');
  payload["patient_id"]=localStorage.getItem('PatientID');
  payload['patient_lab_data'] = rowData;
  payload['created_by'] = 1;
  payload['added_by'] = 1;

  
  this.http.post(`${this.apiUrl}${this.saveDataLab1}`, payload).subscribe((response:any) => {
    console.log('Data saved successfully:', response);
    this.toastr.success(`${response.message}`,'Successfull', {
      positionClass: 'toast-top-center',
      timeOut: 1000,
    })
    this.GetLab();
    this.tablelab.reset();
    (this.tablelab.get('rows') as FormArray).clear();


  }, error => {
    console.error('Error saving data:', error);
  });


}


deleteLab(id:number) {
  this.delete_lab_id = id;
  this.delete_lab_modal?.show();

}

CloseModaldeleteLab(modalname:string){
  this.delete_lab_modal?.hide();
}

DeleteLabData() {
  let payload:Object = {};

  payload["token"]='1a32e71a46317b9cc6feb7388238c95d';
  payload["id"]= this.delete_lab_id;
  payload["mrn_number"]= this.mrn_number;
  payload["patient_id"]= this.patient_id;
  payload['deleted_by'] = 1;

  this.http.post(`${this.apiUrl}${this.patientLabDelete}`, payload).subscribe((response:any) => {       
    this.toastr.success(`${response.message}`,'Successfull', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    })
    this.delete_lab_modal?.hide();
    this.GetLab();
  }, error => {
    console.error('Error saving data:', error);
  });


}




/** Lab Details Tab End */


}

