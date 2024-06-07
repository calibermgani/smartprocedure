import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent {
  enableTab:any = '';
  selectedTab_To_View:string;

  constructor(){}

  ngOnInit(){
    this.SelectedTab('Clinical History');
    this.changeTab('Clinical History');
  }

  changeTab(tabs:any){
    switch(tabs)
    {
      case 'Clinical History':{
        this.enableTab = 'Clinical History';
        break;
      }
      case 'Labs':{
        this.enableTab = 'Labs';
        break;
      }
      case 'Medication':{
        this.enableTab = 'Medication';
        break;
      }
      case 'Care Team':{
        this.enableTab = 'Care Team';
        break;
      }
    }
  }

  SelectedTab(data:any)
  {
    switch(data){
      case 'All Items':{
   
        break;
      }
      case 'Vendor list':{

        break;
      }
      case 'Low Stock':{
      

        break;
      }
      case 'Daily consumed':{
      

      
        break;
      }
    }
  }

}
