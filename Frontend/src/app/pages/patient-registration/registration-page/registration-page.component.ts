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
  FirstPageValidation : boolean;

  constructor(private formbuilder : UntypedFormBuilder,private allService : AllServicesService,private toastr : ToastrService,private router : Router){
    this.personaldetailsform = this.formbuilder.group({
      title : [,[Validators.required]],
      first_name:[,[Validators.required, Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(50)]],
      middle_name:[,[Validators.required, Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(50)]],
      last_name:[],
      partner_name : [],
      children_name: [],
      dob:[new Date(),[Validators.required]],
      age:[],
      language : [],
      referred_by : [],
      gender : [,[Validators.required]],
      martial_status : []
    });

    this.contactDetailsform = this.formbuilder.group({
      telephone_number:[,[Validators.required,Validators.pattern('\\d*')]],
      email:[,[Validators.required,Validators.email]],
      flatNo : [],
      StreetNo : [],
      StreetName : [],
      suburb : [],
      town : [],
      state : [],
      postcode : []
    });



    this.healthdetailsform = this.formbuilder.group({
      bloodgroup:[],
      height : [,[Validators.pattern('\\d*')]],
      weight : [,[Validators.pattern('\\d*')]],
      bloodPressure : [],
      heartBeat : [],
      temperature : [],
      spo2 : [],
      respiratoryRate : [],
      Speciality : [],
      Priority: [,[Validators.required]],
      Patient_type :[,[Validators.required]]
    });

    this.otherdetailsform = this.formbuilder.group({
      clientInformation : [],
      notes : []
    })
  }
  transformedData : object;
  ngOnInit(): void {
    let patientId = localStorage.getItem('Patient_ID');
    if(patientId){
      this.allService.GetSpecificPatientDetails(patientId).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            this.StageOne = true;
            this.StageTwo = true;
            this.StageThree = true;
            this.ReachedEnd = true;
            let languagesArray : any = null;
            this.showImage = true;
            this.SelectedGender = res.patient.gender;
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
              dob:res.patient.dob != 'null' ? res.patient.dob : '',
              age:res.patient.age != 'null' ? res.patient.age : '',
              language : res.patient.language != 'null' ? languagesArray : null,
              referred_by :res.patient.referred_by != 'null' ? res.patient.referred_by : '',
              gender : res.patient.gender != 'null' ? res.patient.gender : '',
              martial_status :res.patient.marital_status != 'null' ? res.patient.marital_status : ''
            });
            this.contactDetailsform.patchValue({
              telephone_number:res.patient.telephone != 'null' ? res.patient.telephone : '',
              email:res.patient.primary_email != 'null' ? res.patient.primary_email : '',
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
              Priority: res.patient.priority != 'null' ? res.patient.priority : null,
              Patient_type : res.patient.patient_type != 'nill' ? res.patient.patient_type : null
              // Procedure : res.patient.procedure != 'null' ? res.patient.procedure : null
            });
            this.otherdetailsform.patchValue({
              clientInformation :res.patient.critical_information != 'null' ? res.patient.critical_information : '',
              notes : res.patient.notes != 'null' ? res.patient.notes : ''
            });

            res.patient.document.forEach((element:any) => {
              this.NewFiles.push(element);
            });
            console.log(this.NewFiles)
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
    this.getProcedures();

    console.log('FirstPageValidation',this.FirstPageValidation);
  }

  downloadFile(name:any) {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = this.apiUrl+name;
    console.log(link.href);
    link.download = 'ClientAssistance.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

  Procedure:any = [];
  ProcedureOption_Index:any = [];
  getProcedures(){
    this.allService.ProcedureOptions().subscribe({
      next:((res:any)=>{
        this.Procedure = [];
        this.ProcedureOption_Index = res.data;
        if(res.data.length>0){
          res.data.forEach((element:any) => {
            this.Procedure.push(element.procedure_name);
          });
        }
        else{
          this.Procedure=[];
        }

      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong','UnSuccessful',{
          positionClass: 'toast-top-center',
          timeOut:2000,
        });
      })
    })
  }


  onStepSelectionChange(event: StepperSelectionEvent) { }

  SelectedGender:string;
  SelectGender(type:string){
    switch(type){
      case 'Male':{
        this.SelectedGender = 'Male';
        break;
      }
      case 'Female':{
        this.SelectedGender = 'Female';
        break;
      }
    }
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

  RegisterPatient(PersonalDetails:any,ContactDetails:any,healthDetails:any,Otherdetails:any){

    let procedure_value = this.healthdetailsform.value.Procedure;
    let newArray: any = [];
    // if (procedure_value) {
    //   if (this.ProcedureOption_Index) {
    //     this.ProcedureOption_Index.forEach(element => {
    //       if (procedure_value == element.procedure_name) {
    //         newArray.push(element.id);
    //         let procedureStrings: any = newArray.map(num => num.toString());
    //         console.log(procedureStrings);
    //         this.healthdetailsform.patchValue({
    //           Procedure: procedureStrings?.[0]
    //         })
    //       }
    //     });
    //   }
    // }
    // else {
    //   this.healthdetailsform.patchValue({
    //     Procedure: null
    //   })
    // }
    console.log(this.healthdetailsform.value);

    let patientId = localStorage.getItem('Patient_ID');
    if(patientId){
      console.log(PersonalDetails);
      console.log(ContactDetails);
      console.log(healthDetails);
      console.log(Otherdetails);
      console.log(this.Patient_img);
      console.log(patientId);

      this.allService.UpdateRegisteredPatient(PersonalDetails,ContactDetails,healthDetails,Otherdetails,this.Patient_img ? this.Patient_img : this.ProfileImage, patientId,this.NewFiles).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            console.log(res);
            this.personaldetailsform.reset();
            this.contactDetailsform.reset();
            this.healthdetailsform.reset();
            this.otherdetailsform.reset();
            this.ProfileImage = null;
            this.NewFiles = [];
            this.SelectedGender = '';
            this.CurrentPage = 'Personal Details';
            this.StageOne = true;
            this.StageTwo = false;
            this.StageThree = false;
            this.ReachedEnd = false;
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
    else{
      console.log(PersonalDetails);
      console.log(ContactDetails);
      console.log(healthDetails);
      console.log(Otherdetails);
      console.log(this.Patient_img);
      console.log(patientId);
      this.allService.Registerpatient(PersonalDetails,ContactDetails,healthDetails,Otherdetails,this.Patient_img,this.NewFiles).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            console.log(res);
            this.personaldetailsform.reset();
            this.contactDetailsform.reset();
            this.healthdetailsform.reset();
            this.otherdetailsform.reset();
            this.ProfileImage = null;
            this.NewFiles = [];
            this.SelectedGender = '';
            this.CurrentPage = 'Personal Details';
            this.StageOne = true;
            this.StageTwo = false;
            this.StageThree = false;
            this.ReachedEnd = false;
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

  CurrentPage : string = 'Personal Details';
  StageOne : boolean = true;
  StageTwo : boolean = false;
  StageThree : boolean = false;
  ReachedEnd : boolean = false;
  SelectCurrentPage(type:string){
    switch(type){
      case 'Personal Details':{
        this.CurrentPage = 'Personal Details';
        this.StageOne = true;
        break;
      }
      case 'Contact Details':{
        this.CurrentPage = 'Contact Details';
        this.StageOne = true;
        this.StageTwo = true;
        break;
      }
      case 'Health Details':{
        this.CurrentPage = 'Health Details';
        this.StageOne = true;
        this.StageTwo = true;
        this.StageThree = true;
        break;
      }
      case 'Other Details':{
        this.CurrentPage = 'Other Details';
        this.StageOne = true;
        this.StageTwo = true;
        this.StageThree = true;
        this.ReachedEnd = true;
        break;
      }
    }
  }

  NextToPersonalDetails(formData:any){

    this.personaldetailsform.patchValue({
      gender:this.SelectedGender
    })
    console.log('Valid 1',this.personaldetailsform.valid);
    console.log('value 1',formData.value);

    this.FirstPageValidation = this.personaldetailsform.valid;
    this.SelectCurrentPage('Contact Details');
  }

  NextToHealthDetails(formData:any){
    console.log('value 2',formData.value);
    console.log('Valid 2',this.contactDetailsform.valid);
    this.SelectCurrentPage('Health Details');
  }

  NextToOtherDetails(formData : any){
    console.log('value 3',formData.value);
    console.log('Valid 3',this.healthdetailsform.valid);
    this.SelectCurrentPage('Other Details');
  }


  BackTopersonalDetails(){
    this.SelectCurrentPage('Personal Details');
  }
  BackToContactDetails(){
    this.SelectCurrentPage('Contact Details');
  }

  BackToHealthDetails(){
    this.SelectCurrentPage('Health Details');
  }

   // File Upload
  //  imageURL: any;
   NewFiles : File[]= [];
   onSelect(event: any) {
     this.NewFiles.push(...event.addedFiles);
     let file: File = event.addedFiles[0];
     const reader = new FileReader();
    //  reader.onload = () => {
    //    this.imageURL = reader.result as string;
    //    setTimeout(() => {
    //      // this.profile.push(this.imageURL)
    //    }, 100);
    //  }
     reader.readAsDataURL(file);

     console.log(this.NewFiles);

   }

   onRemove(event) {
    console.log(event);
    this.NewFiles.splice(event,1);
    console.log(this.NewFiles);

  }
}
