import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';


@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent {
  patient: any;
  patientAge: number;
  patientType : string;
  isSliderDisabled: boolean = true;
  isSliderDisabled1: boolean = true;
  isSliderDisabled2: boolean = true;
  isSliderDisabled3: boolean = true;
  @ViewChild('edit_vitals', { static: false }) edit_vitals?: ModalDirective;
  @ViewChild('edit_precautions', { static: false }) edit_precautions?: ModalDirective;
  @ViewChild('edit_alerts', { static: false }) edit_alerts?: ModalDirective;


  public patientLabDelete: any = environment_new.patientLabDelete;
  public saveDataLab1: any = environment_new.saveDataLab;
  public getLabDetails1:  any = environment_new.getLabDetails;
  // public deletePostDiagnol1: any = environment_new.deletePostDiagnol;
  public saveDatapostDiagnosis1: any = environment_new.saveDatapostDiagnosis;
  public clinicalPostDiagnosis: any = environment_new.clinicalPostDiagnosis;
  // public deleteIndicationData: any = environment_new.deleteIndicationData;
  public saveDataIndication1: any = environment_new.saveDataIndication;
  public clinicalHistoryIndication: any = environment_new.clinicalHistoryIndication;
  // public deletePreDiagnosis: any = environment_new.deletePreDiagnosis;
  public saveData1: any = environment_new.saveData;
  public getMediationDetails: any = environment_new.getMediationDetails;
  public saveMediationData1: any = environment_new.saveMediationData;


  patient_id : any= localStorage.getItem('PatientID')
  mrn_number : any = localStorage.getItem('MRN_NO');
  procedure_id : any = localStorage.getItem('Procedure');

  constructor(private allService:AllServicesService, private http: HttpClient){}

  ngOnInit(){
    this.patient = this.allService.getPatientData();
    this.patientAge = this.allService.calculateAge(this.patient?.dob);
  }

  OpenModal(modalName: string){
    if(modalName === 'edit_vitals' && this.edit_vitals) this.edit_vitals?.show();
    else if(modalName === 'edit_precautions' && this.edit_precautions) this.edit_precautions?.show();
    else if(modalName === 'edit_alerts' && this.edit_alerts) this.edit_alerts?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'edit_vitals') this.edit_vitals?.hide();
    else if(modalName === 'edit_precautions') this.edit_precautions.hide();
    else if(modalName === 'edit_alerts') this.edit_alerts.hide();
  }

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    showSelectionBar: true
  };

  toggleSlider(event: Event, value : string): void {
    const checkbox = event.target as HTMLInputElement;
    if(value == 'fall')       this.isSliderDisabled = !checkbox.checked;
    else if(value === 'isolation')  this.isSliderDisabled1 = !checkbox.checked;
    else if(value === 'pregnant')  this.isSliderDisabled2 = !checkbox.checked;
    else if(value === 'covid')  this.isSliderDisabled3 = !checkbox.checked;
  }



}
