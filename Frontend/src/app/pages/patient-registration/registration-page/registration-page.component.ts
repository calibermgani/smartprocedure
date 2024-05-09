import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {


  ProfileImage : any ;
  showImage:boolean = false;
  onStepSelectionChange(event: StepperSelectionEvent) {}

  AddImage(event:any){
    console.log('sdd',event.target.files[0]);
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
