import { CdkStep, CdkStepperModule, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {


  ProfileImage : any ;
  showImage:boolean = false;
  personaldetailsform : UntypedFormGroup;
  contactDetailsform : UntypedFormGroup;
  addressform : UntypedFormGroup;
  healthdetailsform : UntypedFormGroup;
  otherdetailsform : UntypedFormGroup;
  @ViewChild('cdkStepper') cdkStepper : CdkStep;

  constructor(private formbuilder : UntypedFormBuilder,private allService : AllServicesService,private toastr : ToastrService,private router : Router){
    this.personaldetailsform = this.formbuilder.group({
      patient_img:[],
      title : ['Mr'],
      first_name:['',[Validators.required, Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(50)]],
      middle_name:[''],
      last_name:['',[Validators.required, Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(50)]],
      partner_name : [],
      children_name: [],
      occupation:['', [Validators.required]],
      dob:[new Date(),[Validators.required]],
      age:['',[Validators.required]],
      language : [],
      referred_by : [],
      gender : [,[Validators.required]],
      martial_status : [,[Validators.required]]
    });

    this.contactDetailsform = this.formbuilder.group({
      telephone_number:[,[Validators.required,Validators.pattern('\\d*')]],
      email:['',[Validators.required,Validators.email]]
    });

    this.addressform = this.formbuilder.group({
      addresstype:[,[Validators.required]],
      flatNo : [],
      StreetNo : [],
      StreetName : [,[Validators.required]],
      suburb : [],
      town : [],
      state : [],
      postcode : ['',[Validators.required]]
    });

    this.healthdetailsform = this.formbuilder.group({
      bloodgroup:[,[Validators.required]],
      height : [,[Validators.required,Validators.pattern('\\d*')]],
      weight : [,[Validators.required,Validators.pattern('\\d*')]],
      bloodPressure : [],
      heartBeat : [],
      temperature : [],
      spo2 : [],
      respiratoryRate : [],
      Speciality : [],
      Priority: [,[Validators.required]]
    });

    this.otherdetailsform = this.formbuilder.group({
      clientInformation : [],
      notes : []
    })
  }
  ngOnInit(): void {
  }
  onStepSelectionChange(event: StepperSelectionEvent) {

  }

  BackToPatientList(){
    this.router.navigateByUrl('/patient-registration/patient_list');
    this.personaldetailsform.reset();
    this.contactDetailsform.reset();
    this.addressform.reset();
    this.healthdetailsform.reset();
    this.otherdetailsform.reset();
  }

  AddPersonalDetails(FormValue:any){
    console.log(FormValue);
  }
  AddContactDetails(FormValue:any){
    console.log(FormValue);
  }
  AddAdressForm(FormValue:any){
    console.log(FormValue);
  }
  AddHealthDetailsForm(FormValue:any){
    console.log(FormValue);
  }

  RegisterPatient(PersonalDetails:any,ContactDetails:any,Address:any,healthDetails:any,Otherdetails:any){
    this.allService.Resgisterpatient(PersonalDetails,ContactDetails,Address,healthDetails,Otherdetails,this.Patient_img).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          console.log(res);
          this.personaldetailsform.reset();
          this.contactDetailsform.reset();
          this.addressform.reset();
          this.healthdetailsform.reset();
          this.otherdetailsform.reset();
          this.cdkStepper.reset();
          this.ProfileImage = '';
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`${res}`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  Patient_img :any ;
  AddImage(event:any){
    console.log('sdd',event.target.files[0]);
    this.Patient_img = event.target.files[0];
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event2) => {
        this.ProfileImage = reader.result;
      };
      this.showImage = true;
    }
  }
}
