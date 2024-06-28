import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';

@Component({
  selector: 'app-clinical-history-tab',
  templateUrl: './clinical-history-tab.component.html',
  styleUrls: ['./clinical-history-tab.component.scss']
})
export class ClinicalHistoryTabComponent implements OnInit {
  tableFormClinicalHistory: FormGroup;
  tableFormIndication: FormGroup;
  tableFormPostDiagnosis: FormGroup;

  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;
  @ViewChild('edit_clinical_history', { static: false }) edit_clinical_history?: ModalDirective;
  @ViewChild('edit_indication_modal', { static: false }) edit_indication_modal?: ModalDirective;
  @ViewChild('edit_post_diagnosis_modal', { static: false }) edit_post_diagnosis_modal?: ModalDirective;

  // public apiUrl: any = environment_new.apiUrl;
  // public clinicalDiagnosis: any = environment_new.clinicalDiagnosis;
  // public saveData1: any = environment_new.saveData;
  // public saveDataIndication1: any = environment_new.saveDataIndication;

  clinical_history: any[] = [];
  indication: any[] = [];
  post_diagnosis: any[] = [];
  pre_ind_post_diagnosis_options = [];
  currentDiagnosis: string = 'Pre-diagnosis';
  

  constructor(private allService: AllServicesService, private http: HttpClient,private toastr : ToastrService,private formBuilder: FormBuilder,private datePipe: DatePipe){}

  ngOnInit(){
    this.tableFormClinicalHistory = this.formBuilder.group({
      rows: this.formBuilder.array([this.createDiagnosisGroup()])
    });
    this.tableFormIndication = this.formBuilder.group({
      rows_1: this.formBuilder.array([this.createDiagnosisGroup1()])
    });
    this.tableFormPostDiagnosis = this.formBuilder.group({
      rows_2: this.formBuilder.array([this.createDiagnosisGroup2()])
    });
    this.Get_Clinical_history();
    this.get_Indication_History();
    this.get_Post_Diagnosis_History();
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }
  /*clinical_history Api Integration By Adaikkalam (Pre-Diagnosis)*/
  Get_Clinical_history(){
    this.allService.Get_Clinical_history().subscribe((clinical_data : any)=>{
      if(clinical_data.status === 'Success'){
        this.clinical_history = clinical_data.data;
        this.clinical_history  = this.clinical_history.map((dateTime)=>{
          let date = new Date(dateTime.created_at);
          dateTime.created_at = this.allService.formattedDate(date);
          dateTime.created_Time = this.allService.formatTime(date);
          return dateTime;
        })
      }
      else console.error('Error Fetching Data', clinical_data.message)
    },
    (error:any)=>{
      console.error("API Error:", error)
    }
  );
  }

  get rows(): FormArray {
    return this.tableFormClinicalHistory.get('rows') as FormArray;
  }

  createDiagnosisGroup(): FormGroup {
    return this.formBuilder.group({
      diagnosis: [''],
      code: [''],
      date: ['']
    });
  }
  
  addRow(): void {
    this.rows.push(this.createDiagnosisGroup());    
  }

  deleteRow(index: number) {
    if(this.rows.length > 1){
      (this.tableFormClinicalHistory.get('rows') as FormArray).removeAt(index);
    }
  }

  resetFormAndAddEmptyRow() {
    this.tableFormClinicalHistory.reset();
    (this.tableFormClinicalHistory.get('rows') as FormArray).clear();
    this.addEmptyRow();
  }

  addEmptyRow() {
    const rows = this.tableFormClinicalHistory.get('rows') as FormArray;
    rows.push(this.formBuilder.group({
      diagnosis: [''],
      code: [''],
      date: ['']
    }));
  }

 clinical_History_Data(){
  const rowData = this.tableFormClinicalHistory.value.rows;
    this.allService.save_Clinical_Data(rowData).subscribe((clinical_data : any)=>{
      this.toastr.success(`${clinical_data.message}`,'Successfull', {
        positionClass: 'toast-top-center',
        timeOut: 1000
      });
      this.Get_Clinical_history();
      this.resetFormAndAddEmptyRow();
    },
    (error:any)=>{
      console.error("API Error:", error);
    })
 }

   /*clinical_history Api Integration By Adaikkalam (Indication)*/

   createDiagnosisGroup1(): FormGroup {
    return this.formBuilder.group({
      diagnosis: [''],
      code: [''],
      date: ['']
    });
  }

  get indication_rows(){
    return this.tableFormIndication.get('rows_1') as FormArray;
  }
  addRowIndication(): void {
    this.indication_rows.push(this.createDiagnosisGroup1());    
  }
  

  deleteRowIndication(index: number) {
    if(this.indication_rows.length > 1){
      (this.tableFormIndication.get('rows_1') as FormArray).removeAt(index);
    }
  }

  get_Indication_History(){
    this.allService.Get_Indication_History().subscribe(( indication : any)=>{
      if(indication.status === 'Success') {
        this.indication = indication.data;
        this.indication = this.indication.map((dateTime)=>{
            let date = new Date(dateTime.created_at);
            dateTime.created_at = this.allService.formattedDate(date);
            dateTime.created_Time = this.allService.formatTime(date);
            return dateTime;
        })
      }
      else console.error('Error Fetching Data', indication.message)
    },
    (error:any)=>{
      console.error("API Error:", error)
    }
  );
  }

  resetFormAndAddEmptyRow1() {
    this.tableFormIndication.reset();
    (this.tableFormIndication.get('rows_1') as FormArray).clear();
    this.addEmptyRow1();
  }

  addEmptyRow1() {
    const rows = this.tableFormIndication.get('rows_1') as FormArray;
    rows.push(this.formBuilder.group({
      diagnosis: [''],
      code: [''],
      date: ['']
    }));
  }

  save_Indication_Data() {
    const rowData = this.tableFormIndication.value.rows_1;
    this.allService.save_Indication_Data(rowData).subscribe((indication_data : any)=>{
      this.toastr.success(`${indication_data.message}`,'Successfull', {
        positionClass: 'toast-top-center',
        timeOut: 1000
      });
      this.get_Indication_History();
      this.resetFormAndAddEmptyRow1();
    },
    (error:any)=>{
      console.error("API Error:", error);
    })
  }

  /*clinical_history Api Integration By Adaikkalam (Post-Diagnosis)*/

  createDiagnosisGroup2(): FormGroup {
    return this.formBuilder.group({
      diagnosis: [''],
      code: [''],
      date: ['']
    });
  }

  get post_diagnosis_rows(){
    return this.tableFormPostDiagnosis.get('rows_2') as FormArray;
  }

  addPostDiagnosis(): void {
    this.post_diagnosis_rows.push(this.createDiagnosisGroup2());    
  }

  deleteRowDiagnosis(index: number) {
    if(this.post_diagnosis_rows.length > 1){
      (this.tableFormPostDiagnosis.get('rows_2') as FormArray).removeAt(index);
    }
  }

  get_Post_Diagnosis_History(){
    this.allService.Get_Post_Diagnosis_History().subscribe(( post_diagnosis : any)=>{
      if(post_diagnosis.status === 'Success') {
        this.post_diagnosis = post_diagnosis.data;
        this.post_diagnosis = this.post_diagnosis.map((dateTime)=>{
            let date = new Date(dateTime.created_at);
            dateTime.created_at = this.allService.formattedDate(date);
            dateTime.created_Time = this.allService.formatTime(date);
            return dateTime;
          })
      } else console.error('Error Fetching Data', post_diagnosis.message);
    },
    (error:any)=>{
      console.error("API Error:", error)
    });
  }
  
  resetFormAndAddEmptyRow2() {
    this.tableFormPostDiagnosis.reset();
    (this.tableFormPostDiagnosis.get('rows_2') as FormArray).clear();
    this.addEmptyRow2();
  }

  addEmptyRow2() {
    const rows = this.tableFormPostDiagnosis.get('rows_2') as FormArray;
    rows.push(this.formBuilder.group({
      diagnosis: [''],
      code: [''],
      date: ['']
    }));
  }

  save_Post_Diagnosis_Data() {
    const rowData = this.tableFormPostDiagnosis.value.rows_2;
    this.allService.save_PostDiagnosis_Data(rowData).subscribe((post_diagnosis_data : any)=>{
      this.toastr.success(`${post_diagnosis_data.message}`,'Successfull', {
        positionClass: 'toast-top-center',
        timeOut: 1000
      });
      this.get_Post_Diagnosis_History();
      this.resetFormAndAddEmptyRow2();
    })
  }
  selectDiagnosis(diagnosis : string){
    this.currentDiagnosis = diagnosis;
    console.log(this.currentDiagnosis);
    
  }

  clinical_history_save(){
    if (this.currentDiagnosis == 'Pre-diagnosis') {
      this.clinical_History_Data();
  } else if (this.currentDiagnosis == 'indication') {
      this.save_Indication_Data();
  } else if (this.currentDiagnosis == 'Post-diagnosis') {
      this.save_Post_Diagnosis_Data();
  }
  }

  AddModal(modalName : string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
    this.tableFormClinicalHistory = this.formBuilder.group({
      rows: this.formBuilder.array([this.createDiagnosisGroup()])
    });
    this.tableFormIndication = this.formBuilder.group({
      rows_1: this.formBuilder.array([this.createDiagnosisGroup1()])
    });
    this.tableFormPostDiagnosis = this.formBuilder.group({
      rows_2: this.formBuilder.array([this.createDiagnosisGroup2()])
    });
  }

  OpenModal(modalName: string, activeTab: string){
   
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
    this.tableFormClinicalHistory = this.formBuilder.group({
      rows: this.formBuilder.array([])
    });
    this.tableFormIndication = this.formBuilder.group({
      rows_1: this.formBuilder.array([])
    });
    this.tableFormPostDiagnosis = this.formBuilder.group({
      rows_2: this.formBuilder.array([])
    });
    if(activeTab === 'pre-diagnosis'){
      this.selectDiagnosis('Pre-diagnosis');
      this.clinical_history.forEach(()=>this.addRow());
      this.clinical_history.forEach((values,index)=>{
        this.rows.controls[index].patchValue({
          diagnosis : values.diagnosis,
          code : values.code,
          date : values.date
        })
        this.tableFormIndication = this.formBuilder.group({
          rows_1: this.formBuilder.array([this.createDiagnosisGroup1()])
        });
        this.tableFormPostDiagnosis = this.formBuilder.group({
          rows_2: this.formBuilder.array([this.createDiagnosisGroup2()])
        });
      });
    }else if(activeTab === 'indication'){
      this.selectDiagnosis('indication');
      this.indication.forEach(()=>this.addRowIndication());
      this.indication.forEach((values,index)=>{
        this.indication_rows.controls[index].patchValue({
          diagnosis : values.diagnosis,
          code : values.code,
          date : values.date
        })
        this.tableFormClinicalHistory = this.formBuilder.group({
          rows: this.formBuilder.array([this.createDiagnosisGroup()])
        });
        this.tableFormPostDiagnosis = this.formBuilder.group({
          rows_2: this.formBuilder.array([this.createDiagnosisGroup2()])
        });
      });
    }else if(activeTab === 'post_diagnosis'){
      this.selectDiagnosis('Post-diagnosis');
      this.post_diagnosis.forEach(()=>this.addPostDiagnosis());
      this.post_diagnosis.forEach((values,index)=>{
        this.post_diagnosis_rows.controls[index].patchValue({
          diagnosis : values.diagnosis,
          code : values.code,
          date : values.date
        })
        this.tableFormClinicalHistory = this.formBuilder.group({
          rows: this.formBuilder.array([this.createDiagnosisGroup()])
        });
        this.tableFormIndication = this.formBuilder.group({
          rows_1: this.formBuilder.array([this.createDiagnosisGroup1()])
        });
      });
    }
  }

}
