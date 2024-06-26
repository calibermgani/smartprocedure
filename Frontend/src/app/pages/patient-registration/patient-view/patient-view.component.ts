import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { ToastrService } from 'ngx-toastr';
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
  isYesSelected: {[key:string]:boolean | null} = {
    fall: false,
    allergy: false,
    isolation: false,
    covid: false,
    gcs: false,
    pregnant: false,
    diabetes: false,
    contrast: false
  }

  selectedCard: string = '';
  gcsEyeOpening : number[] = [];
  gcsVerbalResponse : number[] = [];
  gcsMotorResponse : number[] = [];
  contrastReactionValues : number[] = [];


  @ViewChild('edit_vitals', { static: false }) edit_vitals?: ModalDirective;
  @ViewChild('edit_precautions', { static: false }) edit_precautions?: ModalDirective;
  @ViewChild('edit_alerts', { static: false }) edit_alerts?: ModalDirective;
  @ViewChild('view_gcs', { static: false }) view_gcs?: ModalDirective;

  @ViewChild('contrastContent') contrastContent: ElementRef;

  patient_id : any= localStorage.getItem('PatientID')
  mrn_number : any = localStorage.getItem('MRN_NO');
  procedure_id : any = localStorage.getItem('Procedure');
  patientViewForm: FormGroup;
  vitalDetailData: any = {};


  constructor(private allService:AllServicesService, private http: HttpClient,private formbuilder: FormBuilder, private toastr: ToastrService) {
    this.patientViewForm = this.formbuilder.group({
      blood_pressure: [''],
      respiratory_rate: [''],
      temperature: [''],
      heart_beat: [''],
      spO2: ['']
    })
  }
  

  ngOnInit(){
    this.patient = this.allService.getPatientData();
    this.patientAge = this.allService.calculateAge(this.patient?.dob);
  }

  ngAfterViewInit(): void {
    this.scrollToContent();

  }

  OpenModal(modalName: string){
    if(modalName === 'edit_vitals' && this.edit_vitals){
      this.edit_vitals?.show();
      this.allService.editVitals().subscribe((res: any)=>{
        this.patientViewForm.patchValue({
          blood_pressure: res.blood_pressure,
          respiratory_rate: res.respiratory_rate,
          temperature: res.temperature,
          heart_beat: res.heart_beat,
          spO2: res.spO2
        })
      })
    }
    else if(modalName === 'edit_precautions' && this.edit_precautions) this.edit_precautions?.show();
    else if(modalName === 'edit_alerts' && this.edit_alerts) this.edit_alerts?.show();
    else if(modalName === 'edit_alerts' && this.edit_alerts) this.edit_alerts?.show();
    else if(modalName === 'view_gcs' && this.view_gcs) this.view_gcs?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'edit_vitals') this.edit_vitals?.hide();
    else if(modalName === 'edit_precautions') this.edit_precautions.hide();
    else if(modalName === 'edit_alerts') this.edit_alerts.hide();
    else if(modalName === 'view_gcs') this.view_gcs.hide();
  }

  selectYes(item : string) {
    this.isYesSelected[item] = true;
    setTimeout(()=>{
      this.scrollToContent();
    },0)

  }

  selectNo(item : string) {
    this.isYesSelected[item] = false;
  }
  onCheckboxChange(precaution: string, value: number, event: any) {
    if (event.target.checked && precaution === 'eye_opening') {
      this.gcsEyeOpening.push(value);
    } else if(event.target.checked && precaution === 'verbal_response') {
      this.gcsVerbalResponse.push(value);
    } else if(event.target.checked && precaution === 'motor_response') {
      this.gcsMotorResponse.push(value);
    }
    else {
      this.gcsEyeOpening = this.gcsEyeOpening.filter(item => item !== value);
      this.gcsVerbalResponse = this.gcsVerbalResponse.filter(item => item !== value);
      this.gcsMotorResponse = this.gcsMotorResponse.filter(item => item !== value);
    }
  }

  scrollToContent(): void {
    if ((this.contrastContent && this.isYesSelected['contrast']) || (this.contrastContent && this.isYesSelected['gcs'])) {
      this.contrastContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onCardClick(card: string): void {
    if (this.selectedCard === card) {
      this.selectedCard = '';
    } else {
      this.selectedCard = card;
    }
  }

  addVitalsDetails(vitalsDetails:any){
    this.vitalDetailData = vitalsDetails;
    console.log(vitalsDetails);
    this.allService.saveVitalDetails(vitalsDetails.blood_pressure,vitalsDetails.respiratory_rate,vitalsDetails.temperature,vitalsDetails.heart_beat,vitalsDetails.spO2).subscribe({
      next:((res:any)=>{
        this.toastr.success(`${res.message}`, 'Successful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    });
    this.resetForm();
  }

  resetForm(){
    this.patientViewForm.reset();
  }

  savePrecautions(){
    let fall = this.isYesSelected['fall'] ? 'yes': 'no'; 
    let allergy = this.isYesSelected['allergy'] ? 'yes': 'no'; 
    let isolation = this.isYesSelected['isolation'] ? 'yes': 'no'; 
    let covid = this.isYesSelected['covid'] ? 'yes': 'no'; 
    let gcs = this.isYesSelected['gcs'] ? 'yes': 'no'; 
    let pregnant = this.isYesSelected['pregnant'] ? 'yes': 'no'; 
    let diabetic = this.isYesSelected['diabetic'] ? 'yes': 'no'; 
    let contrast_reaction = this.isYesSelected['contrast_reaction'] ? 'yes': 'no'; 
    let gcs_eye_opening = `'gcs_eye_opening':[${this.gcsEyeOpening.join(',')}]`;
    let gcs_verbal_response = `'gcs_verbal_response':[${this.gcsVerbalResponse.join(',')}]`;
    let gcs_motor_response = `'gcs_motor_response':[${this.gcsMotorResponse.join(',')}]`;
    let contrast_reaction_values = this.contrastReactionValues;

    this.allService.savePrecautions(fall,allergy,isolation,covid,gcs,pregnant,diabetic,contrast_reaction,gcs_eye_opening,gcs_verbal_response,gcs_motor_response,contrast_reaction_values).subscribe({
      next:((res:any)=>{
        this.toastr.success(`${res.message}`, 'Successful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }


}
