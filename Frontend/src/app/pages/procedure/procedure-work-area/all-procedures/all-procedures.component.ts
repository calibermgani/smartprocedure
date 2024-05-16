import { CdkStepper, StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AllServicesService } from 'src/app/core/services/all-services.service';


@Component({
  selector: 'app-all-procedures',
  templateUrl: './all-procedures.component.html',
  styleUrls: ['./all-procedures.component.scss']
})
export class AllProceduresComponent implements OnInit {

  @ViewChild('StoreItem_Grid') StoreItem_Grid: AgGridAngular;
  @ViewChild('stepOne') stepOne!: CdkStepper;
  stepperData: any;
  VettingCondition:boolean = false;
  BookingCondition:boolean = false;
  PreProcedureCondition:boolean = false;
  IntraProcedureCondition:boolean = false;
  PostProcedureCondition:boolean = false;
  SelectedComponent : number = 0;
  procedureAlertsData:any;
  myCartData: any = [];
  StoreItemGridData:any = [
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    },
    {
      "item_no":"85327",
      "item_name":"Nunc volutpat kit - 12Fr x12 cm",
      "qty":"50",
      "action":true
    }
  ];

  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: false,
    filter: true,
    // floatingFilter: true,
  };
  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Go back to Material Dashboard Page</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: false,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };
  CurrentPatientUnderStatusDetails: any;
  toastr: any;

  constructor(private http: HttpClient, private allService : AllServicesService) {
  }

  onStepSelectionChange(event: StepperSelectionEvent) {
    console.log('Event',event);
    // Identify the selected step and call the corresponding API
    switch (event.selectedIndex) {
      case 0:
        this.SelectedComponent = 0;
        localStorage.setItem('Stage Type','Requestion');
        // Call API for step 0
        break;
      case 1:
        this.SelectedComponent = 1;
        localStorage.setItem('Stage Type','Schedulling');
        // Call API for step 1
        break;
      case 2:
        this.SelectedComponent = 2;
        localStorage.setItem('Stage Type','Pre-procedure');
        // Call API for step 2
        break;
      case 3:
        this.SelectedComponent = 3;
        localStorage.setItem('Stage Type','Intra-procedure');
        // Call API for step 3
        break;
      case 4:
        this.SelectedComponent = 4;
        localStorage.setItem('Stage Type','Post-procedure');
        // Call API for step 4
        break;
    }
  }

  ngOnInit() {
    this.http.get('assets/json/procedure-stage.json').subscribe((res: any) => {
      this.stepperData = res;
      console.log(this.stepperData);
      this.stepperData.forEach(element => {
        if(element.title == 'Vetting'){
          this.VettingCondition = true;
        }
        else if(element.title == 'Booking'){
          this.BookingCondition = true;
        }
        else if(element.title == 'Pre-procedure'){
          this.PreProcedureCondition = true;
        }
        else if(element.title == 'Intra-procedure'){
          this.IntraProcedureCondition = true;
        }
        else if(element.title == 'Post-procedure'){
          this.PostProcedureCondition = true;
        }
      });
    });
    this.http.get('assets/json/procedure-alerts.json').subscribe((res:any)=>{
      this.procedureAlertsData = res;
    });

    this.http.get('assets/json/mycart-data.json').subscribe((res:any)=>{
      this.myCartData = res;
      console.log(this.myCartData,'cartttt');
      
    });
    this.getUnderStatusDetails();
  }


  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10
    },
    {
      field: 'item_no',
      headerName:'Item No',
      width:100,
      filter: "agTextColumnFilter", suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'item_no')
    },
    {
      field: 'item_name',
      headerName:'Item Name',
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'item_name')
    },
    {
      field: 'qty',
      headerName:'Qty',
      width:100,
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'qty')
    },
    {
      field: 'action',
      headerName:'Action',
      width:100,
      pinned:"right",
      filter: "agTextColumnFilter",suppressMenu: false,
      cellRenderer: this.cellRendered.bind(this, 'action'),
      onCellClicked:this.cellClicked.bind(this,'action')
    },
  ];

  cellRendered(headerName: any, params: any) {
    switch (headerName) {
      case'item_no':{
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'qty': {
        return params.value;
      }
      case 'action': {
       if(params.value){
        return `<img src="assets/images/storeItem.svg" style="width:16px;height:16px">`
       }
      }
    }
  }
  cellClicked(headerName : any, params:any){
    switch(headerName){
      case 'action':{

      }
    }
  }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
  }



  AddToFavourite(index:number,value:boolean){
    this.myCartData[index].fav = !value;
  }

  getUnderStatusDetails(){
    let PatientID = localStorage.getItem('PatientID');

    if(PatientID){

        this.allService.GetSpecificPatientProcedureDetails(PatientID).subscribe({
        next:((res:any)=>{
          if(res.status == 'Success'){
            console.log(res,'rtesss');
           this.CurrentPatientUnderStatusDetails = res.patient;
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
}
