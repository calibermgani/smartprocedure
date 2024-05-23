import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent implements OnInit {

  main_tabs_filters: any = [];
  Saved_filter_options: string[];
  Current_Saved_filter_values: string[];
  current_Procedure_filters: string[];
  sortBy_values: string[];
  main_filter_value: string = 'View all';
  CurrentSavedFilter: any;
  SelectedRowData : any = [];

  enabled_edit_btn: boolean;
  enable_edit_feature: boolean = false;
  enabled_reset_btn: boolean;
  enabled_saveas_button: boolean = true;


  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">No rows to show</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    suppressRowClickSelection:true,
    rowHeight: 35,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    pagination: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: true,
    getRowStyle: (params) => {
      if (params.data.Priority === 'Emergency') {
          return { background: 'rgb(250 218 218) !important' };
      }
      return null;
  },
  };

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
  };
  columnDefs1: ColDef[] = [];

  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns Visibility',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: false,
          suppressColumnSelectAll: false,
        },
      } as ToolPanelDef,
    ],
    defaultToolPanel: null,
  };


  constructor(private router: Router, private http: HttpClient,private allServices: AllServicesService,private toastr : ToastrService,private authService : AuthfakeauthenticationService) {
    this.Saved_filter_options = ['Saved filter 1', 'Saved filter 2', 'Saved filter 3', 'Saved filter 4', 'Saved filter 5'];
    this.sortBy_values = ['Priority', 'In Patient', 'Speciality']
  }

  ngOnInit(): void {
    this.http.get('assets/json/main_filters_Procedure_list.json').subscribe((res: any) => {
      this.main_tabs_filters = res;
    });
    this.http.get('assets/json/procedure_filters_value.json').subscribe((res: any) => {
      this.current_Procedure_filters = res[0].value;
    })
  }
  navigate_to_WorkArea() {
    this.router.navigate(['/workarea'])
  }

  Change_grid_data(data: any) {
    this.main_filter_value = data;
  }

  changeSavedfilter(data: any) {
    if (data == 'Saved filter 1') {
      this.http.get('assets/json/saved_filter_1.json').subscribe((res: any) => {
        this.Current_Saved_filter_values = res[0].filter_values;
        console.log(this.Current_Saved_filter_values);
      });
      this.enabled_edit_btn = true;
      this.enabled_reset_btn = true;
    }
  }

  EnableEdit() {
    this.enable_edit_feature = true;
    this.enabled_saveas_button = false;
  }

  resetSavedFilters() {
    this.enabled_reset_btn = false;
    this.enabled_edit_btn = false;
    this.enabled_saveas_button = true;
    this.Current_Saved_filter_values = [];
    this.CurrentSavedFilter = '';
  }
  DeleteSavedFiltervalues(index: number) {
    this.Current_Saved_filter_values.splice(index, 1);
  }


  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    console.log('event', params);
    this.http.get('assets/json/Procedure_list.json').subscribe((res: any) => {
      console.log('Response Grid', res);
      // let colDefs: ColDef[] = [];
      // colDefs = this.gridOptions1.api?.getColumnDefs();
      // colDefs.length = 0;
      // const keys: any = Object.keys(res[0])
      // keys.forEach((key: any) => {
      //   if (key == 'checkboxSelection') {
      //     let headerName = '';
      //     colDefs.push({ checkboxSelection: true, headerCheckboxSelection: true, width: 50, cellRenderer: this.cellrendered.bind(this, key), headerName: headerName, })
      //   }
      //   else if(key != 'substatus') {
      //     colDefs.push({ field: key, cellRenderer: this.cellrendered.bind(this, key),onCellClicked:this.cellClicked.bind(this,key) })
      //   }
      // });
      // console.log('colDefs', colDefs);
      // this.gridOptions1.api?.setColumnDefs(colDefs);
      // this.gridOptions1.api?.setRowData(res);
    })
    this.allServices.GetAllPatientProcedureList().subscribe({
      next:(res:any)=>{
       console.log(res)
       if(res.status == 'Success' && res.patient_list.length>0){
        console.log('Response Grid', res);
        let colDefs: ColDef[] = [];
        colDefs = this.gridOptions1.api?.getColumnDefs();
        colDefs.length = 0;
        const keys: any = Object.keys(res.patient_list[0])
        console.log(keys);

        keys.forEach((key: any) => {
          console.log(key);

          if (key == 'checkboxSelection') {
            console.log('IN');
            let headerName = '';
            colDefs.push({ checkboxSelection: true, headerCheckboxSelection: true, width: 50, cellRenderer: this.cellrendered.bind(this, key), headerName: headerName })
          }
          else if(key != 'id') {
            colDefs.push({ field: key, cellRenderer: this.cellrendered.bind(this, key),onCellClicked:this.cellClicked.bind(this,key) })
          }
        });
        console.log('colDefs', colDefs);
        this.gridOptions1.api?.setColumnDefs(colDefs);
        this.gridOptions1.api?.setRowData(res.patient_list);
       }
       else{
        this.gridOptions1.api?.setColumnDefs([]);
        this.gridOptions1.api?.setRowData([]);
       }
      },
      error:(res:any)=>{
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      }
    })


    this.SelectedRowData = this.gridApi_1?.getSelectedRows();

  }

  cellClicked(headername:any,params:any)
  {
    switch(headername)
    {
      case 'Name':
        {
          let rowData = params.node.data;
          console.log(rowData);

          this.router.navigate(['/workarea']);
          // this.authService.PassingPatientID(rowData.id);
          localStorage.setItem('PatientID', rowData["id"])
          localStorage.setItem('Procedure', rowData["Procedure Name"]);
          localStorage.setItem('MRN_NO', rowData["MRN"]);
          localStorage.setItem('ExamStatus', rowData["Exam Status"]);
          localStorage.setItem('AccessionNo', rowData["Accession Number"]);
        }
    }
  }

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'Name': {
        if (params.value) {
          const capitalizedStr = params.value.charAt(0).toUpperCase() + params.value.slice(1);
          return capitalizedStr;
        }
        else
          return '-Nil-';
      }
      case 'MRN': {
        if (params.value) {
          return params.value;
        }
        else
          return '-Nil-';
      }
      case 'Gender': {
        if (params.value) {
          return params.value;
        }
        else {
          return '-Nil-';
        }
      }
      case 'Type': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'DOB': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Age': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Location': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Exam Status': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Study ID': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Priority': {
        switch(params.value){
          case 'Emergency':{

            return `<div class="d-flex flex-row align-items-center"><p style="color:#D62424 !important;font-weight:400 !important" class="mb-0">${params.value}<h5 style="font-weight:400 !important;color:
            #855EDB !important;padding:0px 6px 0px 6px !important;background:#fff;border-radius:27px !important" class="mb-0 ms-2">Yet to start</h5></p></div>`;
          }
          case 'Routine':{
            return `<p style="color:#17B927 !important;font-weight:400 !important">${params.value}</p>`;
          }
          case 'Other':{
            return `<p style="color:#594585 !important;font-weight:400 !important">${params.value}</p>`;
          }
        }

      }
      case 'Procedure Status': {
        if (params.value){
          let rowData = params.node.data;
          const substatus = rowData.substatus;
          if(substatus){
            return `<div class="d-flex flex-row  align-items-center"><p class="mb-0">${params.value}</p><h5 class="ms-1 mb-0" style="font-weight:400 !important;color:#855EDB !important;background:#F3F4F8;padding : 0px 4px 0px 4px;border-radius:27px">${substatus}</h5></div>`;
          }
          else{
            return params.value;
          }

        }
        else
          return '-Nil-';
      }
      case 'Study Date And Time': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Accession Number': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Requesting Physician': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Speciality': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Claim Note': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Assigned To': {
        let x: any;
        x = params.value.substring(0, 10);
        x != null ? x : 'UA'
        const rowData = params.node.data;
        const assignedTo = rowData.Date;
        console.log('sasasa', assignedTo);
        return `${assignedTo == null ? 'UA' : assignedTo} | ${x}`;
      }
      case 'Language':{
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Blood':{
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Weight':{
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Height':{
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Procedure Name':{
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
    }
  }

  selected_patient_type:string = 'in_patient';
  PatientType(type:any)
  {
    this.selected_patient_type = type;
  }

  show_advanced_filtes:boolean = false;
  reduce_size:boolean = false;
  ShowAdvancedFilters()
  {
    this.show_advanced_filtes = true;
    this.reduce_size = true;
  }
  HideAdvanceFilters()
  {
    this.show_advanced_filtes = false;
    this.reduce_size = false;
  }

  selectedFile: any;
  selectedFileChange2(e: any) {
    this.selectedFile = e.target.files[0];
    console.log(this.selectedFile);
    this.allServices.ImportPatientExcel(this.selectedFile).subscribe({
      next: ((res: any) => {
        console.log(res);
        if (res.status == 'Success') {
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.allServices.GetAllPatientProcedureList().subscribe({
            next:(res:any)=>{
             console.log(res)
             if(res.status == 'Success'){
              console.log('Response Grid', res);
              let colDefs: ColDef[] = [];
              colDefs = this.gridOptions1.api?.getColumnDefs();
              colDefs.length = 0;
              const keys: any = Object.keys(res.patient_list[0])
              console.log(keys);

              keys.forEach((key: any) => {
                console.log(key);

                if (key == 'checkboxSelection') {
                  console.log('IN');
                  let headerName = '';
                  colDefs.push({ checkboxSelection: true, headerCheckboxSelection: true, width: 50, cellRenderer: this.cellrendered.bind(this, key), headerName: headerName })
                }
                else if(key != 'id') {
                  colDefs.push({ field: key, cellRenderer: this.cellrendered.bind(this, key),onCellClicked:this.cellClicked.bind(this,key) })
                }
              });
              console.log('colDefs', colDefs);
              this.gridOptions1.api?.setColumnDefs(colDefs);
              this.gridOptions1.api?.setRowData(res.patient_list);
             }
            },
            error:(res:any)=>{
              this.toastr.error('Something went wrong', 'UnSuccessful', {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              });
            }
          })
        }
      }),
      error: ((res: any) => {
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  ReloadGrid(){
    this.allServices.GetAllPatientProcedureList().subscribe({
      next:(res:any)=>{
       console.log(res)
       if(res.status == 'Success'){
        console.log('Response Grid', res);
        let colDefs: ColDef[] = [];
        colDefs = this.gridOptions1.api?.getColumnDefs();
        colDefs.length = 0;
        const keys: any = Object.keys(res.patient_list[0])
        console.log(keys);

        keys.forEach((key: any) => {
          console.log(key);

          if (key == 'checkboxSelection') {
            console.log('IN');
            let headerName = '';
            colDefs.push({ checkboxSelection: true, headerCheckboxSelection: true, width: 50, cellRenderer: this.cellrendered.bind(this, key), headerName: headerName })
          }
          else if(key != 'id' || key != 'town_city' || key !='state' || key != 'patient_source_from') {
            colDefs.push({ field: key, cellRenderer: this.cellrendered.bind(this, key),onCellClicked:this.cellClicked.bind(this,key) })
          }
        });
        console.log('colDefs', colDefs);
        this.gridOptions1.api?.setColumnDefs(colDefs);
        this.gridOptions1.api?.setRowData(res.patient_list);
       }
      },
      error:(res:any)=>{
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      }
    })
  }
}
