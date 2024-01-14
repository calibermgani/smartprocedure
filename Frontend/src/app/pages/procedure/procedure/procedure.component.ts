import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import 'ag-grid-enterprise';

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
  CurrentSavedFilter: string;

  enabled_edit_btn: boolean;
  enable_edit_feature: boolean = false;
  enabled_reset_btn: boolean;
  enabled_saveas_button: boolean = true;


  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    pagination: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: true,
  };

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: false,
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
    defaultToolPanel: 'columns',
  };


  constructor(private router: Router, private http: HttpClient) {
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
      let colDefs: ColDef[] = [];
      colDefs = this.gridOptions1.api?.getColumnDefs();
      colDefs.length = 0;
      const keys: any = Object.keys(res[0])
      keys.forEach((key: any) => {
        if (key == 'checkboxSelection') {
          let headerName = '';
          colDefs.push({ checkboxSelection: true, headerCheckboxSelection: true, width: 50, cellRenderer: this.cellrendered.bind(this, key), headerName: headerName, })
        }
        else {
          colDefs.push({ field: key, cellRenderer: this.cellrendered.bind(this, key),onCellClicked:this.cellClicked.bind(this,key) })
        }
      });
      console.log('colDefs', colDefs);
      this.gridOptions1.api?.setColumnDefs(colDefs);
      this.gridOptions1.api?.setRowData(res);
    })
  }

  cellClicked(headername:any)
  {
    switch(headername)
    {
      case 'Name':
        {
          this.router.navigate(['/workarea'])
        }
    }
  }

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'Name': {
        if (params.value) {
          return params.value;
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
      case 'Study Id': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Priority': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Procedure Status': {
        if (params.value)
          return params.value;
        else
          return '-Nil-';
      }
      case 'Study Data and Time': {
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


}
