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

  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;

  public apiUrl: any = environment_new.apiUrl;
  public clinicalDiagnosis: any = environment_new.clinicalDiagnosis;
  public saveData1: any = environment_new.saveData;
  public saveDataIndication1: any = environment_new.saveDataIndication;

  clinical_history: any[] = [];
  indication: any[] = [];

  pre_ind_post_diagnosis_options = [];

  constructor(private allService: AllServicesService, private http: HttpClient,private toastr : ToastrService,private formBuilder: FormBuilder,private datePipe: DatePipe){}

  ngOnInit(){
    this.tableFormClinicalHistory = this.formBuilder.group({
      rows: this.formBuilder.array([this.createDiagnosisGroup()])
    });
    this.tableFormIndication = this.formBuilder.group({
      rows: this.formBuilder.array([this.createDiagnosisGroup()])
    });
    this.Get_Clinical_history();
  }

  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }
  /*clinical_history Api Integration By Adaikkalam*/
  Get_Clinical_history(){
    this.allService.Get_Clinical_history().subscribe((clinical_data : any)=>{
      console.log(clinical_data,'clinical');
      if(clinical_data.status === 'Success') 
        this.clinical_history = clinical_data.data;
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
    })
 }

  get indication_rows(){
    return this.tableFormIndication.get('rows') as FormArray;
  }

  addRowIndication(): void {
    this.rows.push(this.createDiagnosisGroup());    
  }

  deleteRowIndication(index: number) {
    if(this.rows.length > 1){
      (this.tableFormClinicalHistory.get('rows') as FormArray).removeAt(index);
    }
  }

  get_Indication_History(){
    this.allService.Get_Indication_History().subscribe(( indication : any)=>{
      console.log(indication,'indication');
      if(indication.status === 'Success') 
        this.indication = indication.data;
      else console.error('Error Fetching Data', indication.message)
    },
    (error:any)=>{
      console.error("API Error:", error)
    }
  );
  }

  save_Indication_Data() {
    const rowData = this.tableFormIndication.value.rows;
    this.allService.save_Indication_Data(rowData).subscribe((indication_data : any)=>{
      this.toastr.success(`${indication_data.message}`,'Successfull', {
        positionClass: 'toast-top-center',
        timeOut: 1000
      });
      this.get_Indication_History();
      this.resetFormAndAddEmptyRow();
    })
  
  
  }

}
