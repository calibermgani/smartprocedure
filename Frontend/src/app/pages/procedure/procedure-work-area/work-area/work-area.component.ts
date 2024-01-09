import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

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
  "id": 1,
  "owner": string,
  "role": string,
  "icon": string
}

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
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
  isFirstOpen: boolean = true;
  show_patient_details: boolean = true;
  alert_condition: boolean = true;
  // Editable Field
  pre_diagnosis_editable_field: boolean = false;
  indication_editable_field: boolean = false;
  post_diagnosis_editable_field: boolean = false;
  lab_editable_field: boolean = false;
  medication_editable_field: boolean = false;
  careteam_editable_field: boolean = false;
  // Main Tabs
  active_tabs_clinical_history: boolean = false;
  active_tabs_lab: boolean = false;
  active_tabs_medication: boolean = false;
  active_tabs_care_team: boolean = false;
  // Sub Tabs
  active_tabs_pre_diagnosis: boolean = false;
  active_tabs_indication: boolean = false;
  active_tabs_post_diagnosis: boolean = false;

  modalRef?: BsModalRef;
  activeTab = 1;
  activeTab_Modal = 1;

  myForm: FormGroup;


  @ViewChild(ModalDirective, { static: false }) centerDataModal?: ModalDirective;

  constructor(private http: HttpClient, private modalService: BsModalService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      active_tabs_clinical_history: new FormControl(false,[Validators.required]),
      active_tabs_lab:new FormControl(false,[Validators.required]),
      active_tabs_medication:new FormControl(false,[Validators.required]),
      active_tabs_care_team:new FormControl(false,[Validators.required]),
      active_tabs_pre_diagnosis:new FormControl(false,[Validators.required]),
      active_tabs_indication:new FormControl(false,[Validators.required]),
      active_tabs_post_diagnosis:new FormControl(false,[Validators.required]),
    })
  }
  ngOnInit() {
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
    this.show_patient_details = false;
  }
  go_back_to_Kizin() {
    this.show_patient_details = true;
  }

  changeAlerts(data: any) {
    switch (data) {
      case 'fall': {
        this.alert_condition = !this.alert_condition;
      }
      case 'allergies': {
        this.alert_condition = !this.alert_condition;
      }
      case 'pregnant': {
        this.alert_condition = !this.alert_condition;
      }
      case 'covid': {
        this.alert_condition = !this.alert_condition;
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
    //Tabs
    this.active_tabs_clinical_history = true;
    this.active_tabs_lab = false;
    this.active_tabs_medication = false;
    this.active_tabs_care_team = false;
    this.active_tabs_pre_diagnosis = true;
    this.active_tabs_indication = false;
    this.active_tabs_post_diagnosis = false;

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
    this.myForm.patchValue({
      active_tabs_clinical_history : false,
      active_tabs_lab : false,
      active_tabs_medication : false,
      active_tabs_care_team : false,
      active_tabs_pre_diagnosis : false,
      active_tabs_indication : false,
      active_tabs_post_diagnosis : false,

      //Fields
      pre_diagnosis_editable_field : false,
      indication_editable_field : false,
      post_diagnosis_editable_field : false,
      lab_editable_field : false,
      medication_editable_field : false,
      careteam_editable_field : false,
    })
    //Tabs


    this.centerDataModal?.hide();
  }
  showEditableModal(data: any) {
    switch (data) {
      case 'pre_diagnosis':
        {
          this.pre_diagnosis_editable_field = true;
          this.active_tabs_clinical_history = true;
          // Sub Tabs
          this.active_tabs_pre_diagnosis = true;
          this.active_tabs_indication = false;
          this.active_tabs_post_diagnosis = false;
          this.active_tabs_lab = false;
          this.active_tabs_medication = false;
          this.active_tabs_care_team = false;
          this.centerDataModal?.show();
          break;
        }
      case 'indication': {
        this.indication_editable_field = true;
        this.active_tabs_clinical_history = true;
        // Sub Tabs
        this.active_tabs_pre_diagnosis = false;
        this.active_tabs_indication = true;
        this.active_tabs_post_diagnosis = false;
        this.active_tabs_lab = false;
        this.active_tabs_medication = false;
        this.active_tabs_care_team = false;
        this.centerDataModal?.show();
        break;
      }
      case 'post_diagnosis': {
        this.post_diagnosis_editable_field = true;
        this.active_tabs_clinical_history = true;
        // Sub Tabs
        this.active_tabs_pre_diagnosis = false;
        this.active_tabs_indication = false;
        this.active_tabs_post_diagnosis = true;
        this.active_tabs_lab = false;
        this.active_tabs_medication = false;
        this.active_tabs_care_team = false;
        this.centerDataModal?.show();
        break;
      }
      case 'lab': {
        this.lab_editable_field = true;
        this.active_tabs_lab = true;
        this.active_tabs_pre_diagnosis = false;
        this.active_tabs_indication = false;
        this.active_tabs_post_diagnosis = false;
        this.active_tabs_clinical_history = false;
        this.active_tabs_medication = false;
        this.active_tabs_care_team = false;
        this.centerDataModal?.show();
        break;
      }
      case 'medication': {
        this.medication_editable_field = true;
        this.active_tabs_pre_diagnosis = false;
        this.active_tabs_indication = false;
        this.active_tabs_post_diagnosis = false;
        this.active_tabs_clinical_history = false;
        this.active_tabs_lab = false;
        this.active_tabs_medication = true;
        this.active_tabs_care_team = false;
        this.centerDataModal?.show();
        break;
      }
      case 'care_team': {
        this.careteam_editable_field = true;
        this.active_tabs_pre_diagnosis = false;
        this.active_tabs_indication = false;
        this.active_tabs_post_diagnosis = false;
        this.active_tabs_clinical_history = false;
        this.active_tabs_lab = false;
        this.active_tabs_medication = false;
        this.active_tabs_care_team = true;
        this.centerDataModal?.show();
        break;
      }
    }
  }

}
