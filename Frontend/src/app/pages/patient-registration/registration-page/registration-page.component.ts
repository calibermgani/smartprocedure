import { CdkStep, CdkStepperModule, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { environment_new } from 'src/environments/environment';

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
  public apiUrl: any = environment_new.imageUrl;
  @ViewChild('cdkStepper') cdkStepper : CdkStep;

  constructor(private formbuilder : UntypedFormBuilder,private allService : AllServicesService,private toastr : ToastrService,private router : Router){
    this.personaldetailsform = this.formbuilder.group({
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
    let patientId = localStorage.getItem('Patient_ID');
    if(patientId){
      this.allService.GetSpecificPatientDetails(patientId).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            let languagesArray : any = null;
            this.showImage = true;
            this.ProfileImage = this.apiUrl+res.patient.image;
            if(res.patient.language){
              let languagesString = res.patient.language;
              languagesArray = languagesString.split(",");
            }
            console.log(res);
            this.personaldetailsform.patchValue({
              title : res.patient.title != 'null' ? res.patient.title : '',
              first_name:res.patient.first_name != 'null' ? res.patient.first_name : '',
              middle_name:res.patient.middle_name != 'null' ? res.patient.middle_name : '',
              last_name:res.patient.surname != 'null' ? res.patient.surname : '',
              partner_name : res.patient.name_of_partner != 'null' ? res.patient.name_of_partner : '',
              children_name:res.patient.name_of_children != 'null' ? res.patient.name_of_children : '',
              occupation:res.patient.occupation != 'null' ? res.patient.occupation : '',
              dob:res.patient.dob != 'null' ? res.patient.dob : '',
              age:res.patient.age != 'null' ? res.patient.age : '',
              language : res.patient.language != 'null' ? languagesArray : null,
              referred_by :res.patient.referred_by != 'null' ? res.patient.referred_by : '',
              gender : res.patient.gender != 'null' ? res.patient.gender : '',
              martial_status :res.patient.marital_status != 'null' ? res.patient.marital_status : ''
            });
            this.contactDetailsform.patchValue({
              telephone_number:res.patient.telephone != 'null' ? res.patient.telephone : '',
              email:res.patient.primary_email != 'null' ? res.patient.primary_email : ''
            });
            this.addressform.patchValue({
              addresstype:res.patient.address_type != 'null' ? res.patient.address_type : null,
              flatNo : res.patient.flat_unit_no != 'null' ? res.patient.flat_unit_no : '',
              StreetNo : res.patient.street_no != 'null' ? res.patient.street_no : '',
              StreetName : res.patient.street_name != 'null' ? res.patient.street_name : '',
              suburb :res.patient.suburb != 'null' ? res.patient.suburb : '' ,
              town : res.patient.town_city != 'null' ? res.patient.town_city : '',
              state :res.patient.state != 'null' ? res.patient.state : null ,
              postcode : res.patient.post_code != 'null' ? res.patient.post_code : ''
            });
            this.healthdetailsform.patchValue({
              bloodgroup:res.patient.blood_group != 'null' ? res.patient.blood_group : null,
              height :res.patient.height != 'null' ? res.patient.height : '',
              weight : res.patient.weight != 'null' ? res.patient.weight : '',
              bloodPressure : res.patient.blood_pressure != 'null' ? res.patient.blood_pressure : '',
              heartBeat : res.patient.heart_beat != 'null' ? res.patient.heart_beat : '',
              temperature : res.patient.temperature != 'null' ? res.patient.temperature : '',
              spo2 : res.patient.spo2 != 'null' ? res.patient.spo2 : '',
              respiratoryRate : res.patient.respiratory_rate  != 'null' ? res.patient.respiratory_rate : '',
              Speciality :res.patient.specialty != 'null' ? res.patient.specialty : '',
              Priority: res.patient.priority != 'null' ? res.patient.priority : null
            });
            this.otherdetailsform.patchValue({
              clientInformation :res.patient.critical_information != 'null' ? res.patient.critical_information : '',
              notes : res.patient.notes != 'null' ? res.patient.notes : ''
            });
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
  }
  onStepSelectionChange(event: StepperSelectionEvent) {

  }

  BackToPatientList(){
    this.router.navigateByUrl('/patient-registration/patient_list');
    localStorage.removeItem('Patient_ID');
    this.showImage = false;
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
