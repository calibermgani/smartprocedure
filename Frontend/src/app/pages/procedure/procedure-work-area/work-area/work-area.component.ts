import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';

interface kizintabValues {
  "tabs": string,
  "id": number,
  "template": string,
  "active": boolean,
  "content": string,
  "imgPath": string,
  "activeimg": string,
  "removable": boolean,
  "disabled": boolean,
}

interface ProcedureStageList {
  "id": number,
  "stage": string,
  "status": string,
  "accord_open": boolean,
  "list": Task[]
}

interface Task {
  "id": number,
  "task": string,
  "completed_date_time": string,
  "status": string,
  "role": string,
  "owner": string
}

interface timeline {
  "id": number,
  "data": string,
  "time": string,
  "procedure_status": string,
  "description": string,
  "owner": string,
  "role": string
}

interface TabData {
  "id": number,
  "headername": string,
  "header_data": tableData[],
}
interface tableData {
  "data": string
}
interface careteam {
  "id": number,
  "owner": string,
  "role": string,
  "icon": string
}
interface AlertData {
  "id": number,
  "path_img": string,
  "alert_name": string,
  "accord_open": boolean
  "input_value": string,
}
interface AlertValueDropDown
{
  value:string;
}

interface TaskNotes{
  "id":number,
  "Procedure_Stage":string,
  "order_by":string,
  "comments":Comments[]
}
interface Comments
{
  "Author":string,
  "comments":string
}

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WorkAreaComponent implements OnInit {

  miniList_details: any;
  procedureAlertsData: any;
  kizintabValues: any = [];
  taskList: any = [];
  procedureStagelist: any = [];
  timeline_data: any = [];
  clinical_history: any = [];
  lab_data: any = [];
  careteam_data: any = [];
  Alert_data: any = [];
  Alert_dropdown_values:any = [];
  tasklist_notes:any = [];
  comments_for_tasklist :any = [];
  isFirstOpen: boolean = true;
  show_patient_details: boolean = false;
  fall_alert: string = '';
  isolation_alert: string = '';
  pregnant_alert: string = '';
  covid_alert: string = '';
  // Editable Field
  pre_diagnosis_editable_field: boolean = false;
  indication_editable_field: boolean = false;
  post_diagnosis_editable_field: boolean = false;
  lab_editable_field: boolean = false;
  medication_editable_field: boolean = false;
  careteam_editable_field: boolean = false;
  // Main Tabs
  active_tabs_clinical_history: any = false;
  active_tabs_lab: boolean = false;
  active_tabs_medication: boolean = false;
  active_tabs_care_team: boolean = false;
  // Sub Tabs
  active_tabs_pre_diagnosis: boolean = false;
  active_tabs_indication: boolean = false;
  active_tabs_post_diagnosis: boolean = false;


  active_status: any = 'clinical_histroy';
  active_sub_status: any = 'pre_diagnosis';

  modalRef?: BsModalRef;
  activeTab = 1;
  activeTab_Modal = 1;

  itemsPerSlide = 4;
  singleSlideOffset = true;

  slides = [
    { "image": 'assets/images/fall_fill.svg',"name":'Fall',"tooltip":'Fall 19-25' },
    { "image": 'assets/images/isolation_fill.svg',"name":'Isolation',"tooltip":'Isolation 14-23' },
    { "image": 'assets/images/pregnant_fill.svg',"name":'Pregnant',"tooltip":'Pregnant 10-20' },
    { "image": 'assets/images/covid_fill.svg',"name":'Covid',"tooltip":'Covid 16-25' },
  ];

  //slider variables
  edit_alert_range_value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100,
    showSelectionBar: true,
    getPointerColor: (value: number): string => {
      return '#855EDB';
    }
  };

  Alert_name: any;


  @ViewChild('centerDataModal', { static: false }) centerDataModal?: ModalDirective;
  @ViewChild('addNotesModal', { static: false }) addNotesModal?: ModalDirective;

  constructor(private http: HttpClient, private modalService: BsModalService,private router : Router) {
  }

  ngOnInit() {
    this.addNotesModal?.show();

    this.http.get('assets/json/mini-list.json').subscribe((res: any) => {
      this.miniList_details = res;
    });

    this.http.get('assets/json/procedure-alerts.json').subscribe((res: any) => {
      this.procedureAlertsData = res;
    });

    this.http.get<kizintabValues>('assets/json/kizin-main-tabs.json').subscribe((res: any) => {
      this.kizintabValues = res;
    });

    this.http.get<ProcedureStageList>('assets/json/procedure-stage-list.json').subscribe((res: any) => {
      this.procedureStagelist = res;
      for (let i = 0; i < res.length; i++) {
        if (res[i].list) {
          this.taskList.push(res[i].list);
        }
      }
    });

    this.http.get<timeline>('assets/json/timeline.json').subscribe((res: any) => {
      this.timeline_data = res;
    });
    this.http.get<TabData>('assets/json/clinical_history_data.json').subscribe((res: any) => {
      this.clinical_history = res;
    });
    this.http.get<TabData>('assets/json/lab_data.json').subscribe((res: any) => {
      this.lab_data = res;
    });
    this.http.get<careteam>('assets/json/care_team_member.json').subscribe((res: any) => {
      this.careteam_data = res;
    });
    this.http.get<AlertData>('assets/json/Alert_data.json').subscribe((res: any) => {
      this.Alert_data = res;
    });

    this.http.get<AlertValueDropDown>('assets/json/Alerts_dropdown.json').subscribe((res: any) => {
      this.Alert_dropdown_values = res;
    });

    this.http.get<TaskNotes>('assets/json/task_notes.json').subscribe((res: any) => {
      this.tasklist_notes = res;
      this.comments_for_tasklist = res[0].comments;
    });

  }

  toggleTabIcon(index: number) {
    console.log('index', index);
    this.kizintabValues[index].active = !this.kizintabValues[index].active;
    for (let i = 0; i < 3; i++) {
      if (i != index) {
        this.kizintabValues[i].active = false;
      }
    }
  }

  onPatientDetailsButtonClicked() {
    this.show_patient_details = true;
  }
  go_back_to_Kizin() {
    this.show_patient_details = false;
  }

  changeAlerts(data: any) {
    switch (data) {
      case 'fall': {
        this.fall_alert = data;
      }
      case 'allergies': {
        this.isolation_alert = data;
      }
      case 'pregnant': {
        this.pregnant_alert = data;
      }
      case 'covid': {
        this.covid_alert = data;
      }
    }
  }

  setActiveTab(index: number) {
    this.activeTab = index;
  }
  setActiveTabModal(index: number) {
    this.activeTab_Modal = index;
  }

  edit_field(data: any) {
    switch (data) {
      case 'pre_diagnosis':
        {
          this.pre_diagnosis_editable_field = true;
          break;
        }
      case 'indication': {
        this.indication_editable_field = true;
        break;
      }
      case 'post_diagnosis': {
        this.post_diagnosis_editable_field = true;
        break;
      }
      case 'lab': {
        this.lab_editable_field = true;
        break;
      }
      case 'medication': {
        this.medication_editable_field = true;
        break;
      }
      case 'care_team': {
        this.careteam_editable_field = true;
        break;
      }
    }
  }

  showModal() {
    this.tab_active('clinical_history')
    this.tab_Subactive('pre_diagnosis')
    //Fields
    this.pre_diagnosis_editable_field = false;
    this.indication_editable_field = false;
    this.post_diagnosis_editable_field = false;
    this.lab_editable_field = false;
    this.medication_editable_field = false;
    this.careteam_editable_field = false;

    this.centerDataModal?.show();
  }
  closeModal() {
    //Fields
    this.pre_diagnosis_editable_field = false;
    this.indication_editable_field = false;
    this.post_diagnosis_editable_field = false;
    this.lab_editable_field = false;
    this.medication_editable_field = false;
    this.careteam_editable_field = false;
    this.centerDataModal?.hide();
  }
  showEditableModal(data: any) {
    switch (data) {
      case 'pre_diagnosis':
        {
          this.tab_active('clinical_history');
          this.tab_Subactive(data);
          this.pre_diagnosis_editable_field = true;
          this.centerDataModal?.show();
          break;
        }
      case 'indication': {
        this.tab_active('clinical_history');
        this.tab_Subactive(data);
        this.indication_editable_field = true;
        this.centerDataModal?.show();
        break;
      }
      case 'post_diagnosis': {
        this.tab_active('clinical_history');
        this.tab_Subactive(data);
        this.post_diagnosis_editable_field = true;
        this.centerDataModal?.show();
        break;
      }
      case 'lab': {
        this.active_status = 'lab';
        this.lab_editable_field = true;
        this.tab_active(data);
        this.active_tabs_lab = true;
        this.centerDataModal?.show();
        break;
      }
      case 'medication': {
        this.active_status = 'medication';
        this.tab_active(data);
        this.medication_editable_field = true;
        this.centerDataModal?.show();
        break;
      }
      case 'care_team': {
        this.tab_active(data);
        this.careteam_editable_field = true;
        this.active_status = 'care_team';
        this.centerDataModal?.show();
        break;
      }
    }
  }

  tab_active(data: any) {
    this.active_status = data;
  }
  tab_Subactive(data: any) {
    this.active_sub_status = data;
  }

  customHeaderClick(event: Event) {
    event.stopPropagation();
  }

  enableAlert(name: any, event: any) {
    if (event.target.checked) { this.Alert_name = name; }
    else { this.Alert_name = '' }
  }

  AddNotes(stage: any) {
    this.addNotesModal?.show();
  }

  reply_id:number;
  hide_comment_field:boolean = true;
  reply_notes(id:number){
    this.reply_id  = id;
    this.hide_comment_field = false;
  }
  SaveNotes(){
    this.reply_id = null;
    this.hide_comment_field = true
  }

  GoBackToProcedureList()
  {
    this.router.navigateByUrl('/procedure');
  }
}

