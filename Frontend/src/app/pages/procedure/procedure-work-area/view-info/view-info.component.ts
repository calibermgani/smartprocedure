import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { br } from '@fullcalendar/core/internal-common';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})
export class ViewInfoComponent implements OnInit{

  // @ViewChildren('group') accordionGroups : QueryList;
  header_viewOnlymode: any[] = [];

  constructor(private http: HttpClient,private allService : AllServicesService, private toastr : ToastrService,private formbuilder : UntypedFormBuilder) { }

  ngOnInit(): void {
      this.http.get('assets/json/viewOnlyMode.json').subscribe((res: any) => {
      this.header_viewOnlymode = res;
    });
  }


  VettingandProtocolingDetails : any = [];
OnClickingViewOnlyMode(type:any,condition:boolean){
  switch(type){
    case 'VETTING & PROTOCOLING':{
      console.log('cdtnn',condition);
      if(condition == true ){  //&& this.VettingandProtocolingDetails.length == 0
        let MRN = localStorage.getItem('MRN_NO');
      let PatientID = localStorage.getItem('PatientID');
        this.allService.GetVettingandProtocolingData(PatientID,MRN).subscribe({
          next:((res:any)=>{
            if(res.status == 'Success'){
             console.log('Vetting and Protocol Data',res.data);
             this.VettingandProtocolingDetails = res.data;
            }
          }),
          error:((res:any)=>{
              this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          })
        });
        break;
      }
    }
    case 'PROCEDURE TEAM':{
      console.log('cdtnn2',condition);

      break;
    }

  }
}


}
