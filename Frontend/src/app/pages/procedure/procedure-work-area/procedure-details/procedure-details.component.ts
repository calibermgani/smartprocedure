import { CdkStepper } from '@angular/cdk/stepper';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

interface MainTab {
  "tabs": string,
  "id": number,
  "template":string,
  "active":string,
  "content":string,
  "imgPath":string,
  "removable":boolean,
  "disabled":boolean,
  "subtabs": string,
}

interface SubTab {
  "id": number,
  "subtabs": string
}


@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent implements OnInit {

  @Input() StageValue: any;
  @Input() SelectedIndex : any;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  isFirstOpen: boolean = false;
  value?: string;
  hideViewOnlyMode : boolean = true;
  CurrentPatientSelection : boolean = false;
  CurrentPatientId:any;
  CurrentPatientDetails : any = [];
  VettingTypes : any = [];
  DuplicateProtocolingTypes : any = [];
  DuplicateAddProtocolingTypes : any = [];
  ProtocolTypes : any = [];
  AddProtocolList : any = [];
  enableNotes_Vetting:boolean = false;
  enableNotes_Protocoling:boolean = false;
  VettingRequestForm : UntypedFormGroup;
  ProtocoingRequestForm : UntypedFormGroup;
  ReasonForm : UntypedFormGroup;
  private patientDetailsSubscription: Subscription | undefined;
  @ViewChild('Reject', { static: false }) Reject?: ModalDirective;



  constructor(private http: HttpClient,private allService : AllServicesService,private authService : AuthfakeauthenticationService,private toastr : ToastrService,private formbuilder : UntypedFormBuilder,private router : Router) {

    this.VettingRequestForm= this.formbuilder.group({
      VettingNotes:['']
    });

    this.ProtocoingRequestForm = this.formbuilder.group({
      SelectProtocol : [],
      ProtocolDetails : [],
      AddedProtocol : [],
      ProtocolNotes : ['']
    });

    this.ReasonForm = this.formbuilder.group({
      reason1:[],
      reason2:[,[Validators.maxLength(50)]]
    });
   }

  ngOnInit() {
    this.hideViewOnlyMode = true;
    this.http.get<MainTab>('assets/json/main-tabs.json').subscribe((res: any) => {
      this.mainTabsValue = res;
      for(let i=0;i<res.length;i++)
      {
        if (res[i].subtabs) {
          this.subTabs.push(res[i].subtabs);
        }
      }
    });

    this.http.get('assets/json/viewOnlyMode.json').subscribe((res: any) => {
      this.header_viewOnlymode = res;
    });
  }

  CloseViewOnlyMode() {
   this.hideViewOnlyMode = true;
  }
  ShowViewOnlyArea(){
    this.hideViewOnlyMode = false
  }
  open() {
    window.alert('Hi You have opened the testing modal')
  }

  SendPatientRequest(type:string){
    this.allService.SendPatientRequest(this.CurrentPatientDetails,type,this.ReasonForm.value).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success' && type=='Accepted'){
         this.CurrentPatientSelection = true;
        //  this.hideViewOnlyMode = false;

        //  VettingTypes
          this.allService.GetVettingTypes().subscribe({
            next: ((res: any) => {
              if (res.status == 'Success') {
                console.log(res);
                this.VettingTypes = res.vetting_types;
              }
            }),
            error: ((res: any) => {
              this.toastr.error(`Something went wrong`, 'UnSuccessful', {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              });
            })
          });

        //  Protocol Types
          this.allService.GetProtocolTypes().subscribe({
            next: ((res: any) => {
              if (res.status == 'Success') {
                console.log(res);
                res.protocol_types.forEach(element => {
                  this.ProtocolTypes.push(element.name);
                  this.DuplicateProtocolingTypes.push(element);
                });
                console.log(this.ProtocolTypes);
              }
            }),
            error: ((res: any) => {
              this.toastr.error(`Something went wrong`, 'UnSuccessful', {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              });
            })
          });





        // this.allService.GetAddProtocolList().subscribe({
        //   next:((res:any)=>{
        //     if(res.status == 'Success'){
        //       console.log(res);
        //      res.add_protocol_types.forEach(element => {
        //       this.AddProtocolList.push(element.name);
        //       this.DuplicateAddProtocolingTypes.push(element);
        //      });
        //      console.log(this.AddProtocolList);
        //     }
        //   }),
        //   error:((res:any)=>{
        //       this.toastr.error(`Something went wrong`,'UnSuccessful',{
        //       positionClass: 'toast-top-center',
        //       timeOut:2000,
        //     });
        //   })
        // })
        return 0;
      }
      else if(res.status == 'Success' && type=='Rejected'){
        this.CloseModal('Reject');
        this.toastr.success(`${res.message}`, 'Successful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
        this.router.navigateByUrl('/procedure');
      }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    });
  }

  SelectedvettingType:any;
  SelectedVettingStatus(vettingtype:any){
    this.SelectedvettingType = vettingtype;
  }

  AddNotes_Vetting(){
    this.enableNotes_Vetting =! this.enableNotes_Vetting;
  }

  AddNotes_Protocol(){
    this.enableNotes_Protocoling = ! this.enableNotes_Protocoling;
  }

  SaveVettingRequest(data:any){
    console.log(data.value);
    console.log(this.SelectedvettingType);
    let VettingID : any;
    this.VettingTypes.forEach(element => {
      if(element.name == this.SelectedvettingType ){
        VettingID = element.id;
      }
    });
    this.allService.SendVettingRequest(this.CurrentPatientDetails,data.value,VettingID).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.SelectedvettingType = '';
          this.enableNotes_Vetting = false;
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  SaveProtocolingRequest(data:any){
    console.log(data.value);
    console.log(this.DuplicateProtocolingTypes);

    let ProtocolID : any = '';
    let value = this.ProtocoingRequestForm.get('SelectProtocol').value;
    this.DuplicateProtocolingTypes.forEach(element => {
      if(element.name == value){
        ProtocolID = element.id;
      }
    });
    console.log(ProtocolID);

    let AddProtocolID : any = '';
    let value2 = this.ProtocoingRequestForm.get('AddedProtocol').value;
    this.DuplicateAddProtocolingTypes.forEach(element => {
      if(element.name == value2){
        AddProtocolID = element.id
      }
    });

    console.log(AddProtocolID);

    this.allService.SendProtocolRequest(this.CurrentPatientDetails,data.value,ProtocolID,AddProtocolID).subscribe({
      next:((res:any)=>{
        if(res.status == 'Success'){
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.ProtocoingRequestForm.reset();
          this.enableNotes_Protocoling = false;
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   console.log('Changes',changes);
  // }

  ngAfterViewInit(): void {
    console.log('Selected Index',this.SelectedIndex);
    this.CurrentPatientDetails = [];
    let PatientID = localStorage.getItem('PatientID');
    if(this.SelectedIndex == 0){
      if(PatientID){
        this.allService.GetSpecificPatientProcedureDetails(PatientID).subscribe({
          next:((res:any)=>{
            if(res.status == 'Success'){
             this.CurrentPatientDetails = res.patient;
            }
            return 0;
          }),
          error:((res:any)=>{
              this.toastr.error(`Something went wrong`,'UnSuccessful',{
              positionClass: 'toast-top-center',
              timeOut:2000,
            });
          })
        });
      }
    }
    let ExamStatus = localStorage.getItem('ExamStatus');
    console.log(ExamStatus);

    if(ExamStatus == 'Accepted'){
      this.CurrentPatientSelection = true;
        //  VettingTypes
       this.allService.GetVettingTypes().subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            console.log(res);
            this.VettingTypes = res.vetting_types;
          }
        }),
        error:((res:any)=>{
          this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
       })

      //  Protocol Types
       this.allService.GetProtocolTypes().subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            console.log(res);
           res.protocol_types.forEach(element => {
            this.ProtocolTypes.push(element.name);
            this.DuplicateProtocolingTypes.push(element);
           });
           console.log(this.ProtocolTypes);
          }
        }),
        error:((res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      })

      //Vetting Data
      let MRN = localStorage.getItem('MRN_NO');
      this.allService.GetVettingRequestData(PatientID,MRN).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
           console.log('Vetting Data',res);
           this.VettingRequestForm.patchValue({
            VettingNotes:res.data.vetting_notes
           });

          }
        }),
        error:((res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      });

      //Protocoling Data
      this.allService.GetProtocolingRequestData(PatientID,MRN).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
           console.log('Protocoling Data',res);
          }
        }),
        error:((res:any)=>{
            this.toastr.error(`Something went wrong`,'UnSuccessful',{
            positionClass: 'toast-top-center',
            timeOut:2000,
          });
        })
      });

    }
    else if(ExamStatus != 'Rejected'){
      this.CurrentPatientSelection = false;
    }

  }


  CloseModal(type:any){
    switch(type){
      case 'Reject':{
        this.Reject?.hide();
        break;
      }
    }
  }

  OpenModal(type:any){
    switch(type){
      case 'Reject':{
        this.Reject?.show();
        break;
      }
    }
  }
}
