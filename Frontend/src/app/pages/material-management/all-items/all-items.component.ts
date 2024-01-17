import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AuthfakeauthenticationService } from './../../../core/services/authfake.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';

interface AllItems{
  id:number,
  item_no:string,
  item_name:string,
  item_category:string,
  item_description:string,
  procedure:string,
  cat_no:string,
  lot_no:string,
  size:string,
  vendor:string,
  price:string,
  unit:string,
  expiry_date:string,
  on_hand_qty:string,
  min_level:string,
  tags:string,
  notes:string,
  images:string,
  barcodes:string,
  action:string
}

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  category: string[];
  procedure: string[];
  all_Items_gridData:any[];
  hide_Overall_list:boolean = false;
  change_action_btn:boolean = false;
  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('additem', { static: false }) additem?: ModalDirective;

  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
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
    pagination: true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };
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

  constructor(private authfakeauthenticationService: AuthfakeauthenticationService,private http : HttpClient) {
    this.category = []; this.procedure = [];
  }

  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
  }


  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width:10
    },
    {
      field: 'item_no',
      headerName: 'Item No',
      cellRenderer: this.cellrendered.bind(this, 'item_no'),
      onCellClicked: this.CellClicked.bind(this, 'item_no')
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name')
    },
    {
      field: 'item_category',
      headerName: 'Items Category',
      cellRenderer: this.cellrendered.bind(this, 'item_category')
    },
    {
      field: 'item_description',
      headerName: 'Item Description',
      cellRenderer: this.cellrendered.bind(this, 'item_description')
    },
    {
      field: 'procedure',
      headerName: 'Procedure',
      cellRenderer: this.cellrendered.bind(this, 'procedure')
    },
    {
      field: 'cat_no',
      headerName: 'Cat No',
      cellRenderer: this.cellrendered.bind(this, 'cat_no')
    },
    {
      field: 'lot_no',
      headerName: 'Lot No',
      cellRenderer: this.cellrendered.bind(this, 'lot_no')
    },
    {
      field: 'size',
      headerName: 'Size',
      cellRenderer: this.cellrendered.bind(this, 'size')
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      cellRenderer: this.cellrendered.bind(this, 'vendor')
    },
    {
      field: 'price',
      headerName: 'Price',
      cellRenderer: this.cellrendered.bind(this, 'price')
    },
    {
      field: 'unit',
      headerName: 'Unit',
      cellRenderer: this.cellrendered.bind(this, 'unit')
    },
    {
      field: 'expiry_date',
      headerName: 'Expiry Date',
      cellRenderer: this.cellrendered.bind(this, 'expiry_date')
    },
    {
      field: 'on_hand_qty',
      headerName: 'On-Hand Qty',
      cellRenderer: this.cellrendered.bind(this, 'on_hand_qty')
    },
    {
      field: 'min_level',
      headerName: 'Min Level',
      cellRenderer: this.cellrendered.bind(this, 'min_level')
    },
    {
      field: 'tags',
      headerName: 'Tags',
      cellRenderer: this.cellrendered.bind(this, 'tags')
    },
    {
      field: 'notes',
      headerName: 'Notes',
      cellRenderer: this.cellrendered.bind(this, 'notes')
    },
    {
      field: 'images',
      headerName: 'Images',
      cellRenderer: this.cellrendered.bind(this, 'images')
    },
    {
      field: 'barcodes',
      headerName: 'Barcodes',
      cellRenderer: this.cellrendered.bind(this, 'barcodes')
    },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: this.cellrendered.bind(this, 'action')

    },
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'item_no': {
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'item_category': {
        return params.value;
      }
      case 'item_description': {
        return params.value;
      }
      case 'procedure': {
        return params.value;
      }
      case 'cat_no': {
        return params.value;
      }
      case 'lot_no': {
        return params.value;
      }
      case 'size': {
        return params.value;
      }
      case 'vendor': {
        return params.value;
      }
      case 'price': {
        return params.value;
      }
      case 'unit': {
        return params.value;
      }
      case 'expiry_date': {
        return params.value;
      }
      case 'on_hand_qty': {
        return params.value;
      }
      case 'min_level': {

      }
      case 'tags': {
        return params.value;
      }
      case 'notes': {
        return params.value;
      }
      case 'images': {
        return `<img src="${params.value}" width="52px" height="16px">`
      }
      case 'barcodes': {
        return params.value;
      }
      case 'action': {
        if(params.value)
        {
          return `<div class="d-flex flex-row">
          <i class="mdi mdi-eye-outline me-3" style="color:#855EDB;font-size:18px"></i>
          <i class="mdi mdi-pencil-outline me-3" style="color:#000;font-size:18px"></i>
          <i class="mdi mdi-trash-can-outline me-3" style="color:red;font-size:18px"></i>
          </div>`
        }
      }
    }
  }

  CellClicked(headerName: any, params: any) {}

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
    this.http.get('assets/json/all-items.json').subscribe((res:any)=>{
      this.all_Items_gridData = res;
      this.myGrid_1.api?.setRowData(this.all_Items_gridData);
    })
  }


  HideOverAllList(){
    this.hide_Overall_list =! this.hide_Overall_list;
  }

  SelectedTab(data:any)
  {
    switch(data){
      case 'allitems':{
        this.change_action_btn = false;
        break;
      }
      case 'vendor_list':{
        this.change_action_btn = false;
        break;
      }
      case 'low_stock':{
        this.change_action_btn = true;
        break;
      }
    }
  }
  files: File[] = [];
  imageURL: any;
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    let file: File = event.addedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      setTimeout(() => {
        // this.profile.push(this.imageURL)
      }, 100);
    }
    reader.readAsDataURL(file)
  }

  openModal()
  {
console.log('1');

    // this.centerDataModal.show();
  }
  ngAfterViewInit(): void {

  }
}
