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
    fall: null,
    allergy: null,
    isolation: null,
    covid: null,
    gcs: false,
    pregnant: null,
    diabetes: null,
    contrast: false
  }

  selectedCard: string = '';


  @ViewChild('edit_vitals', { static: false }) edit_vitals?: ModalDirective;
  @ViewChild('edit_precautions', { static: false }) edit_precautions?: ModalDirective;
  @ViewChild('edit_alerts', { static: false }) edit_alerts?: ModalDirective;
  @ViewChild('view_gcs', { static: false }) view_gcs?: ModalDirective;

  @ViewChild('contrastContent') contrastContent: ElementRef;

  patient_id : any= localStorage.getItem('PatientID')
  mrn_number : any = localStorage.getItem('MRN_NO');
  procedure_id : any = localStorage.getItem('Procedure');
  patientViewForm: FormGroup;
  vitalDetailData: any[]=[];

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
    if(modalName === 'edit_vitals' && this.edit_vitals) this.edit_vitals?.show();
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
    console.log(vitalsDetails);
    this.allService.saveVitalDetails(vitalsDetails.blood_pressure,vitalsDetails.respiratory_rate,vitalsDetails.temperature,vitalsDetails.heart_beat,vitalsDetails.spO2).subscribe({
      next:((res:any)=>{
        this.toastr.success(`${res.message}`, 'Successful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
        if(res.status === 'Success'){
          this.vitalDetailData = res.data;
          console.log(this.vitalDetailData, 'vitals');
        }
      })
    });
    this.resetForm();
  }

  resetForm(){
    this.patientViewForm.reset();
  }


}
